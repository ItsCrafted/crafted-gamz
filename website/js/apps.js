const games = [
    { id: 'apps/amazon.html', name: 'Amazon', png: 'amazon' },
    { id: 'apps/chatgpt.html', name: 'ChatGPT', png: 'chatgpt' },
    { id: 'apps/chess.html', name: 'Chess.com', png: 'chess' },
    { id: 'apps/coolmathgames.html', name: 'Cool Math Games', png: 'coolmathgames' },
    { id: 'apps/crazygames.html', name: 'Crazy Games', png: 'crazygames' },
    { id: 'apps/discord.html', name: 'Discord', png: 'discord' },
    { id: 'apps/duckai.html', name: 'Duck.ai', png: 'duckai' },
    { id: 'apps/espn.html', name: 'ESPN', png: 'espn' },
    { id: 'apps/geforcenow.html', name: 'GeForce Now', png: 'geforcenow' },
    { id: 'apps/github.html', name: 'GitHub', png: 'github' },
    { id: 'apps/google.html', name: 'Google', png: 'google' },
    { id: 'apps/gemini.html', name: 'Google Gemini', png: 'gemini' },
    { id: 'apps/netflix.html', name: 'Netflix', png: 'netflix' },
    { id: 'apps/nowgg.html', name: 'Now.gg', png: 'nowgg' },
    { id: 'apps/poki.html', name: 'Poki', png: 'poki' },
    { id: 'apps/reddit.html', name: 'Reddit', png: 'reddit' },
    { id: 'apps/roblox.html', name: 'Roblox', png: 'roblox' },
    { id: 'apps/snapchat.html', name: 'Snapchat', png: 'snapchat' },
    { id: 'apps/soundcloud.html', name: 'SoundCloud', png: 'soundcloud' },
    { id: 'apps/spotify.html', name: 'Spotify', png: 'spotify' },
    { id: 'apps/tiktok.html', name: 'TikTok', png: 'tiktok' },
    { id: 'apps/twitch.html', name: 'Twitch', png: 'twitch' },
    { id: 'apps/x.html', name: 'X (Or Twitter)', png: 'x' },
    { id: 'apps/youtube.html', name: 'YouTube', png: 'youtube' }
];

games.sort((a, b) => a.name.localeCompare(b.name));

function renderGames(gamesToRender) {
    const container = document.getElementById('games-container');
    const noResults = document.getElementById('no-results');
    
    container.innerHTML = '';
    
    if (gamesToRender.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    gamesToRender.forEach(game => {
        const gameBox = document.createElement('div');
        gameBox.className = 'game-box';
        gameBox.setAttribute('data-id', game.id);
        
        gameBox.innerHTML = `
    <div class="glass-filter"></div>
    <div class="glass-overlay"></div>
    <div class="glass-specular"></div>
    <div class="glass-content">
        <img src="images/app_icons/${game.png}.png" alt="${game.name}">
        <div class="game-info">
            <h3 class="game-title">${game.name}</h3>
        </div>
    </div>
`;

        gameBox.addEventListener('click', () => {
            window.location.href = game.id;
        });
        
        container.appendChild(gameBox);
    });
}

const searchInput = document.getElementById('game-search');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        renderGames(games);
        return;
    }
    
    const filteredGames = games.filter(game => {
        return game.name.toLowerCase().includes(searchTerm) ||
               game.id.toLowerCase().includes(searchTerm);
    });
    
    renderGames(filteredGames);
});

renderGames(games);

document.addEventListener('DOMContentLoaded', () => {
    const gamesGrid = document.querySelector('.games-grid');
    if (!gamesGrid) return;
    setTimeout(() => {
        const gameBoxes = gamesGrid.querySelectorAll('.game-box');
        if (gameBoxes.length === 0) return;

        let currentRowY = -1;
        let rowCount = 0;

        gameBoxes.forEach(box => {
            const rect = box.getBoundingClientRect();
            const boxY = rect.top;
            if (boxY > currentRowY + 5) {
                rowCount++;
                currentRowY = boxY; 
            }
            box.style.setProperty('--row-delay-multiplier', rowCount - 1);
        });
        
    }, 5);
});