const SEARCH_WORKER_URL = 'https://music-api.craftedgamz.workers.dev';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');
const resultsContainer = document.getElementById('resultsContainer');
const errorMsg = document.getElementById('errorMsg');
const player = document.getElementById('player');
const visualizer = document.getElementById('visualizer');
const canvasCtx = visualizer.getContext('2d');
const visualizerContainer = document.getElementById('visualizerContainer');
const embedContainer = document.getElementById('embedContainer');
const placeholderContainer = document.getElementById('placeholderContainer');

class NaturalVisualizer {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.barCount = 64;
    this.bars = [];
    this.animationId = null;
    this.time = 0;
    for (let i = 0; i < this.barCount; i++) {
      this.bars.push({
        height: 0.1,
        velocity: 0,
        baseFreq: 0.02 + (i / this.barCount) * 0.08,
        amplitude: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        smoothing: 0.15 + Math.random() * 0.1
      });
    }
  }
  
  draw() {
    this.animationId = requestAnimationFrame(() => this.draw());
    this.time += 1;
    
    const WIDTH = this.canvas.width;
    const HEIGHT = this.canvas.height;
    const barWidth = WIDTH / this.barCount;
    
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    for (let i = 0; i < this.barCount; i++) {
      const bar = this.bars[i];
      const wave1 = Math.sin(this.time * bar.baseFreq + bar.phase);
      const wave2 = Math.sin(this.time * bar.baseFreq * 1.5 + bar.phase * 1.3);
      const wave3 = Math.sin(this.time * bar.baseFreq * 0.7 + i * 0.1);
      const target = 0.15 + (wave1 * 0.4 + wave2 * 0.3 + wave3 * 0.2) * bar.amplitude;
      if (i > 0) {
        bar.height += (this.bars[i - 1].height - bar.height) * 0.05;
      }
      bar.velocity += (target - bar.height) * bar.smoothing;
      bar.velocity *= 0.85;
      bar.height += bar.velocity;
      bar.height = Math.max(0.05, Math.min(0.95, bar.height));
      
      const barHeight = HEIGHT * bar.height;
      const x = i * barWidth;
      const y = HEIGHT - barHeight;
      const gradient = this.ctx.createLinearGradient(x, y, x, HEIGHT);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.7)');
      
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(x, y, barWidth - 2, barHeight);
      if (bar.height > 0.5) {
        this.ctx.shadowBlur = 10 * (bar.height - 0.5);
        this.ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        this.ctx.fillRect(x, y, barWidth - 2, barHeight);
        this.ctx.shadowBlur = 0;
      }
    }
  }
  
  start() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.draw();
  }
  
  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

const visualizerInstance = new NaturalVisualizer(visualizer, canvasCtx);

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchBtn.click();
  }
});

searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  
  errorMsg.innerHTML = '';
  
  if (!query) {
    errorMsg.innerHTML = '<div class="error">Please enter a search query</div>';
    return;
  }
  
  searchBtn.disabled = true;
  searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  resultsDiv.innerHTML = '<div class="loading">🔍 Searching SoundCloud...</div>';
  resultsContainer.style.display = 'block';
  
  try {
    const response = await fetch(`${SEARCH_WORKER_URL}?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'soundcloud-search'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      resultsDiv.innerHTML = '<div class="no-results">No tracks found. Try different keywords.</div>';
      return;
    }
    
    resultsDiv.innerHTML = data.items.map(item => {
      const isSoundCloudTrack = item.link && item.link.includes('soundcloud.com/') && !item.link.includes('/sets/');
      
      return `
        <div class="track-card" onclick='${isSoundCloudTrack ? `playTrack("${item.link.replace(/'/g, "\\'")}")` : `window.open("${item.link}", "_blank")`}'>
          <div class="track-title">${item.title || 'Untitled'}</div>
          <div class="track-snippet">${item.snippet || ''}</div>
          <div class="track-url">${item.link}</div>
        </div>
      `;
    }).join('');
    
  } catch (error) {
    errorMsg.innerHTML = `<div class="error"><strong>Error:</strong> ${error.message}</div>`;
    resultsDiv.innerHTML = '';
  } finally {
    searchBtn.disabled = false;
    searchBtn.innerHTML = '<i class="fas fa-search"></i>';
  }
});

function playTrack(url) {
  player.src = '';
  visualizerInstance.stop();
  
  setTimeout(() => {
    player.src = `searcher.html?q=https%3A%2F%2Fw.soundcloud.com%2Fplayer%2F%3Furl%3D${encodeURIComponent(encodeURIComponent(url))}%26color%3D%2523ff6b6b%26auto_play%3Dtrue%26hide_related%3Dtrue%26show_comments%3Dfalse%26show_user%3Dtrue%26show_reposts%3Dfalse%26show_teaser%3Dfalse%26visual%3Dfalse&backend=ultraviolet&wisp=wss%3A%2F%2Fwisp.rhw.one%2F`;
    visualizerInstance.start();
    
    placeholderContainer.style.display = 'none';
    visualizerContainer.style.display = 'block';
    embedContainer.style.display = 'block';
  }, 100);
}