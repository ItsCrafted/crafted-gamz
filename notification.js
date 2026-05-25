
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, onValue, push, remove } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

class GlobalNotificationSystem {
    constructor() {
        this.notifications = new Map();
        this.marked = null;
        this.init();
    }

    async loadFirebaseConfig() {
        const res = await fetch('/.netlify/functions/get-firebase-config');
        if (!res.ok) throw new Error('Failed to fetch Firebase config');
        return await res.json();
    }

    async loadMarked() {
        
        if (!window.marked) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/marked/4.3.0/marked.min.js';
            document.head.appendChild(script);
            
            return new Promise((resolve) => {
                script.onload = () => {
                    this.marked = window.marked;
                    resolve();
                };
            });
        } else {
            this.marked = window.marked;
        }
    }

    async init() {
        try {
            const config = await this.loadFirebaseConfig();
            const app = initializeApp(config);
            this.db = getDatabase(app);

            await this.loadMarked();
            this.injectStyles();
            this.createNotificationContainer();
            this.startListening();
        } catch (err) {
            console.error("Failed to initialize notification system:", err);
        }
    }

    injectStyles() {
        if (document.getElementById('notification-styles')) return;

        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .global-notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 15px;
                max-width: 450px;
                pointer-events: none;
            }

            .global-notification {
                background: rgba(0, 0, 0, 0.65);
                border: 1px solid #00ffe5;
                border-radius: 12px;
                padding: 16px 20px;
                backdrop-filter: blur(15px);
                box-shadow: 0 4px 25px rgba(0, 255, 229, 0.3);
                transform: translateX(470px);
                opacity: 0;
                transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
                position: relative;
                overflow: hidden;
                pointer-events: all;
                max-width: 430px;
                word-wrap: break-word;
                margin-bottom: 0;
            }

            .global-notification.show {
                transform: translateX(0);
                opacity: 1;
            }

            .global-notification.stacked {
                animation: slideInStack 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
            }

            @keyframes slideInStack {
                0% {
                    transform: translateX(470px) scale(0.95);
                    opacity: 0;
                }
                50% {
                    transform: translateX(-20px) scale(0.98);
                    opacity: 0.8;
                }
                100% {
                    transform: translateX(0) scale(1);
                    opacity: 1;
                }
            }

            .global-notification.show {
                transform: translateX(0);
                opacity: 1;
            }

            .global-notification::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, #00ffe5, #4bf9ed, #96f3f5);
                animation: shimmer 2s infinite;
            }

            @keyframes shimmer {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }

            .global-notification-header {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 12px;
            }

            .global-notification-icon {
                color: #00ffe5;
                font-size: 18px;
                width: 20px;
                text-align: center;
            }

            .global-notification-title {
                color: #4bf9ed;
                font-weight: 600;
                font-size: 16px;
                flex: 1;
                font-family: Arial, sans-serif;
            }

            .global-notification-close {
                background: none;
                border: none;
                color: #96f3f5;
                cursor: pointer;
                font-size: 16px;
                padding: 4px;
                border-radius: 4px;
                transition: all 0.3s ease;
                opacity: 0.7;
            }

            .global-notification-close:hover {
                background: #081a2e;
                opacity: 1;
                transform: scale(1.1);
            }

            .global-notification-body {
                font-size: 14px;
                line-height: 1.5;
                color: #96f3f5;
                font-family: Arial, sans-serif;
                margin-bottom: 10px;
            }

            .global-notification-body.markdown {
                line-height: 1.6;
            }

            .global-notification-body h1,
            .global-notification-body h2,
            .global-notification-body h3,
            .global-notification-body h4,
            .global-notification-body h5,
            .global-notification-body h6 {
                color: #4bf9ed;
                margin: 12px 0 6px 0;
                font-weight: 600;
            }

            .global-notification-body h1 { font-size: 18px; }
            .global-notification-body h2 { font-size: 16px; }
            .global-notification-body h3 { font-size: 15px; }
            .global-notification-body h4 { font-size: 14px; }
            .global-notification-body h5 { font-size: 13px; }
            .global-notification-body h6 { font-size: 13px; }

            .global-notification-body strong {
                color: #00ffe5;
                font-weight: 600;
            }

            .global-notification-body em {
                color: #4bf9ed;
                font-style: italic;
            }

            .global-notification-body code {
                background: rgba(0, 255, 229, 0.15);
                color: #00ffe5;
                padding: 2px 6px;
                border-radius: 4px;
                font-family: 'Courier New', monospace;
                font-size: 13px;
            }

            .global-notification-body pre {
                background: rgba(0, 0, 0, 0.6);
                border: 1px solid #081a2e;
                border-radius: 6px;
                padding: 10px;
                overflow-x: auto;
                margin: 8px 0;
                font-size: 12px;
            }

            .global-notification-body pre code {
                background: none;
                padding: 0;
                color: #96f3f5;
            }

            .global-notification-body ul,
            .global-notification-body ol {
                padding-left: 18px;
                margin: 8px 0;
            }

            .global-notification-body li {
                margin-bottom: 4px;
                color: #96f3f5;
            }

            .global-notification-body blockquote {
                border-left: 3px solid #4bf9ed;
                padding-left: 12px;
                margin: 12px 0;
                opacity: 0.9;
                font-style: italic;
            }

            .global-notification-body p {
                margin: 8px 0;
            }

            .global-notification-body p:first-child {
                margin-top: 0;
            }

            .global-notification-body p:last-child {
                margin-bottom: 0;
            }

            .global-notification-body a {
                color: #4bf9ed;
                text-decoration: none;
                border-bottom: 1px solid transparent;
                transition: border-color 0.3s ease;
            }

            .global-notification-body a:hover {
                border-bottom-color: #4bf9ed;
            }

            .global-notification-body i.fas,
            .global-notification-body i.far,
            .global-notification-body i.fab {
                color: #00ffe5;
                margin: 0 4px;
                text-shadow: 0 0 8px rgba(0, 255, 229, 0.4);
                animation: iconGlow 2s ease-in-out infinite alternate;
            }

            @keyframes iconGlow {
                0% { text-shadow: 0 0 8px rgba(0, 255, 229, 0.4); }
                100% { text-shadow: 0 0 12px rgba(0, 255, 229, 0.8); }
            }-body a {
                color: #4bf9ed;
                text-decoration: none;
                border-bottom: 1px solid transparent;
                transition: border-color 0.3s ease;
            }

            .global-notification-body a:hover {
                border-bottom-color: #4bf9ed;
            }

            .global-notification-time {
                font-size: 12px;
                color: #96f3f5;
                opacity: 0.6;
                display: flex;
                align-items: center;
                gap: 6px;
                font-family: Arial, sans-serif;
            }

            .global-notification.pulse {
                animation: pulseGlow 0.6s ease-out;
            }

            @keyframes pulseGlow {
                0% { 
                    box-shadow: 0 4px 25px rgba(0, 255, 229, 0.3);
                    transform: translateX(0) scale(1);
                }
                50% { 
                    box-shadow: 0 6px 35px rgba(0, 255, 229, 0.6);
                    transform: translateX(0) scale(1.02);
                }
                100% { 
                    box-shadow: 0 4px 25px rgba(0, 255, 229, 0.3);
                    transform: translateX(0) scale(1);
                }
            }

            @media (max-width: 768px) {
                .global-notification-container {
                    left: 10px;
                    right: 10px;
                    max-width: none;
                }
                
                .global-notification {
                    max-width: none;
                    transform: translateY(-100px);
                    opacity: 0;
                }
                
                .global-notification.show {
                    transform: translateY(0);
                    opacity: 1;
                }

                .global-notification-body {
                    font-size: 13px;
                }

                .global-notification-body h1 { font-size: 16px; }
                .global-notification-body h2 { font-size: 15px; }
                .global-notification-body h3 { font-size: 14px; }
            }

            .fade-out {
                transform: translateX(470px) !important;
                opacity: 0 !important;
            }

            @media (max-width: 768px) {
                .fade-out {
                    transform: translateY(-100px) !important;
                }
            }

            .global-notification-expand {
                background: none;
                border: none;
                color: #4bf9ed;
                cursor: pointer;
                font-size: 12px;
                padding: 4px 0;
                text-decoration: underline;
                opacity: 0.8;
                transition: opacity 0.3s ease;
                font-family: Arial, sans-serif;
            }

            .global-notification-expand:hover {
                opacity: 1;
            }

            .global-notification-body.collapsed {
                max-height: 60px;
                overflow: hidden;
                position: relative;
            }

            .global-notification-body.collapsed::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 20px;
                background: linear-gradient(transparent, rgba(0, 0, 0, 0.65));
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }

    createNotificationContainer() {
        if (document.getElementById('global-notification-container')) return;

        const container = document.createElement('div');
        container.id = 'global-notification-container';
        container.className = 'global-notification-container';
        document.body.appendChild(container);
    }

    startListening() {
        const notificationsRef = ref(this.db, 'notifications');
        
        onValue(notificationsRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) return;

            Object.keys(data).forEach(key => {
                if (!this.notifications.has(key)) {
                    const notification = { id: key, ...data[key] };
                    this.notifications.set(key, notification);
                    this.showNotification(notification);
                }
            });
        });
    }

    renderMarkdown(text) {
        if (!this.marked) return this.escapeHtml(text);
        
        return this.marked.parse(text, {
            breaks: true,
            gfm: true
        });
    }

    showNotification(notification) {
        const container = document.getElementById('global-notification-container');
        if (!container) return;

        const notifEl = document.createElement('div');
        notifEl.className = 'global-notification';
        notifEl.dataset.id = notification.id;
        
        const timestamp = notification.timestamp || Date.now();
        const timeString = new Date(timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        const message = notification.message || notification.text || 'New notification';
        const isMarkdown = notification.markdown === true || notification.markdown === 'true';
        
        let renderedMessage;
        let bodyClass = 'global-notification-body';
        
        if (isMarkdown) {
            renderedMessage = this.renderMarkdown(message);
            bodyClass += ' markdown';
        } else {
            renderedMessage = this.escapeHtml(message);
        }

        
        const isLongContent = message.length > 200 || message.split('\n').length > 4;
        let expandButton = '';
        
        if (isLongContent) {
            bodyClass += ' collapsed';
            expandButton = `<button class="global-notification-expand" onclick="window.globalNotifications.toggleExpand('${notification.id}')">Show more...</button>`;
        }

        notifEl.innerHTML = `
            <div class="global-notification-header">
                <div class="global-notification-icon"><i class="fas fa-gamepad"></i></div>
                <div class="global-notification-title">Crafted Gamz</div>
                <button class="global-notification-close" onclick="window.globalNotifications.dismissNotification('${notification.id}')">
                    ✕
                </button>
            </div>
            <div class="${bodyClass}" id="body-${notification.id}">${renderedMessage}</div>
            ${expandButton}
            <div class="global-notification-time">
                <i class="fas fa-clock"></i> ${timeString}
            </div>
        `;

        
        const existingNotifications = container.children.length;
        
        if (existingNotifications > 0) {
            
            notifEl.classList.add('stacked');
        }

        
        container.insertBefore(notifEl, container.firstChild);

        
        const animationDelay = existingNotifications > 0 ? existingNotifications * 100 : 0;
        
        setTimeout(() => {
            notifEl.classList.add('show');
            setTimeout(() => notifEl.classList.add('pulse'), 200);
        }, animationDelay);

        
        const baseDelay = isLongContent ? 12000 : 8000;
        const stackDelay = existingNotifications * 1000; 
        const autoHideDelay = baseDelay + stackDelay;
        
        setTimeout(() => {
            if (document.querySelector(`[data-id="${notification.id}"]`)) {
                this.dismissNotification(notification.id);
            }
        }, autoHideDelay);
    }

    toggleExpand(id) {
        const bodyEl = document.getElementById(`body-${id}`);
        const expandBtn = bodyEl.parentElement.querySelector('.global-notification-expand');
        
        if (bodyEl.classList.contains('collapsed')) {
            bodyEl.classList.remove('collapsed');
            expandBtn.textContent = 'Show less...';
        } else {
            bodyEl.classList.add('collapsed');
            expandBtn.textContent = 'Show more...';
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    dismissNotification(id) {
        const notifEl = document.querySelector(`[data-id="${id}"]`);
        if (notifEl) {
            notifEl.classList.add('fade-out');
            setTimeout(() => {
                if (notifEl.parentNode) {
                    notifEl.remove();
                }
            }, 500);
        }

        
        const notificationRef = ref(this.db, `notifications/${id}`);
        remove(notificationRef).catch(err => {
            console.error('Failed to remove notification:', err);
        });

        this.notifications.delete(id);
    }

    
    async sendNotification(message, options = {}) {
        const notificationsRef = ref(this.db, 'notifications');
        const notification = {
            message: message,
            timestamp: Date.now(),
            markdown: options.markdown || false,
            ...options
        };

        try {
            await push(notificationsRef, notification);
            console.log('Notification sent successfully');
        } catch (error) {
            console.error('Failed to send notification:', error);
        }
    }
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.globalNotifications = new GlobalNotificationSystem();
    });
} else {
    window.globalNotifications = new GlobalNotificationSystem();
}


window.GlobalNotificationSystem = GlobalNotificationSystem;