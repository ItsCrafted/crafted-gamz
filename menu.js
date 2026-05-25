console.log('External more-script.js loaded and executing!');

(function() {
    'use strict';
    
    const existingOverlay = document.getElementById('more-menu-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    const overlay = document.createElement('div');
    overlay.id = 'more-menu-overlay';
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
        animation: fadeIn 0.3s ease-out;
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
    `;
    document.head.appendChild(style);
    
    const menu = document.createElement('div');
    menu.className = 'liquid-glass-menu';
    menu.style.cssText = `
        position: relative;
        height: auto;
        border-radius: 32px;
        overflow: hidden;
        padding: 30px 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        color: white;
        background: linear-gradient(145deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.008));
        border: 1px solid rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(40px) saturate(200%) contrast(130%) brightness(110%);
        -webkit-backdrop-filter: blur(40px) saturate(200%) contrast(130%) brightness(110%);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 0 0.5px rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.02);
        transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        user-select: none;
        animation: slideIn 0.3s ease-out;
    `;
    
    
    const glassOverlay = document.createElement('div');
    glassOverlay.style.cssText = `
        content: "";
        position: absolute;
        top: 0;
        left: -50%;
        width: 200%;
        height: 100%;
        background: radial-gradient(ellipse at 60% 40%, rgba(255, 255, 255, 0.08), transparent 60%);
        mix-blend-mode: soft-light;
        pointer-events: none;
        z-index: 1;
    `;
    menu.appendChild(glassOverlay);
    
    menu.innerHTML += `
    <div style="
        font-size: 24px;
        font-weight: bold;
        color: white;
        margin-bottom: 15px;
        text-align: center;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        position: relative;
        z-index: 2;
    ">Main Menu</div>
    
    <div style="
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
        padding: 0;
        margin: 0;
        position: relative;
        z-index: 2;
    ">
            <a href="main.html" class="nav-link" style="
                display: inline-flex;
                align-items: center;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                padding: 10px 16px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 220px;
                text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
            ">
                <i class="fas fa-house" style="color: white; margin-right: 10px; font-size: 14px; text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);"></i>
                Home
            </a>
            
            <a href="g.html" class="nav-link" style="
                display: inline-flex;
                align-items: center;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                padding: 10px 16px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 220px;
                text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
            ">
                <i class="fas fa-gamepad" style="color: white; margin-right: 10px; font-size: 14px; text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);"></i>
                Games
            </a>
            
            <a href="ai.html" class="nav-link" style="
                display: inline-flex;
                align-items: center;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                padding: 10px 16px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 220px;
                text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
            ">
                <i class="fas fa-robot" style="color: white; margin-right: 10px; font-size: 14px; text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);"></i>
                AI
            </a>

            <a href="vm.html" class="nav-link" style="
                display: inline-flex;
                align-items: center;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                padding: 10px 16px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 220px;
                text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
            ">
                <i class="fas fa-desktop" style="color: white; margin-right: 10px; font-size: 14px; text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);"></i>
                VM's
            </a>

                        <a href="projects.html" class="nav-link" style="
                display: inline-flex;
                align-items: center;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                padding: 10px 16px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 220px;
                text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
            ">
                <i class="fas fa-lightbulb" style="color: white; margin-right: 10px; font-size: 14px; text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);"></i>
                Projects
            </a>
            
            <div style="width: 100%; height: 1px; background: rgba(255,255,255,0.2); margin: 8px 0;"></div>
            
            <a href="control.html" class="nav-link" style="
                display: inline-flex;
                align-items: center;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                padding: 10px 16px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 220px;
                text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
            ">
                <i class="fas fa-sliders-h" style="color: white; margin-right: 10px; font-size: 14px; text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);"></i>
                Control Panel
            </a>
            
            <a href="transfer.html" class="nav-link" style="
                display: inline-flex;
                align-items: center;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                padding: 10px 16px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 220px;
                text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
            ">
                <i class="fas fa-share" style="color: white; margin-right: 10px; font-size: 14px; text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);"></i>
                Transfer
            </a>
            
            <a href="aboutus.html" class="nav-link" style="
                display: inline-flex;
                align-items: center;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                padding: 10px 16px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 220px;
                text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
            ">
                <i class="fas fa-users" style="color: white; margin-right: 10px; font-size: 14px; text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);"></i>
                About Us
            </a>
            
            <a href="aicalc.html" class="nav-link" style="
                display: inline-flex;
                align-items: center;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                padding: 10px 16px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 220px;
                text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
            ">
                <i class="fas fa-calculator" style="color: white; margin-right: 10px; font-size: 14px; text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);"></i>
                AI Calculator
            </a>
            
            <a href="elaassist.html" class="nav-link" style="
                display: inline-flex;
                align-items: center;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                padding: 10px 16px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 220px;
                text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
            ">
                <i class="fas fa-pen-nib" style="color: white; margin-right: 10px; font-size: 14px; text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);"></i>
                ELA Assistant
            </a>

            <a href="versions.html" class="nav-link" style="
                display: inline-flex;
                align-items: center;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                padding: 10px 16px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 220px;
                text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
            ">
                <i class="fas fa-history" style="color: white; margin-right: 10px; font-size: 14px; text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);"></i>
                Older Versions
            </a>
        </div>
        
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.2); position: relative; z-index: 2;">
            <button id="closeMoreMenu" style="
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: white;
                padding: 10px 20px;
                border-radius: 20px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 13px;
                font-family: inherit;
                text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
            ">
                <i class="fas fa-times" style="margin-right: 6px;"></i>
                Close
            </button>
        </div>
    `;
    
    const navLinks = menu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.color = 'white';
            link.style.background = 'rgba(255, 255, 255, 0.1)';
            link.style.border = '1px solid rgba(255, 255, 255, 0.3)';
            link.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.2)';
            link.style.backdropFilter = 'blur(10px)';
            link.style.transform = 'translateY(-2px) scale(1.02)';
            link.style.textShadow = '0 0 12px rgba(255, 255, 255, 0.4)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.color = 'white';
            link.style.background = 'transparent';
            link.style.border = '1px solid transparent';
            link.style.boxShadow = 'none';
            link.style.backdropFilter = 'none';
            link.style.transform = 'translateY(0) scale(1)';
            link.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.2)';
        });
    });
    
    const closeBtn = menu.querySelector('#closeMoreMenu');
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.15)';
        closeBtn.style.transform = 'translateY(-2px) scale(1.05)';
        closeBtn.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.25)';
        closeBtn.style.textShadow = '0 0 12px rgba(255, 255, 255, 0.4)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'transparent';
        closeBtn.style.transform = 'translateY(0) scale(1)';
        closeBtn.style.boxShadow = 'none';
        closeBtn.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.2)';
    });
    
    function closeMenu() {
        overlay.style.animation = 'fadeIn 0.2s ease-out reverse';
        setTimeout(() => {
            overlay.remove();
            style.remove();
        }, 200);
    }
    
    closeBtn.addEventListener('click', closeMenu);
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeMenu();
        }
    });
    
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeMenu();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
    
    overlay.appendChild(menu);
    document.body.appendChild(overlay);
    
})();