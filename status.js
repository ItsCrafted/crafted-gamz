const APP_ID = "crafted-gamz-v7";
const WORKER_URL = "https://admin-control.cgamz.online";

const CSS = `
  #__disabled-overlay {
    position: fixed;
    inset: 0;
    z-index: 2147483647;
    background-image: url('https://i.cgamz.site/images/minimal/24.png');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-user-select: none;
    user-select: none;
  }

  #__disabled-overlay::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(2px);
  }

  #__disabled-card {
    position: relative;
    z-index: 1;
    max-width: 480px;
    width: 90%;
    padding: 48px 40px;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(32px) saturate(180%);
    -webkit-backdrop-filter: blur(32px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 1.5px 0 rgba(255,255,255,0.18) inset,
      0 -1px 0 rgba(0,0,0,0.2) inset;
    text-align: center;
    animation: __card-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes __card-in {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  #__disabled-card .icon {
    font-size: 48px;
    margin-bottom: 20px;
    display: block;
    color: rgba(255, 120, 120, 0.95);
    filter: drop-shadow(0 0 12px rgba(255,100,100,0.7));
    animation: __pulse 2.4s ease-in-out infinite;
  }

  @keyframes __pulse {
    0%, 100% { filter: drop-shadow(0 0 10px rgba(255,100,100,0.6)); }
    50%       { filter: drop-shadow(0 0 22px rgba(255,100,100,1)); }
  }

  #__disabled-card h6 {
    margin: 0 0 10px;
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #ffffff !important;
    text-shadow: none !important;
  }

  #__disabled-card .subtitle {
    font-size: 1rem;
    color: #fff;
    margin: 0 0 28px;
    line-height: 1.5;
    text-shadow: none;
  }

  #__disabled-card .divider {
    width: 48px;
    height: 1.5px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    margin: 0 auto 28px;
    border-radius: 999px;
  }

  #__disabled-card .body {
    font-size: 0.9rem;
    color: #fff;
    line-height: 1.7;
    margin: 0 0 32px;
  }

  #__disabled-card .contact-box {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 14px;
    padding: 16px 20px;
  }

  #__disabled-card .contact-box p {
    margin: 0 0 6px;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #fff;
  }

  #__disabled-card .contact-box a {
    color: #fff;
    font-size: 0.95rem;
    font-weight: 500;
    text-decoration: none;
  }

  #__disabled-card .contact-box a:hover {
    text-decoration: underline;
  }

  #__disabled-card .contact-box .contact-icon {
    margin-right: 6px;
    color: #fff;
  }

  #__disabled-card .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 60, 60, 0.15);
    border: 1px solid rgba(255,80,80,0.35);
    border-radius: 999px;
    padding: 4px 14px;
    font-size: 0.75rem;
    font-weight: 600;
    color: #ff4444;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 22px;
    text-shadow: none;
  }

  #__disabled-card .status-pill i {
    animation: __blink 1.4s ease-in-out infinite;
    font-size: 0.6rem;
  }

  @keyframes __blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.15; }
  }
`;

function ensureFontAwesome() {
  const existing = document.querySelector('link[href*="fontawesome"]');
  if (existing) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
  document.head.appendChild(link);
}

function showOverlay() {
  if (document.getElementById('__disabled-overlay')) return;

  ensureFontAwesome();

  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.id = '__disabled-overlay';

  overlay.innerHTML = `
    <div id="__disabled-card">
      <i class="fa-solid fa-circle-exclamation icon"></i>
      <div class="status-pill">
        <i class="fa-solid fa-circle"></i>
        Project Offline
      </div>
      <h6>This app is currently disabled</h6>
      <p class="subtitle">Access has been restricted by the project owner.</p>
      <div class="divider"></div>
      <p class="body">
        This may be due to scheduled maintenance, a policy change, or a temporary suspension.
        The project may return in the future — check back later or reach out directly
        if you believe this is a mistake.
      </p>
      <div class="contact-box">
        <p><i class="fa-solid fa-headset"></i>&nbsp; Get in touch</p>
        <a href="mailto:crafted@craftedgamz.com">
          <i class="fa-solid fa-envelope contact-icon"></i>crafted@craftedgamz.com
        </a>
      </div>
    </div>
  `;

  overlay.addEventListener('click', e => e.stopPropagation());
  overlay.addEventListener('contextmenu', e => e.preventDefault());

  document.documentElement.style.overflow = 'hidden';
  document.body.style.pointerEvents = 'none';
  overlay.style.pointerEvents = 'all';

  document.body.appendChild(overlay);
}

function removeOverlay() {
  const overlay = document.getElementById('__disabled-overlay');
  if (!overlay) return;
  overlay.remove();
  document.documentElement.style.overflow = '';
  document.body.style.pointerEvents = '';
}

async function checkStatus() {
  try {
    const res = await fetch(WORKER_URL, { cache: 'no-store' });
    if (!res.ok) return;
    const list = await res.json();
    const entry = list.find(item => item.id === APP_ID);
    if (!entry || entry.enabled === false) showOverlay();
    else removeOverlay();
  } catch (e) {}
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkStatus);
} else {
  checkStatus();
}

setInterval(checkStatus, 3000);