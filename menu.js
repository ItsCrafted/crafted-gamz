

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
    menu.style.cssText = `
        background: rgba(0, 0, 0, 0.65);
        border-radius: 30px;
        padding: 20px 30px;
        box-shadow:
  0 0 10px rgba(150, 243, 245, 0.6),
  0 0 20px rgba(150, 243, 245, 0.4),
  0 0 30px rgba(150, 243, 245, 0.2),
  0 0 40px rgba(150, 243, 245, 0.1),
  0 0 15px rgba(0, 0, 0, 0.3); /* base shadow for depth */

        backdrop-filter: blur(10px);
        color: white;
        user-select: none;
        animation: slideIn 0.3s ease-out;
        display: flex;
        flex-direction: column;
        gap: 12px;
        align-items: center;
    `;
    
    
    menu.innerHTML = `
    <div style="
        font-size: 20px;
        font-weight: bold;
        color: #96f3f5;
        margin-bottom: 15px;
        text-align: center;
    ">Main Menu</div>
    
    <div style="
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
        padding: 0;
        margin: 0;
    ">

            <a href="main.html" class="nav-link" style="
                display: inline-flex;
                align-items: center;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                padding: 8px 12px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 200px;
            ">
                <i class="fas fa-house" style="color: #96f3f5; margin-right: 8px; font-size: 14px;"></i>
                Home
            </a>
            
            <a href="search.html" class="nav-link" style="
                display: inline-flex;
                align-items: center;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                padding: 8px 12px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 200px;
            ">
                <i class="fas fa-magnifying-glass" style="color: #96f3f5; margin-right: 8px; font-size: 14px;"></i>
                Search
            </a>
            
            <a href="games.html" class="nav-link" style="
                display: inline-flex;
                align-items: center;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                padding: 8px 12px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 200px;
            ">
                <i class="fas fa-gamepad" style="color: #96f3f5; margin-right: 8px; font-size: 14px;"></i>
                Games
            </a>
            
            <a href="apps.html" class="nav-link" style="
                display: inline-flex;
                align-items: center;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                padding: 8px 12px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 200px;
            ">
                <i class="fas fa-th-large" style="color: #96f3f5; margin-right: 8px; font-size: 14px;"></i>
                Apps
            </a>

            <a href="movies.html" class="nav-link" style="
                display: inline-flex;
                align-items: center;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                padding: 8px 12px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 200px;
            ">
                <i class="fas fa-film" style="color: #96f3f5; margin-right: 8px; font-size: 14px;"></i>
                Movies
            </a>
            
            <a href="ai.html" class="nav-link" style="
                display: inline-flex;
                align-items: center;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                padding: 8px 12px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 200px;
            ">
                <i class="fas fa-robot" style="color: #96f3f5; margin-right: 8px; font-size: 14px;"></i>
                AI
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
                padding: 8px 12px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 200px;
            ">
                <i class="fas fa-sliders-h" style="color: #96f3f5; margin-right: 8px; font-size: 14px;"></i>
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
                padding: 8px 12px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 200px;
            ">
                <i class="fas fa-share" style="color: #96f3f5; margin-right: 8px; font-size: 14px;"></i>
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
                padding: 8px 12px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 200px;
            ">
                <i class="fas fa-users" style="color: #96f3f5; margin-right: 8px; font-size: 14px;"></i>
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
                padding: 8px 12px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 200px;
            ">
                <i class="fas fa-calculator" style="color: #96f3f5; margin-right: 8px; font-size: 14px;"></i>
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
                padding: 8px 12px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 200px;
            ">
                <i class="fas fa-pen-nib" style="color: #96f3f5; margin-right: 8px; font-size: 14px;"></i>
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
                padding: 8px 12px;
                white-space: nowrap;
                border-radius: 20px;
                background: transparent;
                border: 1px solid transparent;
                min-width: 200px;
            ">
                <i class="fas fa-history" style="color: #96f3f5; margin-right: 8px; font-size: 14px;"></i>
                Older Versions
            </a>
        </div>
        
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
            <button id="closeMoreMenu" style="
                background: transparent;
                border: 1px solid rgba(150, 243, 245, 0.3);
                color: #96f3f5;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 12px;
                font-family: inherit;
            ">
                <i class="fas fa-times" style="margin-right: 6px;"></i>
                Close
            </button>
        </div>
    `;
    
    
    const navLinks = menu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.color = '#96f3f5';
            link.style.background = 'rgba(0, 0, 0, 0.4)';
            link.style.border = '1px solid rgba(150, 243, 245, 0.3)';
            link.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            link.style.backdropFilter = 'blur(5px)';
            link.style.transform = 'translateY(-1px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.color = 'white';
            link.style.background = 'transparent';
            link.style.border = '1px solid transparent';
            link.style.boxShadow = 'none';
            link.style.backdropFilter = 'none';
            link.style.transform = 'translateY(0)';
        });
    });
    
    
    const closeBtn = menu.querySelector('#closeMoreMenu');
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(0, 0, 0, 0.4)';
        closeBtn.style.transform = 'translateY(-1px)';
        closeBtn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'transparent';
        closeBtn.style.transform = 'translateY(0)';
        closeBtn.style.boxShadow = 'none';
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