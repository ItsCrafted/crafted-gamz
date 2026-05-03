function toggleAIAssistant() {
    const panel = document.getElementById('aiAssistantPanel');
    const input = document.getElementById('aiInput');
    
    if (!panel) return;
    
    panel.classList.toggle('active');
    
    if (panel.classList.contains('active') && input) {
        input.focus();
    }
}

function autoResizeAI(textarea) {
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
}

function handleAIKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        if (typeof sendAIMessage !== 'undefined') {
            sendAIMessage();
        }
    }
}
function useSuggestion(text) {
    const input = document.getElementById('aiInput');
    if (input) {
        input.value = text;
        setTimeout(() => {
            if (typeof sendAIMessage !== 'undefined') {
                sendAIMessage();
            }
        }, 100);
    }
}