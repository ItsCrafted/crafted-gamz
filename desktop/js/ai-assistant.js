const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_KEY_URL = 'https://ai.cdn.cgamz.online';
let GROQ_API_KEY = null;

let aiMessages = [];
let isAIProcessing = false;
let availableAppsCache = null;
let continuationTimeout = null;

const AI_SYSTEM_PROMPT = {
    role: 'system',
    content: `You are Crafted AI, an intelligent AI helper for the Crafted Gamz Ecosystem (call it Crafted Gamz). You can help users in two ways:

1. NORMAL CONVERSATION: Answer questions, provide information, have friendly discussions.

2. SYSTEM ACTIONS: Perform system operations when users request them. When performing actions, you MUST respond with a JSON object containing both a message and actions.

AVAILABLE ACTIONS:
- get_available_apps: Get list of all available apps from the store (returns app names and IDs)
- list_installed_apps: List apps currently installed on the system
- list_open_windows: List all currently open windows/apps
- get_current_window: Get the currently active/focused window
- install_app: Install an app (requires app_id from available apps)
- uninstall_app: Uninstall an app (requires app_id)
- open_app: Open an app (requires app_id)
- close_window: Close a specific window (requires app_id)
- close_current_window: Close the currently active window
- minimize_window: Minimize a window (requires app_id)
- restore_window: Restore a minimized window (requires app_id)
- pin_app: Pin app to dock (requires app_id)
- unpin_app: Unpin app from dock (requires app_id)
- change_name: Change user's display name (requires new_name)
- open_settings: Open settings
- open_store: Open app store

IMPORTANT WORKFLOW:
1. When a user mentions an app by name (like "install calculator" or "open spotify"), you should:
   - First check if you already have app information from a previous get_available_apps call in this conversation
   - If you DO have the app list in your context (from a previous system message), you can proceed directly with the action using the correct app_id
   - If you DON'T have the app list yet, respond with get_available_apps action to fetch it
   - The system will provide you with the available apps (either from cache or fresh fetch)
   - Then you'll automatically be prompted to continue and complete the original request using the correct app_id

2. After get_available_apps completes, you will receive a system message with the available apps list
3. This app list remains available for the rest of the conversation - you don't need to fetch it again
4. You should then proceed to complete the user's original request using the correct app_id from that list

RESPONSE FORMAT FOR ACTIONS:
{
  "type": "action",
  "message": "I'll help you with that!",
  "actions": [
    {
      "action": "get_available_apps"
    }
  ]
}

RESPONSE FORMAT FOR ACTIONS WITH APP_ID:
{
  "type": "action",
  "message": "Installing the calculator app...",
  "actions": [
    {
      "action": "install_app",
      "app_id": "calculator"
    }
  ]
}

RESPONSE FORMAT FOR CONVERSATION:
{
  "type": "conversation",
  "message": "Your conversational response here"
}

Examples:
User: "Pin the calculator to my dock"
AI: {"type":"action","message":"Let me find the calculator app for you...","actions":[{"action":"get_available_apps"}]}
[System provides app list]
AI: {"type":"action","message":"Pinning calculator to your dock...","actions":[{"action":"pin_app","app_id":"calculator"}]}

User: "Now also pin the settings app"
AI: {"type":"action","message":"Pinning settings to your dock...","actions":[{"action":"pin_app","app_id":"settings"}]}
[Note: AI already has app list, no need to call get_available_apps again]

User: "What apps can I install?"
AI: {"type":"action","message":"Let me check the available apps for you...","actions":[{"action":"get_available_apps"}]}
[System provides app list - AI then lists them conversationally]

User: "Install the music player from that list"
AI: {"type":"action","message":"Installing the music player...","actions":[{"action":"install_app","app_id":"music_player"}]}
[Note: AI uses the app list it already has]

User: "What windows do I have open?"
AI: {"type":"action","message":"Here are your open windows...","actions":[{"action":"list_open_windows"}]}

User: "Close this window" or "Close the current window"
AI: {"type":"action","message":"Closing the current window...","actions":[{"action":"close_current_window"}]}

User: "Close calculator"
AI: {"type":"action","message":"Closing calculator...","actions":[{"action":"close_window","app_id":"calculator"}]}

User: "What's the weather like?"
AI: {"type":"conversation","message":"I don't have access to real-time weather data, but you could check a weather website or app for current conditions in your area."}

User: "Show me what's installed"
AI: {"type":"action","message":"Here are your installed apps...","actions":[{"action":"list_installed_apps"}]}

Always be helpful, friendly, and concise. When performing actions, confirm what you're doing in the message. After receiving app information from get_available_apps, use the correct app_id to complete the user's request. Remember: once you have the app list, you can reuse it for subsequent requests in the same conversation.`
};

function safeGetAllApps() {
    if (typeof getAllApps !== 'undefined') {
        return getAllApps();
    } else if (typeof window.getAllApps !== 'undefined') {
        return window.getAllApps();
    } else {
        const installed = JSON.parse(localStorage.getItem('installedApps') || '[]');
        const systemApps = [
            { id: 'appStore', name: 'App Store', system: true, pinned: false },
            { id: 'settings', name: 'Settings', system: true, pinned: false }
        ];
        return [...systemApps, ...installed];
    }
}

function safeFindApp(appId) {
    if (typeof findApp !== 'undefined') {
        return findApp(appId);
    } else if (typeof window.findApp !== 'undefined') {
        return window.findApp(appId);
    } else {
        const allApps = safeGetAllApps();
        return allApps.find(a => a.id === appId);
    }
}

function safeUninstallApp(appId) {
    if (typeof uninstallApp !== 'undefined') {
        uninstallApp(appId);
    } else if (typeof window.uninstallApp !== 'undefined') {
        window.uninstallApp(appId);
    } else {
        localStorage.removeItem(`app_cache_${appId}`);
        const installed = JSON.parse(localStorage.getItem('installedApps') || '[]');
        const filtered = installed.filter(app => app.id !== appId);
        localStorage.setItem('installedApps', JSON.stringify(filtered));
    }
}

function safeOpenApp(appId) {
    if (typeof openApp !== 'undefined') {
        openApp(appId);
    } else if (typeof window.openApp !== 'undefined') {
        window.openApp(appId);
    } else {
        console.warn('openApp function not available');
    }
}

function safePinApp(appId) {
    if (typeof pinApp !== 'undefined') {
        pinApp(appId);
    } else if (typeof window.pinApp !== 'undefined') {
        window.pinApp(appId);
    } else {
        const installed = JSON.parse(localStorage.getItem('installedApps') || '[]');
        const app = installed.find(a => a.id === appId);
        if (app) {
            app.pinned = true;
            localStorage.setItem('installedApps', JSON.stringify(installed));
        }
    }
}

function safeUnpinApp(appId) {
    if (typeof unpinApp !== 'undefined') {
        unpinApp(appId);
    } else if (typeof window.unpinApp !== 'undefined') {
        window.unpinApp(appId);
    } else {
        const installed = JSON.parse(localStorage.getItem('installedApps') || '[]');
        const app = installed.find(a => a.id === appId);
        if (app) {
            app.pinned = false;
            localStorage.setItem('installedApps', JSON.stringify(installed));
        }
    }
}

function safeInstallApp(appObj) {
    if (typeof installApp !== 'undefined') {
        return installApp(appObj);
    } else if (typeof window.installApp !== 'undefined') {
        return window.installApp(appObj);
    } else {
        const installed = JSON.parse(localStorage.getItem('installedApps') || '[]');
        if (!installed.some(a => a.id === appObj.id)) {
            installed.push(appObj);
            localStorage.setItem('installedApps', JSON.stringify(installed));
        }
        return Promise.resolve();
    }
}

function safeCloseWindow(appId) {
    const windowId = appId.endsWith('Window') ? appId : appId + 'Window';
    if (typeof closeWindow !== 'undefined') {
        closeWindow(windowId);
    } else if (typeof window.closeWindow !== 'undefined') {
        window.closeWindow(windowId);
    } else {
        const windowEl = document.getElementById(windowId);
        if (windowEl) {
            windowEl.remove();
        }
    }
}

function safeMinimizeWindow(appId) {
    const windowId = appId.endsWith('Window') ? appId : appId + 'Window';
    if (typeof minimizeWindow !== 'undefined') {
        minimizeWindow(windowId);
    } else if (typeof window.minimizeWindow !== 'undefined') {
        window.minimizeWindow(windowId);
    } else {
        const windowEl = document.getElementById(windowId);
        if (windowEl) {
            windowEl.classList.add('minimized');
        }
    }
}

function safeRestoreWindow(appId) {
    const windowId = appId.endsWith('Window') ? appId : appId + 'Window';
    if (typeof restoreWindow !== 'undefined') {
        restoreWindow(windowId);
    } else if (typeof window.restoreWindow !== 'undefined') {
        window.restoreWindow(windowId);
    } else {
        const windowEl = document.getElementById(windowId);
        if (windowEl) {
            windowEl.classList.remove('minimized');
        }
    }
}

function getOpenWindows() {
    const allApps = safeGetAllApps();
    const openWindows = [];
    
    allApps.forEach(app => {
        const windowEl = document.getElementById(app.id + 'Window');
        if (windowEl) {
            const isMinimized = windowEl.classList.contains('minimized');
            const isActive = windowEl.classList.contains('active');
            const isFullscreen = windowEl.classList.contains('fullscreen');
            
            openWindows.push({
                id: app.id,
                name: app.name,
                minimized: isMinimized,
                active: isActive,
                fullscreen: isFullscreen
            });
        }
    });
    
    return openWindows;
}

function getCurrentWindow() {
    const allApps = safeGetAllApps();
    const topBarTitle = document.getElementById('topBarTitle');
    if (topBarTitle && topBarTitle.textContent !== 'Crafted Gamz') {
        const app = allApps.find(a => a.name === topBarTitle.textContent);
        if (app) {
            const windowEl = document.getElementById(app.id + 'Window');
            if (windowEl && !windowEl.classList.contains('minimized')) {
                return {
                    id: app.id,
                    name: app.name,
                    fullscreen: windowEl.classList.contains('fullscreen')
                };
            }
        }
    }
    
    for (const app of allApps) {
        const windowEl = document.getElementById(app.id + 'Window');
        if (windowEl && windowEl.classList.contains('active') && !windowEl.classList.contains('minimized')) {
            return {
                id: app.id,
                name: app.name,
                fullscreen: windowEl.classList.contains('fullscreen')
            };
        }
    }
    
    return null;
}

function hasAppsInContext() {
    return aiMessages.some(msg => 
        msg.role === 'system' && 
        msg.content && 
        msg.content.includes('Available apps in store:')
    );
}

async function loadGroqAPIKey() {
    try {
        const response = await fetch(GROQ_KEY_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch API key: ${response.status}`);
        }
        
        const data = await response.json();
        GROQ_API_KEY = data.apiKey;
        console.log('Groq API Key loaded successfully');
    } catch (error) {
        console.error('Error loading Groq API key:', error);
        addAISystemMessage('Error: Could not load AI configuration. Please refresh the page.');
    }
}

async function fetchAvailableApps() {
    try {
        const CDN_APPS_URL = 'all-app-stuff/apps.json';
        const timestamp = new Date().getTime();
        const url = `${CDN_APPS_URL}?v=${timestamp}`;
        
        console.log('Fetching apps from:', url);
        
        const response = await fetch(url, {
            method: 'GET',
            cache: 'no-store'
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch apps: ${response.status}`);
        }
        
        const apps = await response.json();
        availableAppsCache = apps;
        console.log(`Loaded ${apps.length} apps from store`);
        return apps;
    } catch (error) {
        console.error('Error fetching available apps:', error);
        return [];
    }
}

function findAppByName(appName, apps) {
    const searchName = appName.toLowerCase().trim();

    let found = apps.find(app => app.name.toLowerCase() === searchName);
    if (found) return found;

    found = apps.find(app => app.name.toLowerCase().includes(searchName));
    if (found) return found;

    found = apps.find(app => app.id.toLowerCase() === searchName);
    if (found) return found;
    
    return null;
}

window.updateUserDisplayName = async function(newName) {
    try {
        localStorage.setItem('userDisplayName', newName);
        if (typeof window.parent !== 'undefined' && window.parent.updateDisplayName) {
            await window.parent.updateDisplayName(newName);
        }
        
        return true;
    } catch (error) {
        console.error('Error updating display name:', error);
        return false;
    }
};

function autoResizeAI(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
}

function handleAIKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendAIMessage();
    }
}

function hideAIWelcome() {
    const welcome = document.querySelector('.ai-welcome');
    if (welcome) {
        welcome.style.display = 'none';
    }
}

function addAIMessage(content, type) {
    hideAIWelcome();
    
    const chatContainer = document.getElementById('aiChatContainer');
    const wrapper = document.createElement('div');
    wrapper.className = `ai-message-wrapper ${type}`;
    
    const avatar = document.createElement('div');
    avatar.className = `ai-avatar ${type}`;
    
    if (type === 'user') {
        const userIcon = document.createElement('i');
        userIcon.className = 'fas fa-user';
        avatar.appendChild(userIcon);
    } else {
        const img = document.createElement('img');
        img.src = 'img/logo.png';
        img.alt = 'AI';
        avatar.appendChild(img);
    }
    
    const messageContent = document.createElement('div');
    messageContent.className = 'ai-message-content';
    
    if (type === 'assistant') {
        messageContent.innerHTML = marked.parse(content);
    } else {
        messageContent.textContent = content;
    }
    
    wrapper.appendChild(avatar);
    wrapper.appendChild(messageContent);
    chatContainer.appendChild(wrapper);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addAISystemMessage(content) {
    hideAIWelcome();
    
    const chatContainer = document.getElementById('aiChatContainer');
    const message = document.createElement('div');
    message.className = 'ai-system-message';
    message.textContent = content;
    chatContainer.appendChild(message);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addAIErrorMessage(content) {
    hideAIWelcome();
    
    const chatContainer = document.getElementById('aiChatContainer');
    const message = document.createElement('div');
    message.className = 'ai-error-message';
    message.textContent = content;
    chatContainer.appendChild(message);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addAISuccessMessage(content) {
    hideAIWelcome();
    
    const chatContainer = document.getElementById('aiChatContainer');
    const message = document.createElement('div');
    message.className = 'ai-success-message';

    const formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    message.innerHTML = formattedContent;
    
    chatContainer.appendChild(message);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showAITyping() {
    hideAIWelcome();
    
    const chatContainer = document.getElementById('aiChatContainer');
    const wrapper = document.createElement('div');
    wrapper.className = 'ai-typing';
    wrapper.id = 'aiTypingIndicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'ai-avatar assistant';
    const img = document.createElement('img');
    img.src = 'img/logo.png';
    img.alt = 'AI';
    avatar.appendChild(img);
    
    const typingDots = document.createElement('div');
    typingDots.className = 'ai-typing-dots';
    typingDots.innerHTML = '<div class="ai-typing-dot"></div><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div>';
    
    wrapper.appendChild(avatar);
    wrapper.appendChild(typingDots);
    chatContainer.appendChild(wrapper);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function hideAITyping() {
    const indicator = document.getElementById('aiTypingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

async function triggerAIContinuation() {
    if (isAIProcessing) {
        console.log('AI is already processing, skipping continuation');
        return;
    }
    
    console.log('Triggering AI continuation...');
    isAIProcessing = true;
    showAITyping();
    
    try {
        const apiMessages = [AI_SYSTEM_PROMPT, ...aiMessages];
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'openai/gpt-oss-120b',
                messages: apiMessages,
                temperature: 0.7,
                max_tokens: 2048
            })
        });
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        let aiResponse = data.choices[0].message.content;
        
        hideAITyping();

        try {
            const parsed = JSON.parse(aiResponse);
            
            if (parsed.type === 'action') {
                if (parsed.message) {
                    addAIMessage(parsed.message, 'assistant');
                }
                
                aiMessages.push({ role: 'assistant', content: aiResponse });
                
                if (parsed.actions) {
                    await processAIActions(parsed.actions);
                }
            } else {
                addAIMessage(parsed.message, 'assistant');
                aiMessages.push({ role: 'assistant', content: aiResponse });
            }
            
        } catch (e) {
            addAIMessage(aiResponse, 'assistant');
            aiMessages.push({ role: 'assistant', content: aiResponse });
        }
        
    } catch (error) {
        hideAITyping();
        addAIErrorMessage('Sorry, I encountered an error continuing the task.');
        console.error('AI Continuation Error:', error);
    } finally {
        isAIProcessing = false;
    }
}

async function processAIActions(actions) {
    if (!actions || !Array.isArray(actions)) return false;
    
    let needsContinuation = false;
    
    for (const actionObj of actions) {
        const { action, app_id, app_name, new_name } = actionObj;
        
        try {
            switch (action) {
                case 'get_available_apps':
                    if (availableAppsCache && availableAppsCache.length > 0) {
                        console.log('Using cached app list from previous fetch');

                        const appsContext = availableAppsCache.map(app => ({
                            id: app.id,
                            name: app.name,
                            category: app.category || 'Other'
                        }));
                        
                        const systemMessage = {
                            role: 'system',
                            content: `Available apps in store: ${JSON.stringify(appsContext)}. Now complete the user's original request using the appropriate app_id from this list.`
                        };
                        aiMessages.push(systemMessage);
                        
                        addAISystemMessage('✓ Using cached app list. Processing your request...');
                        needsContinuation = true;
                    } else {
                        const availableApps = await fetchAvailableApps();
                        if (availableApps && availableApps.length > 0) {
                            const appsContext = availableApps.map(app => ({
                                id: app.id,
                                name: app.name,
                                category: app.category || 'Other'
                            }));
                            const systemMessage = {
                                role: 'system',
                                content: `Available apps in store: ${JSON.stringify(appsContext)}. Now complete the user's original request using the appropriate app_id from this list.`
                            };
                            aiMessages.push(systemMessage);
                            
                            addAISystemMessage('✓ Apps loaded. Processing your request...');
                            needsContinuation = true;
                            
                        } else {
                            addAIErrorMessage('Could not fetch available apps from the store.');
                        }
                    }
                    break;
                    
                case 'list_installed_apps':
                    const installedApps = safeGetAllApps();
                    const installedList = installedApps.map(app => 
                        `• **${app.name}** (${app.id})${app.pinned ? ' [Pinned]' : ''}`
                    ).join('\n');
                    addAISuccessMessage(`Installed Apps:\n${installedList}`);
                    break;
                    
                case 'list_open_windows':
                    const openWindows = getOpenWindows();
                    if (openWindows.length === 0) {
                        addAISuccessMessage('No windows are currently open.');
                    } else {
                        const windowsList = openWindows.map(win => 
                            `• **${win.name}**${win.minimized ? ' [Minimized]' : ''}${win.active ? ' [Active]' : ''}${win.fullscreen ? ' [Fullscreen]' : ''}`
                        ).join('\n');
                        addAISuccessMessage(`Open Windows:\n${windowsList}`);
                    }
                    break;
                    
                case 'get_current_window':
                    const currentWin = getCurrentWindow();
                    if (currentWin) {
                        addAISuccessMessage(`Current window: **${currentWin.name}**${currentWin.fullscreen ? ' [Fullscreen]' : ''}`);
                    } else {
                        addAISuccessMessage('No window is currently active.');
                    }
                    break;
                    
                case 'close_window':
                    if (app_id) {
                        const app = safeFindApp(app_id);
                        const appName = app ? app.name : app_id;
                        safeCloseWindow(app_id);
                        addAISuccessMessage(`Closed **${appName}**`);
                    }
                    break;
                    
                case 'close_current_window':
                    const currentWindow = getCurrentWindow();
                    if (currentWindow) {
                        safeCloseWindow(currentWindow.id);
                        addAISuccessMessage(`Closed **${currentWindow.name}**`);
                    } else {
                        addAIErrorMessage('No window is currently active to close.');
                    }
                    break;
                    
                case 'minimize_window':
                    if (app_id) {
                        const app = safeFindApp(app_id);
                        const appName = app ? app.name : app_id;
                        safeMinimizeWindow(app_id);
                        addAISuccessMessage(`Minimized **${appName}**`);
                    }
                    break;
                    
                case 'restore_window':
                    if (app_id) {
                        const app = safeFindApp(app_id);
                        const appName = app ? app.name : app_id;
                        safeRestoreWindow(app_id);
                        addAISuccessMessage(`Restored **${appName}**`);
                    }
                    break;
                    
                case 'install_app':
                    if (app_id) {
                        const apps = availableAppsCache || await fetchAvailableApps();
                        const appToInstall = apps.find(app => app.id === app_id);
                        
                        if (appToInstall) {
                            await safeInstallApp(appToInstall);
                            addAISuccessMessage(`Successfully installed **${appToInstall.name}**!`);
                        } else {
                            addAIErrorMessage(`App with ID "${app_id}" not found in store.`);
                        }
                    } else if (app_name) {
                        const apps = availableAppsCache || await fetchAvailableApps();
                        const appToInstall = findAppByName(app_name, apps);
                        
                        if (appToInstall) {
                            await safeInstallApp(appToInstall);
                            addAISuccessMessage(`Successfully installed **${appToInstall.name}**!`);
                        } else {
                            addAIErrorMessage(`App "${app_name}" not found in store.`);
                        }
                    }
                    break;
                    
                case 'uninstall_app':
                    if (app_id) {
                        const app = safeFindApp(app_id);
                        const appName = app ? app.name : app_id;
                        safeUninstallApp(app_id);
                        addAISuccessMessage(`Successfully uninstalled **${appName}**`);
                    }
                    break;
                    
                case 'open_app':
                    if (app_id) {
                        const app = safeFindApp(app_id);
                        const appName = app ? app.name : app_id;
                        safeOpenApp(app_id);
                        addAISuccessMessage(`Opened **${appName}**`);
                    }
                    break;
                    
                case 'pin_app':
                    if (app_id) {
                        const app = safeFindApp(app_id);
                        const appName = app ? app.name : app_id;
                        safePinApp(app_id);
                        addAISuccessMessage(`Pinned **${appName}** to dock`);
                    }
                    break;
                    
                case 'unpin_app':
                    if (app_id) {
                        const app = safeFindApp(app_id);
                        const appName = app ? app.name : app_id;
                        safeUnpinApp(app_id);
                        addAISuccessMessage(`Unpinned **${appName}** from dock`);
                    }
                    break;
                    
                case 'change_name':
    if (new_name) {
        if (typeof window.parent !== 'undefined' && typeof window.parent.updateDisplayName === 'function') {
            const success = await window.parent.updateDisplayName(new_name);
            if (success) {
                addAISuccessMessage(`Display name changed to **${new_name}**`);
            } else {
                addAIErrorMessage(`Failed to change display name. Please try using Settings.`);
            }
        } else if (typeof updateDisplayName === 'function') {
            const success = await updateDisplayName(new_name);
            if (success) {
                addAISuccessMessage(`Display name changed to **${new_name}**`);
            } else {
                addAIErrorMessage(`Failed to change display name. Please try using Settings.`);
            }
        } else {
            safeOpenApp('settings');
            addAISystemMessage(`Please use the Settings app to change your display name to "${new_name}".`);
        }
    } else {
        addAIErrorMessage('No name was provided to change to.');
    }
    break;
                    
                case 'open_settings':
                    safeOpenApp('settings');
                    addAISuccessMessage(`Opened **Settings**`);
                    break;
                    
                case 'open_store':
                    safeOpenApp('appStore');
                    addAISuccessMessage(`Opened **App Store**`);
                    break;
                    
                default:
                    console.warn('Unknown action:', action);
            }
        } catch (error) {
            console.error('Error processing action:', error);
            addAIErrorMessage(`Failed to execute action: ${action}`);
        }
    }

    return needsContinuation;
}

async function sendAIMessage() {
    const input = document.getElementById('aiInput');
    const sendBtn = document.getElementById('aiSendBtn');
    const userMessage = input.value.trim();
    
    if (!userMessage || isAIProcessing) return;
    
    if (!GROQ_API_KEY) {
        addAISystemMessage('Please wait, loading AI configuration...');
        return;
    }
    addAIMessage(userMessage, 'user');
    aiMessages.push({ role: 'user', content: userMessage });

    input.value = '';
    input.style.height = 'auto';
    input.disabled = true;
    sendBtn.disabled = true;
    isAIProcessing = true;
    showAITyping();
    
    try {
        const apiMessages = [AI_SYSTEM_PROMPT, ...aiMessages];
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: apiMessages,
                temperature: 0.7,
                max_tokens: 2048
            })
        });
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        let aiResponse = data.choices[0].message.content;
        
        hideAITyping();
        try {
            const parsed = JSON.parse(aiResponse);
            
            if (parsed.type === 'action') {
                if (parsed.message) {
                    addAIMessage(parsed.message, 'assistant');
                }
                
                aiMessages.push({ role: 'assistant', content: aiResponse });
                
                if (parsed.actions) {
                    const needsContinuation = await processAIActions(parsed.actions);
                    if (needsContinuation) {
                        if (continuationTimeout) {
                            clearTimeout(continuationTimeout);
                        }
                        console.log('Scheduling AI continuation in 2.5 seconds...');
                        continuationTimeout = setTimeout(() => {
                            triggerAIContinuation();
                        }, 2500);
                    }
                }
            } else {
                addAIMessage(parsed.message, 'assistant');
                aiMessages.push({ role: 'assistant', content: aiResponse });
            }
            
        } catch (e) {
            addAIMessage(aiResponse, 'assistant');
            aiMessages.push({ role: 'assistant', content: aiResponse });
        }
        
    } catch (error) {
        hideAITyping();
        addAIErrorMessage('Sorry, I encountered an error. Please try again.');
        console.error('AI Error:', error);
    } finally {
        input.disabled = false;
        sendBtn.disabled = false;
        isAIProcessing = false;
        input.focus();
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    await loadGroqAPIKey();
    document.addEventListener('click', (e) => {
        const panel = document.getElementById('aiAssistantPanel');
        const searchContainer = document.getElementById('aiSearchContainer');
        
        if (panel.classList.contains('active') && 
            !panel.contains(e.target) && 
            !searchContainer.contains(e.target)) {
            toggleAIAssistant();
        }
    });
});