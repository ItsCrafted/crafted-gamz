console.log('External more-script.js loaded and executing!');

(function() {
    'use strict';
    
    
    function loadGameConfigs(callback) {
        
        if (window.gameConfigs && Object.keys(window.gameConfigs).length > 0) {
            console.log('gameConfigs already loaded from window');
            callback();
            return;
        }
        
        if (typeof gameConfigs !== 'undefined' && Object.keys(gameConfigs).length > 0) {
            console.log('gameConfigs already loaded as global');
            window.gameConfigs = gameConfigs;
            callback();
            return;
        }
        
        console.log('Loading gameConfigs.js...');
        const script = document.createElement('script');
        script.src = 'gameConfigs.js';
        script.onload = function() {
            console.log('gameConfigs.js loaded successfully');
            
            
            setTimeout(() => {
                if (typeof gameConfigs !== 'undefined') {
                    window.gameConfigs = gameConfigs;
                    console.log('gameConfigs assigned to window from global scope');
                    callback();
                } else if (window.gameConfigs && Object.keys(window.gameConfigs).length > 0) {
                    console.log('gameConfigs found in window');
                    callback();
                } else {
                    console.error('gameConfigs.js loaded but gameConfigs is not accessible');
                }
            }, 50);
        };
        script.onerror = function() {
            console.error('Failed to load gameConfigs.js');
        };
        document.head.appendChild(script);
    }
    
    
    loadGameConfigs(function() {
        initializeMenu();
    });
    
    function initializeMenu() {
        const gameData = window.gameConfigs || {};
        
        if (Object.keys(gameData).length === 0) {
            console.error('gameConfigs is empty!');
            return;
        }
        
        const existingOverlay = document.getElementById('more-menu-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        
        function getSavedGames() {
            try {
                const saved = JSON.parse(localStorage.getItem('savedGames') || '[]');
                return Array.isArray(saved) ? saved : [];
            } catch {
                return [];
            }
        }
        
        function launchGame(gameId) {
            localStorage.setItem('gameIds', JSON.stringify([gameId]));
            if (typeof window !== "undefined") {
                if (!window.gameStorage) window.gameStorage = {};
                window.gameStorage.selectedGame = gameId;
            }
            console.log('Launching game:', gameId);
            window.location.href = 'game.html';
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
            .saved-game-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 20px;
                border-radius: 25px;
                background: linear-gradient(145deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.008));
                border: 1px solid rgba(255, 255, 255, 0.08);
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 16px;
                transition: all 0.3s ease;
                cursor: pointer;
                min-width: 380px;
                margin: 6px 0;
                position: relative;
                overflow: hidden;
                backdrop-filter: blur(40px) saturate(200%) contrast(130%) brightness(110%);
                -webkit-backdrop-filter: blur(40px) saturate(200%) contrast(130%) brightness(110%);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 0 0.5px rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.02);
            }
            .saved-game-item::before {
                content: "";
                position: absolute;
                top: 0;
                left: -50%;
                width: 200%;
                height: 100%;
                background: radial-gradient(ellipse at 60% 40%, rgba(255, 255, 255, 0.08), transparent 60%);
                mix-blend-mode: soft-light;
                pointer-events: none;
                z-index: 0;
            }
            .saved-game-item:hover {
                transform: scale(1.03);
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35), inset 0 0 20px rgba(255, 255, 255, 0.04);
            }
            .game-info {
                display: flex;
                align-items: center;
                flex: 1;
                position: relative;
                z-index: 1;
            }
            .game-icon {
                color: white;
                margin-right: 16px;
                font-size: 18px;
                width: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .remove-game {
                color: #ff6b6b;
                font-size: 16px;
                margin-left: 12px;
                opacity: 0.6;
                transition: all 0.3s ease;
                padding: 8px;
                border-radius: 50%;
                background: rgba(255, 107, 107, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                width: 32px;
                height: 32px;
                position: relative;
                z-index: 1;
            }
            .remove-game:hover {
                opacity: 1;
                transform: scale(1.1) rotate(90deg);
                background: rgba(255, 107, 107, 0.2);
            }
            .no-saved-games {
                color: white;
                text-align: center;
                padding: 40px 30px;
                line-height: 1.6;
                font-size: 16px;
                background: linear-gradient(145deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.008));
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.08);
                position: relative;
                overflow: hidden;
                backdrop-filter: blur(40px) saturate(200%) contrast(130%) brightness(110%);
                -webkit-backdrop-filter: blur(40px) saturate(200%) contrast(130%) brightness(110%);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 0 0.5px rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.02);
            }
            .no-saved-games::before {
                content: "";
                position: absolute;
                top: 0;
                left: -50%;
                width: 200%;
                height: 100%;
                background: radial-gradient(ellipse at 60% 40%, rgba(255, 255, 255, 0.08), transparent 60%);
                mix-blend-mode: soft-light;
                pointer-events: none;
                z-index: 0;
            }
            .games-container {
                max-height: 70vh;
                overflow-y: auto;
                padding-right: 12px;
                margin-right: -12px;
                width: 100%;
                position: relative;
                z-index: 1;
            }
            .games-container::-webkit-scrollbar {
                width: 8px;
            }
            .games-container::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 4px;
            }
            .games-container::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.3);
                border-radius: 4px;
            }
            .games-container::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.5);
            }
        `;
        document.head.appendChild(style);
        
        const menu = document.createElement('div');
        menu.style.cssText = `
            position: relative;
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.008));
            border-radius: 32px;
            padding: 32px 40px;
            backdrop-filter: blur(40px) saturate(200%) contrast(130%) brightness(110%);
            -webkit-backdrop-filter: blur(40px) saturate(200%) contrast(130%) brightness(110%);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 0 0.5px rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.02);
            color: white;
            user-select: none;
            animation: slideIn 0.3s ease-out;
            display: flex;
            flex-direction: column;
            gap: 20px;
            align-items: center;
            min-width: 450px;
            max-width: 550px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            overflow: hidden;
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
            z-index: 0;
        `;
        menu.appendChild(glassOverlay);
        
        const savedGames = getSavedGames();
        
        let savedGamesHTML = '';
        if (savedGames.length > 0) {
            savedGamesHTML = `
                <div style="
                    font-size: 20px;
                    font-weight: bold;
                    color: white;
                    margin-bottom: 8px;
                    text-align: center;
                    position: relative;
                    z-index: 1;
                ">Saved Games</div>
                
                <div class="games-container">
            `;
            
            savedGames.forEach(gameId => {
                const game = gameData[gameId];
                if (game) {
                    savedGamesHTML += `
                        <div class="saved-game-item" data-game-id="${gameId}">
                            <div class="game-info">
                                <i class="${game.icon} game-icon"></i>
                                <span>${game.title}</span>
                            </div>
                            <i class="fas fa-times remove-game" data-remove-game="${gameId}"></i>
                        </div>
                    `;
                }
            });
            
            savedGamesHTML += `</div>`;
        } else {
            savedGamesHTML = `
                <div style="
                    font-size: 24px;
                    font-weight: bold;
                    color: white;
                    margin-bottom: 16px;
                    text-align: center;
                    position: relative;
                    z-index: 1;
                "><i class="fas fa-heart-broken"></i> No Saved Games</div>

                <div class="no-saved-games">
                    <span style="position: relative; z-index: 1;">
                        No saved games yet.<br>
                        Click the ♥ on any game to save it here for quick access!
                    </span>
                </div>
            `;
        }
        
        menu.innerHTML += `
            ${savedGamesHTML}
            
            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.2); position: relative; z-index: 1;">
                <button id="closeMoreMenu" style="
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 25px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 14px;
                    font-family: inherit;
                ">
                    <i class="fas fa-times" style="margin-right: 8px;"></i>
                    Close
                </button>
            </div>
        `;
        
        menu.querySelectorAll('.saved-game-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const gameId = item.getAttribute('data-game-id');
                if (gameId) {
                    console.log('Launching game:', gameId);
                    launchGame(gameId);
                }
            });
        });
        
        menu.querySelectorAll('.remove-game').forEach(removeBtn => {
            removeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const gameId = removeBtn.getAttribute('data-remove-game');
                if (gameId) {
                    const savedGames = getSavedGames();
                    const index = savedGames.indexOf(gameId);
                    if (index > -1) {
                        savedGames.splice(index, 1);
                        localStorage.setItem('savedGames', JSON.stringify(savedGames));
                        console.log('Removed game from saved:', gameId);
                        
                        const gameItem = removeBtn.closest('.saved-game-item');
                        gameItem.style.animation = 'fadeIn 0.2s ease-out reverse';
                        setTimeout(() => {
                            gameItem.remove();
                            
                            const remainingGames = menu.querySelectorAll('.saved-game-item');
                            if (remainingGames.length === 0) {
                                closeMenu();
                                setTimeout(() => {
                                    loadGameConfigs(initializeMenu);
                                }, 300);
                            }
                        }, 200);
                    }
                }
            });
        });
        
        const closeBtn = menu.querySelector('#closeMoreMenu');
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            closeBtn.style.transform = 'translateY(-2px) scale(1.05)';
            closeBtn.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.3)';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.background = 'transparent';
            closeBtn.style.transform = 'translateY(0) scale(1)';
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
    }
    
})();