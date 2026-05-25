console.log('Modern Clock Overlay loaded and executing!');

(function() {
    'use strict';
    
    
    window.clockDebug = {
        simulatedTime: null,
        setTime: function(hours, minutes, seconds = 0) {
            const now = new Date();
            this.simulatedTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
            console.log('Simulated time set to:', this.simulatedTime.toLocaleTimeString());
        },
        reset: function() {
            this.simulatedTime = null;
            console.log('Debug mode reset to real time');
        },
        getCurrentTime: function() {
            return this.simulatedTime || new Date();
        }
    };
    
    
    let cumulativeSecondAngle = 0;
    let cumulativeMinuteAngle = 0;
    let cumulativeHourAngle = 0;
    let lastSecond = -1;
    let lastMinute = -1;
    let lastHour = -1;
    
    
    const existingOverlay = document.getElementById('clock-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    
    const overlay = document.createElement('div');
    overlay.id = 'clock-overlay';
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
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .clock-container {
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
            min-width: 500px;
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
        .date-display {
            text-align: center;
            margin-bottom: 20px;
        }
        .day-of-week {
            font-size: 24px;
            font-weight: bold;
            color: #96f3f5;
            margin-bottom: 8px;
            letter-spacing: 2px;
        }
        .date-info {
            font-size: 18px;
            color: #96f3f5;
            font-weight: 400;
        }
        .analog-clock {
            width: 280px;
            height: 280px;
            border: 3px solid rgba(150, 243, 245, 0.3);
            border-radius: 50%;
            position: relative;
            background: radial-gradient(circle, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 100%);
            box-shadow: 
                inset 0 0 30px rgba(0, 0, 0, 0.5),
                0 0 20px rgba(150, 243, 245, 0.2);
        }
        .clock-center {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 16px;
            height: 16px;
            background: #96f3f5;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            box-shadow: 0 0 10px rgba(150, 243, 245, 0.5);
        }
        .clock-hand {
            position: absolute;
            bottom: 50%;
            left: 50%;
            transform-origin: bottom center;
            border-radius: 2px;
            box-shadow: none;
            transition: none;
        }
        .hour-hand {
            width: 6px;
            height: 60px;
            background: linear-gradient(to top, #96f3f5, #4bf9ed);
            margin-left: -3px;
            z-index: 3;
        }
        .minute-hand {
            width: 4px;
            height: 85px;
            background: linear-gradient(to top, #96f3f5, #4bf9ed);
            margin-left: -2px;
            z-index: 2;
        }
        .second-hand {
            width: 2px;
            height: 95px;
            background: #96f3f5;
            margin-left: -1px;
            z-index: 1;
            border-radius: 1px;
        }
        .clock-numbers {
            position: absolute;
            width: 100%;
            height: 100%;
        }
        .clock-number {
            position: absolute;
            font-size: 20px;
            font-weight: bold;
            color: #96f3f5;
            text-align: center;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .digital-time {
            font-size: 48px;
            font-weight: 200;
            color: #96f3f5;
            text-align: center;
            font-family: 'Courier New', monospace;
            letter-spacing: 2px;
            text-shadow: 0 0 20px rgba(150, 243, 245, 0.5);
            background: rgba(0, 0, 0, 0.8);
            padding: 20px 40px;
            border-radius: 15px;
            border: 1px solid rgba(150, 243, 245, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    
    const container = document.createElement('div');
    container.className = 'clock-container';
    
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '✕';
    closeBtn.onclick = closeOverlay;
    
    
    const dateDisplay = document.createElement('div');
    dateDisplay.className = 'date-display';
    
    
    const analogClock = document.createElement('div');
    analogClock.className = 'analog-clock';
    
    
    const clockNumbers = document.createElement('div');
    clockNumbers.className = 'clock-numbers';
    for (let i = 1; i <= 12; i++) {
        const number = document.createElement('div');
        number.className = 'clock-number';
        number.textContent = i;
        
        
        const angle = (i * 30 - 90) * (Math.PI / 180); 
        const radius = 115; 
        const centerX = 140; 
        const centerY = 140; 
        
        const x = Math.cos(angle) * radius + centerX;
        const y = Math.sin(angle) * radius + centerY;
        
        
        number.style.left = (x - 15) + 'px'; 
        number.style.top = (y - 15) + 'px'; 
        
        clockNumbers.appendChild(number);
    }
    analogClock.appendChild(clockNumbers);
    
    
    const hourHand = document.createElement('div');
    hourHand.className = 'clock-hand hour-hand';
    
    const minuteHand = document.createElement('div');
    minuteHand.className = 'clock-hand minute-hand';
    
    const secondHand = document.createElement('div');
    secondHand.className = 'clock-hand second-hand';
    
    const clockCenter = document.createElement('div');
    clockCenter.className = 'clock-center';
    
    analogClock.appendChild(hourHand);
    analogClock.appendChild(minuteHand);
    analogClock.appendChild(secondHand);
    analogClock.appendChild(clockCenter);
    
    
    const digitalTime = document.createElement('div');
    digitalTime.className = 'digital-time';
    
    
    container.appendChild(closeBtn);
    container.appendChild(dateDisplay);
    container.appendChild(analogClock);
    container.appendChild(digitalTime);
    
    
    function updateClock() {
        const now = window.clockDebug.getCurrentTime();
        
        
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        
        const dayOfWeek = dayNames[now.getDay()];
        const month = monthNames[now.getMonth()];
        const date = now.getDate();
        const year = now.getFullYear();
        
        dateDisplay.innerHTML = `
            <div class="day-of-week">${dayOfWeek}</div>
            <div class="date-info">${month} ${date}, ${year}</div>
        `;
        
        
        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();
        
        
        if (seconds !== lastSecond) {
            if (lastSecond !== -1 && seconds === 0 && lastSecond === 59) {
                
                cumulativeSecondAngle += 360;
            }
            lastSecond = seconds;
        }
        
        if (minutes !== lastMinute) {
            if (lastMinute !== -1 && minutes === 0 && lastMinute === 59) {
                
                cumulativeMinuteAngle += 360;
            }
            lastMinute = minutes;
        }
        
        if (hours !== lastHour) {
            if (lastHour !== -1 && hours === 0 && lastHour === 11) {
                
                cumulativeHourAngle += 360;
            }
            lastHour = hours;
        }
        
        
        const currentSecondAngle = (seconds * 6) + (milliseconds * 0.006);
        const currentMinuteAngle = (minutes * 6) + (seconds * 0.1) + (milliseconds * 0.0001667);
        const currentHourAngle = (hours * 30) + (minutes * 0.5) + (seconds * 0.00833) + (milliseconds * 0.0000139);
        
        
        const finalSecondAngle = cumulativeSecondAngle + currentSecondAngle;
        const finalMinuteAngle = cumulativeMinuteAngle + currentMinuteAngle;
        const finalHourAngle = cumulativeHourAngle + currentHourAngle;
        
        
        hourHand.style.transform = `rotate(${finalHourAngle}deg)`;
        minuteHand.style.transform = `rotate(${finalMinuteAngle}deg)`;
        secondHand.style.transform = `rotate(${finalSecondAngle}deg)`;
        
        
        let displayHours = now.getHours();
        const ampm = displayHours >= 12 ? 'PM' : 'AM';
        displayHours = displayHours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');
        const displaySeconds = seconds.toString().padStart(2, '0');
        
        digitalTime.textContent = `${displayHours}:${displayMinutes}:${displaySeconds} ${ampm}`;
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
    
    
    const initialTime = window.clockDebug.getCurrentTime();
    const initialSeconds = initialTime.getSeconds();
    const initialMinutes = initialTime.getMinutes();
    const initialHours = initialTime.getHours() % 12;
    const initialMilliseconds = initialTime.getMilliseconds();
    
    
    cumulativeSecondAngle = 0;
    cumulativeMinuteAngle = 0;
    cumulativeHourAngle = 0;
    
    lastSecond = initialSeconds;
    lastMinute = initialMinutes;
    lastHour = initialHours;
    
    
    updateClock();
    const updateInterval = setInterval(updateClock, 50); 
    
    
    overlay.appendChild(container);
    document.body.appendChild(overlay);
    
    
    console.log('Modern Clock Debug Commands:');
    console.log('clockDebug.setTime(hour, minute, second) - Set specific time (24hr format)');
    console.log('clockDebug.reset() - Reset to real time');
    console.log('Example: clockDebug.setTime(14, 30, 0) for 2:30 PM');
    
})();