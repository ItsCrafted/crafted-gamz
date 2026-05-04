const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_KEY_URL = 'https://ai.cdn.cgamz.online';
let API_KEY = null;

let currentModel = 'llama-3.3-70b-versatile';
let messages = [];
let recognition = null;
let isListening = false;
let currentAudio = null;

const SYSTEM_PROMPT = {
    role: 'system',
    content: 'You are Crafted AI, an intelligent and helpful AI assistant. You are designed to assist users with a wide variety of tasks including answering questions, writing, coding, analysis, creative tasks, and more. You are knowledgeable, friendly, and professional. Always strive to provide accurate, helpful, and comprehensive responses.'
};

async function loadAPIKey() {
    try {
        console.log('Fetching Groq API key from:', GROQ_KEY_URL);
        
        const response = await fetch(GROQ_KEY_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API key fetch failed:', response.status, errorText);
            throw new Error(`Failed to fetch API key: ${response.status}`);
        }
        
        const data = await response.json();
        API_KEY = data.apiKey;
        console.log('API Key loaded successfully');
    } catch (error) {
        console.error('Error loading API key:', error);
        addSystemMessage('Error: Could not load API configuration. Please refresh the page.');
    }
}

function initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('userInput').value = transcript;
            autoResize(document.getElementById('userInput'));
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            stopVoiceInput();
        };

        recognition.onend = function() {
            stopVoiceInput();
        };
    }
}

function initCustomDropdown() {
    const customSelect = document.getElementById('customSelect');
    const modelOverlay = document.getElementById('modelOverlay');
    const selectedModel = document.getElementById('selectedModel');
    const modelOptions = document.querySelectorAll('.model-option');

    customSelect.addEventListener('click', function(e) {
        e.stopPropagation();
        modelOverlay.classList.add('active');
    });

    modelOverlay.addEventListener('click', function(e) {
        if (e.target === modelOverlay) {
            modelOverlay.classList.remove('active');
        }
    });

    modelOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            
            modelOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            const modelName = this.querySelector('.model-option-name').textContent;
            selectedModel.textContent = modelName;
            currentModel = this.getAttribute('data-value');
            
            modelOverlay.classList.remove('active');
            
            addSystemMessage(`Model changed to ${modelName}`);
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modelOverlay.classList.remove('active');
        }
    });
}

function useSuggestion(text) {
    document.getElementById('userInput').value = text;
    sendMessage();
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function hideWelcomeScreen() {
    const welcomeScreen = document.querySelector('.welcome-screen');
    if (welcomeScreen) welcomeScreen.remove();
}

function addMessageToUI(content, type) {
    hideWelcomeScreen();
    const chatContainer = document.getElementById('chatContainer');
    const wrapper = document.createElement('div');
    wrapper.className = `message-wrapper ${type}`;
    
    const avatar = document.createElement('div');
    avatar.className = `avatar ${type}`;
    
    if (type === 'user') {
        avatar.textContent = 'U';
    } else {
        const img = document.createElement('img');
        img.src = 'logo.png';
        img.alt = 'AI';
        avatar.appendChild(img);
    }
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    if (type === 'ai') {
        messageContent.innerHTML = marked.parse(content);
        
        const speakerBtn = document.createElement('button');
        speakerBtn.className = 'speaker-btn';
        speakerBtn.innerHTML = '<i class="fas fa-volume-up"></i> Listen';
        speakerBtn.onclick = () => speakText(content, speakerBtn);
        messageContent.appendChild(speakerBtn);
    } else {
        messageContent.textContent = content;
    }
    
    wrapper.appendChild(avatar);
    wrapper.appendChild(messageContent);
    chatContainer.appendChild(wrapper);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addSystemMessage(content) {
    hideWelcomeScreen();
    const chatContainer = document.getElementById('chatContainer');
    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper ai';
    wrapper.style.opacity = '0.6';
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar ai';
    avatar.innerHTML = '<i class="fas fa-info-circle"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    wrapper.appendChild(avatar);
    wrapper.appendChild(messageContent);
    chatContainer.appendChild(wrapper);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingIndicator() {
    hideWelcomeScreen();
    const chatContainer = document.getElementById('chatContainer');
    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper ai';
    wrapper.id = 'typingIndicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar ai';
    const img = document.createElement('img');
    img.src = 'logo.png';
    img.alt = 'AI';
    avatar.appendChild(img);
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    
    wrapper.appendChild(avatar);
    wrapper.appendChild(typingDiv);
    chatContainer.appendChild(wrapper);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

async function sendMessage() {
    const input = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const userMessage = input.value.trim();
    
    if (!userMessage) return;
    
    if (!API_KEY) {
        addSystemMessage('Please wait, loading API configuration...');
        return;
    }
    
    addMessageToUI(userMessage, 'user');
    messages.push({ role: 'user', content: userMessage });
    
    input.value = '';
    input.style.height = 'auto';
    input.disabled = true;
    sendBtn.disabled = true;
    
    showTypingIndicator();
    
    try {
        const apiMessages = [SYSTEM_PROMPT, ...messages];
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: currentModel,
                messages: apiMessages,
                temperature: 0.7,
                max_tokens: 2048
            })
        });
        
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        const aiMessage = data.choices[0].message.content;
        
        hideTypingIndicator();
        addMessageToUI(aiMessage, 'ai');
        messages.push({ role: 'assistant', content: aiMessage });
        
    } catch (error) {
        hideTypingIndicator();
        addMessageToUI('Sorry, I encountered an error. Please try again.', 'ai');
        console.error('Error:', error);
    } finally {
        input.disabled = false;
        sendBtn.disabled = false;
        input.focus();
    }
}

function toggleVoiceInput() {
    const voiceBtn = document.getElementById('voiceInputBtn');
    
    if (!recognition) {
        alert('Speech recognition is not supported in your browser.');
        return;
    }

    if (isListening) {
        recognition.stop();
        stopVoiceInput();
    } else {
        recognition.start();
        isListening = true;
        voiceBtn.classList.add('listening');
        voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
    }
}

function stopVoiceInput() {
    const voiceBtn = document.getElementById('voiceInputBtn');
    isListening = false;
    voiceBtn.classList.remove('listening');
    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
}

function speakText(text, button) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        document.querySelectorAll('.speaker-btn.playing').forEach(btn => {
            btn.classList.remove('playing');
            btn.innerHTML = '<i class="fas fa-volume-up"></i> Listen';
        });
    }

    if (button.classList.contains('playing')) {
        button.classList.remove('playing');
        button.innerHTML = '<i class="fas fa-volume-up"></i> Listen';
        return;
    }

    const cleanText = text
        .replace(/#{1,6}\s/g, '')
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/`{1,3}[^`]*`{1,3}/g, '')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .replace(/^\s*[-*+]\s/gm, '')
        .trim();

    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        button.classList.add('playing');
        button.innerHTML = '<i class="fas fa-stop"></i> Stop';

        utterance.onend = function() {
            button.classList.remove('playing');
            button.innerHTML = '<i class="fas fa-volume-up"></i> Listen';
            currentAudio = null;
        };

        utterance.onerror = function(event) {
            console.error('Speech synthesis error:', event);
            button.classList.remove('playing');
            button.innerHTML = '<i class="fas fa-volume-up"></i> Listen';
            currentAudio = null;
        };

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        currentAudio = { pause: () => window.speechSynthesis.cancel() };
    } else {
        alert('Text-to-speech is not supported in your browser.');
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    await loadAPIKey();
    initSpeechRecognition();
    initCustomDropdown();
});