import Hyperbeam from 'https://unpkg.com/@hyperbeam/web@latest/dist/index.js';

const CONTAINER_ID = 'hyperbeam-container';
const SESSION_DURATION = 900;
const API_ENDPOINT = 'https://vm.cdn.cgamz.online';

let hb = null;
let countdownInterval = null;
let timeRemaining = SESSION_DURATION;
let currentSessionId = null;
let fullscreenWindow = null;
let embedUrl = null;

const startBtn = document.getElementById('startBtn');
const endBtn = document.getElementById('endBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const timerEl = document.getElementById('timer');
const statusEl = document.getElementById('status');
const container = document.getElementById(CONTAINER_ID);
const containerMessage = document.getElementById('containerMessage');

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

async function startSession() {
    try {
        startBtn.disabled = true;
        statusEl.textContent = 'Creating session...';
        containerMessage.textContent = 'Creating Hyperbeam session...';

        console.log('Sending request to:', API_ENDPOINT);

        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'craftedgamz-vm'
            },
            body: JSON.stringify({ action: 'create' })
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', [...response.headers.entries()]);

        const responseText = await response.text();
        console.log('Response text:', responseText);

        if (!response.ok) {
            let errorData;
            try {
                errorData = JSON.parse(responseText);
            } catch (e) {
                errorData = { error: responseText };
            }
            
            console.error('API Error:', errorData);
            throw new Error(errorData.error || errorData.message || `API Error: ${response.status}`);
        }

        const data = JSON.parse(responseText);
        console.log('Session data:', data);

        currentSessionId = data.session_id;
        embedUrl = data.embed_url;

        if (!embedUrl) {
            throw new Error('No embed_url returned from API');
        }

        statusEl.textContent = 'Loading VM...';
        containerMessage.textContent = 'Loading virtual machine...';
        
        console.log('Initializing Hyperbeam with URL:', embedUrl);
        hb = await Hyperbeam(container, embedUrl);
        
        containerMessage.style.display = 'none';
        fullscreenBtn.style.display = 'inline-block';
        statusEl.innerHTML = '<i class="fas fa-check-circle"></i> Session active';
        statusEl.classList.add('active');
        endBtn.disabled = false;
        timerEl.style.display = 'block';
        
        startCountdown();

    } catch (error) {
        console.error('Error starting session:', error);
        console.error('Error stack:', error.stack);
        
        statusEl.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error: ' + error.message;
        startBtn.disabled = false;
        containerMessage.innerHTML = `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px;">
            <div style="font-size: 24px; margin-bottom: 10px;"><i class="fas fa-times-circle"></i></div>
            <div style="margin-bottom: 10px;">Failed to create session</div>
            <div style="font-size: 12px; color: rgba(255, 255, 255, 0.6);">${error.message}</div>
            <div style="font-size: 10px; color: rgba(255, 255, 255, 0.4); margin-top: 10px;">Check browser console for details</div>
        </div>`;
    }
}

function startCountdown() {
    timeRemaining = SESSION_DURATION;
    updateTimerDisplay();

    countdownInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 60) {
            timerEl.classList.add('warning');
        }

        if (timeRemaining <= 0) {
            endSession(true);
        }
    }, 1000);
}

function updateTimerDisplay() {
    timerEl.innerHTML = `<i class="fas fa-clock"></i> Time remaining: ${formatTime(timeRemaining)}`;
}

async function endSession(autoEnded = false) {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }

    if (currentSessionId) {
        try {
            console.log('Terminating session:', currentSessionId);
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'craftedgamz-vm'
                },
                body: JSON.stringify({ 
                    action: 'delete',
                    sessionId: currentSessionId
                })
            });
            
            const result = await response.json();
            console.log('Session termination result:', result);
        } catch (error) {
            console.error('Error terminating session:', error);
        }
        currentSessionId = null;
    }

    if (hb) {
        hb.destroy();
        hb = null;
    }

    if (fullscreenWindow && !fullscreenWindow.closed) {
        fullscreenWindow.close();
    }

    containerMessage.style.display = 'flex';
    fullscreenBtn.style.display = 'none';
    containerMessage.textContent = autoEnded ? 
        'Session ended automatically (15 minute timeout)' : 
        'Session ended. Click "Start Session" to begin a new one';
    
    statusEl.textContent = autoEnded ? 'Session auto-ended' : 'No active session';
    statusEl.classList.remove('active');
    startBtn.disabled = false;
    endBtn.disabled = true;
    timerEl.style.display = 'none';
    timerEl.classList.remove('warning');
}

function enterFullscreen() {
    if (!embedUrl) return;
    
    const fullscreenHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>VM Fullscreen - Crafted Gamz</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body, html {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    background: #000;
                }
                iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                }
            </style>
        </head>
        <body>
            <iframe src="${embedUrl}" allow="microphone; camera; display-capture"></iframe>
            <script src="js/loading.js"></script>
</body>
        </html>
    `;
    
    const blob = new Blob([fullscreenHTML], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    fullscreenWindow = window.open(blobUrl, '_blank');
}

function exitFullscreen() {
    if (fullscreenWindow && !fullscreenWindow.closed) {
        fullscreenWindow.close();
    }
    fullscreenWindow = null;
}

startBtn.addEventListener('click', startSession);
endBtn.addEventListener('click', () => endSession(false));
fullscreenBtn.addEventListener('click', enterFullscreen);

window.addEventListener('beforeunload', () => {
    if (hb) {
        hb.destroy();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fullscreenWindow && !fullscreenWindow.closed) {
        exitFullscreen();
    }
});

console.log('VM.js loaded, API endpoint:', API_ENDPOINT);