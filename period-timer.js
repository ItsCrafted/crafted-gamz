console.log('Modern Period Timer loaded and executing!');

(function() {
    'use strict';
    
    
    window.periodTimerDebug = {
        simulatedTime: null,
        simulatedDay: null,
        setTime: function(hours, minutes, seconds = 0) {
            const now = new Date();
            this.simulatedTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
            console.log('Simulated time set to:', this.simulatedTime.toLocaleTimeString());
        },
        setDay: function(dayIndex) {
            this.simulatedDay = dayIndex;
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            console.log('Simulated day set to:', days[dayIndex]);
        },
        reset: function() {
            this.simulatedTime = null;
            this.simulatedDay = null;
            console.log('Debug mode reset to real time');
        },
        getCurrentTime: function() {
            return this.simulatedTime || new Date();
        },
        getCurrentDay: function() {
            return this.simulatedDay !== null ? this.simulatedDay : new Date().getDay();
        }
    };
    
    
    const schedules = {
        1: [
            { name: '1st Period', start: [8, 5], end: [8, 54] },
            { name: 'Passing', start: [8, 54], end: [8, 58] },
            { name: '2nd Period', start: [8, 58], end: [9, 44] },
            { name: 'Passing', start: [9, 44], end: [9, 48] },
            { name: '3rd Period', start: [9, 48], end: [10, 34] },
            { name: 'Passing', start: [10, 34], end: [10, 38] },
            { name: 'Advisory', start: [10, 38], end: [10, 56] },
            { name: 'Passing', start: [10, 56], end: [11, 0] },
            { name: '4th Period', start: [11, 0], end: [11, 46] },
            { name: 'Passing', start: [11, 46], end: [11, 50] },
            { name: 'B Lunch', start: [11, 50], end: [12, 20] },
            { name: 'Passing', start: [12, 20], end: [12, 24] },
            { name: '5th Period', start: [12, 24], end: [13, 10] },
            { name: 'Passing', start: [13, 10], end: [13, 14] },
            { name: '6th Period', start: [13, 14], end: [14, 0] },
            { name: 'Passing', start: [14, 0], end: [14, 4] },
            { name: '7th Period', start: [14, 4], end: [14, 50] }
        ],
        2: [
            { name: '1st Period', start: [8, 5], end: [8, 58] },
            { name: 'Passing', start: [8, 58], end: [9, 2] },
            { name: '2nd Period', start: [9, 2], end: [9, 51] },
            { name: 'Passing', start: [9, 51], end: [9, 55] },
            { name: '3rd Period', start: [9, 55], end: [10, 44] },
            { name: 'Passing', start: [10, 44], end: [10, 48] },
            { name: '4th Period', start: [10, 48], end: [11, 37] },
            { name: 'Passing', start: [11, 37], end: [11, 41] },
            { name: 'B Lunch', start: [11, 41], end: [12, 11] },
            { name: 'Passing', start: [12, 11], end: [12, 15] },
            { name: '5th Period', start: [12, 15], end: [13, 4] },
            { name: 'Passing', start: [13, 4], end: [13, 8] },
            { name: '6th Period', start: [13, 8], end: [13, 57] },
            { name: 'Passing', start: [13, 57], end: [14, 1] },
            { name: '7th Period', start: [14, 1], end: [14, 50] }
        ]
    };
    
    schedules[4] = schedules[1]; 
    schedules[3] = schedules[2]; 
    schedules[5] = schedules[2]; 
    
    
    const existingOverlay = document.getElementById('period-timer-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { 
                opacity: 0;
                transform: translateY(-20px) scale(0.95);
            }
            to { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        .period-container {
            background: rgba(0, 0, 0, 0.65);
            border-radius: 30px;
            padding: 60px 80px;
            box-shadow:
                0 0 10px rgba(150, 243, 245, 0.6),
                0 0 20px rgba(150, 243, 245, 0.4),
                0 0 30px rgba(150, 243, 245, 0.2),
                0 0 40px rgba(150, 243, 245, 0.1),
                0 0 15px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            color: #96f3f5;
            user-select: none;
            animation: slideIn 0.3s ease-out;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 40px;
            position: relative;
            min-width: 700px;
            max-width: 900px;
        }
        .close-btn {
            position: absolute;
            top: 25px;
            right: 30px;
            background: transparent;
            border: 1px solid rgba(150, 243, 245, 0.3);
            color: #96f3f5;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            transition: all 0.3s ease;
            font-weight: bold;
            font-family: inherit;
        }
        .close-btn:hover {
            background: rgba(0, 0, 0, 0.4);
            transform: translateY(-1px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        .header-section {
            text-align: center;
            margin-bottom: 20px;
        }
        .title {
            font-size: 32px;
            font-weight: bold;
            color: #96f3f5;
            margin-bottom: 15px;
            letter-spacing: 1px;
        }
        .current-time {
            font-size: 28px;
            font-weight: 200;
            color: #96f3f5;
            font-family: 'Courier New', monospace;
            letter-spacing: 2px;
            text-shadow: 0 0 20px rgba(150, 243, 245, 0.5);
            background: rgba(0, 0, 0, 0.8);
            padding: 15px 30px;
            border-radius: 15px;
            border: 1px solid rgba(150, 243, 245, 0.2);
            margin: 15px 0;
            animation: pulse 3s infinite;
        }
        .date-info {
            font-size: 16px;
            color: #96f3f5;
            opacity: 0.8;
            margin: 10px 0;
        }
        .schedule-type {
            font-size: 28px;
            color: #96f3f5;
            opacity: 0.8;
            font-weight: bold;
        }
        .debug-notice {
            background: rgba(150, 243, 245, 0.1);
            border: 1px solid rgba(150, 243, 245, 0.3);
            border-radius: 15px;
            padding: 12px 20px;
            margin: 15px 0;
            text-align: center;
            color: #96f3f5;
            font-size: 14px;
            animation: pulse 2s infinite;
        }
        .status-section {
            width: 100%;
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid rgba(150, 243, 245, 0.3);
            border-radius: 20px;
            padding: 30px;
            text-shadow: 0 0 10px rgba(150, 243, 245, 0.3);
            box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
        }
        .current-status {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #96f3f5;
            margin-bottom: 25px;
            padding: 15px;
            border-radius: 15px;
            background: linear-gradient(135deg, rgba(150, 243, 245, 0.15), rgba(150, 243, 245, 0.05));
            border: 1px solid rgba(150, 243, 245, 0.2);
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 25px 0;
        }
        .info-card {
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(150, 243, 245, 0.2);
            border-radius: 15px;
            padding: 25px;
            transition: all 0.3s ease;
        }
        .info-card:hover {
            background: rgba(0, 0, 0, 0.4);
            border-color: rgba(150, 243, 245, 0.4);
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
        .card-title {
            font-size: 18px;
            font-weight: bold;
            color: #96f3f5;
            margin-bottom: 20px;
            text-align: center;
            border-bottom: 1px solid rgba(150, 243, 245, 0.2);
            padding-bottom: 10px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid rgba(150, 243, 245, 0.1);
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            color: #96f3f5;
            font-weight: 500;
            opacity: 0.9;
        }
        .info-value {
            color: #96f3f5;
            font-weight: bold;
        }
        .progress-section {
            width: 100%;
            margin: 20px 0;
        }
        .progress-bar {
            width: 100%;
            height: 12px;
            background: rgba(150, 243, 245, 0.1);
            border-radius: 6px;
            overflow: hidden;
            margin: 15px 0;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #96f3f5, #4bf9ed);
            transition: width 0.5s ease;
            border-radius: 6px;
            box-shadow: 0 0 10px rgba(150, 243, 245, 0.5);
        }
        .weekend-message {
            text-align: center;
            font-size: 20px;
            color: #96f3f5;
            background: rgba(150, 243, 245, 0.1);
            border: 1px solid rgba(150, 243, 245, 0.3);
            border-radius: 20px;
            padding: 40px;
            margin: 20px 0;
        }
    `;
    document.head.appendChild(style);
    
    
    const overlay = document.createElement('div');
    overlay.id = 'period-timer-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(5px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        animation: fadeIn 0.4s ease-out;
    `;
    
    const container = document.createElement('div');
    container.className = 'period-container';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '✕';
    closeBtn.onclick = closeOverlay;
    
    function formatTime(hours, minutes) {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');
        return `${displayHours}:${displayMinutes} ${ampm}`;
    }
    
    function formatDuration(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
        if (minutes > 0) return `${minutes}m ${seconds}s`;
        return `${seconds}s`;
    }
    
    function getCurrentPeriod() {
        const now = window.periodTimerDebug.getCurrentTime();
        const day = window.periodTimerDebug.getCurrentDay();
        const schedule = schedules[day];
        
        if (!schedule) {
            return { current: null, next: null, isWeekend: true };
        }
        
        const currentTime = now.getHours() * 60 + now.getMinutes();
        let current = null;
        let next = null;
        
        for (const period of schedule) {
            const startTime = period.start[0] * 60 + period.start[1];
            const endTime = period.end[0] * 60 + period.end[1];
            
            if (currentTime >= startTime && currentTime < endTime) {
                current = {
                    ...period,
                    startTime: formatTime(...period.start),
                    endTime: formatTime(...period.end),
                    timeLeft: (endTime - currentTime) * 60 * 1000,
                    elapsed: (currentTime - startTime) * 60 * 1000
                };
                break;
            }
        }
        
        for (const period of schedule) {
            const startTime = period.start[0] * 60 + period.start[1];
            if (startTime > currentTime) {
                next = {
                    ...period,
                    startTime: formatTime(...period.start),
                    timeUntil: (startTime - currentTime) * 60 * 1000
                };
                break;
            }
        }
        
        return { current, next, isWeekend: false };
    }
    
    function getScheduleInfo() {
        const day = window.periodTimerDebug.getCurrentDay();
        if (day === 0 || day === 6) return 'Weekend - No School';
        if (day === 1 || day === 4) return 'Advisory';
        if (day === 2 || day === 3 || day === 5) return 'Normal';
        return 'Unknown Schedule';
    }
    
    function updateDisplay() {
        const now = window.periodTimerDebug.getCurrentTime();
        const { current, next, isWeekend } = getCurrentPeriod();
        
        const timeStr = now.toLocaleTimeString('en-US', { hour12: true });
        const dateStr = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
        
        let content = `
            <div class="header-section">
                <div class="title">School Period Timer</div>
                <div class="current-time">${timeStr}</div>
                <div class="schedule-type">${getScheduleInfo()}</div>
        `;
        
        if (window.periodTimerDebug.simulatedTime || window.periodTimerDebug.simulatedDay !== null) {
            content += `<div class="debug-notice">Debug Mode Active</div>`;
        }
        
        content += `</div>`;
        
        if (isWeekend) {
            content += `
                <div class="weekend-message">
                    Weekend - No School Today<br>
                    <span style="font-size: 16px; opacity: 0.8;">Enjoy your time off!</span>
                </div>
            `;
        } else {
            content += `<div class="status-section">`;
            
            if (current) {
                const isPassing = current.name.toLowerCase().includes('passing');
                const isLunch = current.name.toLowerCase().includes('lunch');
                const statusText = isPassing ? `${current.name} Period` : 
                                 isLunch ? `${current.name}` : 
                                 `${current.name}`;
                
                content += `
                    <div class="current-status">${statusText}</div>
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="card-title">Current Period</div>
                            <div class="info-row">
                                <span class="info-label">Started</span>
                                <span class="info-value">${current.startTime}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Ends</span>
                                <span class="info-value">${current.endTime}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Time Left</span>
                                <span class="info-value">${formatDuration(current.timeLeft)}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Elapsed</span>
                                <span class="info-value">${formatDuration(current.elapsed)}</span>
                            </div>
                        </div>
                `;
                
                if (next) {
                    content += `
                        <div class="info-card">
                            <div class="card-title">Next Period</div>
                            <div class="info-row">
                                <span class="info-label">Period</span>
                                <span class="info-value">${next.name}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Starts</span>
                                <span class="info-value">${next.startTime}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Time Until</span>
                                <span class="info-value">${formatDuration(next.timeUntil)}</span>
                            </div>
                        </div>
                    `;
                } else {
                    content += `
                        <div class="info-card">
                            <div class="card-title">School Status</div>
                            <div style="text-align: center; padding: 20px; color: #96f3f5;">
                                No more periods today!
                            </div>
                        </div>
                    `;
                }
            } else {
                content += `
                    <div class="current-status">No Current Period</div>
                    <div class="info-grid">
                `;
                
                if (next) {
                    content += `
                        <div class="info-card">
                            <div class="card-title">Next Period</div>
                            <div class="info-row">
                                <span class="info-label">Period</span>
                                <span class="info-value">${next.name}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Starts</span>
                                <span class="info-value">${next.startTime}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Time Until</span>
                                <span class="info-value">${formatDuration(next.timeUntil)}</span>
                            </div>
                        </div>
                        <div class="info-card">
                            <div class="card-title">School Status</div>
                            <div style="text-align: center; padding: 20px; color: #96f3f5;">
                                School hasn't started yet
                            </div>
                        </div>
                    `;
                } else {
                    content += `
                        <div class="info-card" style="grid-column: 1 / -1;">
                            <div class="card-title">School Status</div>
                            <div style="text-align: center; padding: 20px; color: #96f3f5;">
                                School is over for today!
                            </div>
                        </div>
                    `;
                }
            }
            
            content += `</div></div>`;
        }
        
        container.innerHTML = content;
        container.appendChild(closeBtn);
    }
    
    function closeOverlay() {
        overlay.style.animation = 'fadeIn 0.2s ease-out reverse';
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.remove();
            }
            if (style.parentNode) {
                style.remove();
            }
            if (updateInterval) {
                clearInterval(updateInterval);
            }
        }, 200);
    }
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeOverlay();
        }
    });
    
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeOverlay();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
    
    overlay.appendChild(container);
    document.body.appendChild(overlay);
    
    updateDisplay();
    const updateInterval = setInterval(updateDisplay, 1000);
    
    console.log('=== Period Timer Debug Commands ===');
    console.log('periodTimerDebug.setTime(hour, minute) - Set time (24hr format)');
    console.log('periodTimerDebug.setDay(0-6) - Set day (0=Sunday, 1=Monday, etc.)');
    console.log('periodTimerDebug.reset() - Reset to real time');
    console.log('Examples:');
    console.log('  periodTimerDebug.setTime(9, 30) // 9:30 AM');
    console.log('  periodTimerDebug.setDay(1) // Monday schedule');
    
})();