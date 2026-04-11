(function () {
    'use strict';

    const BRIGHTNESS_KEY  = 'cc_brightness';
    const NIGHTVISION_KEY = 'cc_toggle_nightvision';

    function getOverlay() {
        let el = document.getElementById('screen-brightness-overlay');
        if (!el) {
            el = document.createElement('div');
            el.id = 'screen-brightness-overlay';
            Object.assign(el.style, {
                position:      'fixed',
                top:           '0',
                left:          '0',
                width:         '100%',
                height:        '100%',
                pointerEvents: 'none',
                zIndex:        '999998',
                transition:    'background 0.25s ease, opacity 0.25s ease',
            });
            document.body.appendChild(el);
        }
        return el;
    }

    function getNightLayer() {
        let el = document.getElementById('screen-nightvision-overlay');
        if (!el) {
            el = document.createElement('div');
            el.id = 'screen-nightvision-overlay';
            Object.assign(el.style, {
                position:      'fixed',
                top:           '0',
                left:          '0',
                width:         '100%',
                height:        '100%',
                pointerEvents: 'none',
                zIndex:        '999997',
                background:    'rgba(255, 140, 0, 0)',
                transition:    'background 0.4s ease',
            });
            document.body.appendChild(el);
        }
        return el;
    }
    function applyBrightness(value) {
        const overlay  = getOverlay();
        const clamped  = Math.max(0, Math.min(100, parseInt(value, 10)));
        const opacity  = (1 - clamped / 100) * 0.85;
        overlay.style.background = `rgba(0,0,0,${opacity.toFixed(3)})`;
    }

    function applyNightVision(enabled) {
        const layer = getNightLayer();
        if (enabled) {
            layer.style.background = 'rgba(156, 75, 20, 0.66)';
            layer.style.mixBlendMode = 'multiply';
        } else {
            layer.style.background = 'rgba(255, 140, 0, 0)';
        }
    }

    window.ScreenController = {
        setBrightness(value) {
            localStorage.setItem(BRIGHTNESS_KEY, value);
            applyBrightness(value);
        },
        setNightVision(enabled) {
            localStorage.setItem(NIGHTVISION_KEY, enabled ? '1' : '0');
            applyNightVision(enabled);
        },
        getNightVision() {
            return localStorage.getItem(NIGHTVISION_KEY) === '1';
        },
        getBrightness() {
            return parseInt(localStorage.getItem(BRIGHTNESS_KEY) || '80', 10);
        },
        init() {
            applyBrightness(this.getBrightness());
            applyNightVision(this.getNightVision());
        }
    };

    window.ScreenController.init();

})();