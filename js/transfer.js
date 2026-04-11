(function () {
    'use strict';

    const existing = document.getElementById('transfer-overlay');
    if (existing) { existing.remove(); return; }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes tf-fade-in {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
        @keyframes tf-slide-in {
            from { opacity: 0; transform: translateY(-18px) scale(0.96); }
            to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes tf-fade-out {
            from { opacity: 1; }
            to   { opacity: 0; }
        }
        @keyframes tf-spin {
            to { transform: rotate(360deg); }
        }

        #transfer-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.35);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Lexend', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            animation: tf-fade-in 0.3s ease-out;
        }

        .tf-container {
            background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 28px;
            padding: 36px 40px 32px;
            width: 420px;
            max-width: calc(100vw - 40px);
            color: white;
            position: relative;
            overflow: hidden;
            animation: tf-slide-in 0.28s cubic-bezier(0.22,1,0.36,1);
            backdrop-filter: blur(40px) saturate(200%) brightness(1.08);
            -webkit-backdrop-filter: blur(40px) saturate(200%) brightness(1.08);
            box-shadow: 0 24px 60px rgba(0,0,0,0.55), inset 0 0 0.5px rgba(255,255,255,0.18);
        }
        .tf-container::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse at 60% 30%, rgba(255,255,255,0.07), transparent 65%);
            mix-blend-mode: soft-light;
            pointer-events: none;
        }

        .tf-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 28px;
            position: relative;
            z-index: 1;
        }
        .tf-title {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 20px;
            font-weight: 700;
            letter-spacing: -0.3px;
        }
        .tf-title i { font-size: 18px; opacity: 0.85; }
        .tf-back-btn {
            display: none;
            align-items: center;
            gap: 7px;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 20px;
            color: rgba(255,255,255,0.8);
            font-family: 'Lexend', sans-serif;
            font-size: 12px;
            font-weight: 600;
            padding: 6px 14px;
            cursor: pointer;
            transition: all 0.18s;
        }
        .tf-back-btn:hover { background: rgba(255,255,255,0.12); }
        .tf-back-btn i { font-size: 11px; }
        .tf-close-btn {
            width: 36px; height: 36px;
            border-radius: 50%;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.12);
            color: rgba(255,255,255,0.8);
            font-size: 14px;
            cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: all 0.18s;
            flex-shrink: 0;
        }
        .tf-close-btn:hover { background: rgba(255,255,255,0.14); }

        .tf-view { display: none; flex-direction: column; gap: 12px; position: relative; z-index: 1; }
        .tf-view.active { display: flex; }

        .tf-hub-tile {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px 18px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.09);
            border-radius: 16px;
            cursor: pointer;
            transition: all 0.18s;
            position: relative;
            overflow: hidden;
        }
        .tf-hub-tile:hover {
            background: rgba(255,255,255,0.1);
            border-color: rgba(255,255,255,0.16);
            transform: translateY(-1px);
        }
        .tf-hub-icon {
            width: 44px; height: 44px;
            border-radius: 12px;
            background: rgba(255,255,255,0.08);
            display: flex; align-items: center; justify-content: center;
            font-size: 18px;
            flex-shrink: 0;
        }
        .tf-hub-text h3 {
            font-size: 14px; font-weight: 600;
            color: rgba(255,255,255,0.92);
            margin: 0 0 3px;
        }
        .tf-hub-text p {
            font-size: 11.5px;
            color: rgba(255,255,255,0.42);
            margin: 0;
        }
        .tf-hub-tile .tf-chevron {
            margin-left: auto;
            color: rgba(255,255,255,0.22);
            font-size: 12px;
        }

        .tf-label {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.6px;
            text-transform: uppercase;
            color: rgba(255,255,255,0.38);
            margin-bottom: -4px;
        }
        .tf-input {
            width: 100%;
            padding: 11px 14px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.13);
            border-radius: 11px;
            color: white;
            font-family: 'Lexend', sans-serif;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            text-align: center;
            outline: none;
            transition: all 0.2s;
            box-sizing: border-box;
        }
        .tf-input:focus {
            background: rgba(255,255,255,0.09);
            border-color: rgba(255,255,255,0.28);
        }
        .tf-input::placeholder {
            color: rgba(255,255,255,0.28);
            text-transform: none;
            letter-spacing: normal;
            font-weight: 400;
        }
        .tf-file-input {
            width: 100%;
            padding: 10px 14px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.13);
            border-radius: 11px;
            color: rgba(255,255,255,0.8);
            font-family: 'Lexend', sans-serif;
            font-size: 13px;
            outline: none;
            box-sizing: border-box;
            cursor: pointer;
        }
        .tf-file-input::file-selector-button {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.18);
            color: white;
            font-family: 'Lexend', sans-serif;
            font-size: 12px;
            font-weight: 600;
            padding: 6px 14px;
            border-radius: 8px;
            cursor: pointer;
            margin-right: 10px;
            transition: all 0.18s;
        }
        .tf-file-input::file-selector-button:hover {
            background: rgba(255,255,255,0.16);
        }

        .tf-btn {
            padding: 12px 20px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 12px;
            color: white;
            font-family: 'Lexend', sans-serif;
            font-size: 13.5px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.18s;
            display: flex; align-items: center; justify-content: center; gap: 8px;
            width: 100%;
        }
        .tf-btn:hover:not(:disabled) {
            background: rgba(255,255,255,0.16);
            border-color: rgba(255,255,255,0.28);
            transform: translateY(-1px);
        }
        .tf-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .tf-btn.danger {
            background: rgba(220,53,69,0.18);
            border-color: rgba(220,53,69,0.32);
            color: #ff6b7a;
        }
        .tf-btn.danger:hover:not(:disabled) {
            background: rgba(220,53,69,0.28);
        }

        .tf-status {
            font-size: 13px;
            font-weight: 500;
            text-align: center;
            min-height: 18px;
            padding: 0 4px;
            line-height: 1.5;
        }
        .tf-status.success { color: #4ade80; }
        .tf-status.error   { color: #f87171; }

        .tf-note {
            font-size: 11px;
            color: rgba(255,255,255,0.35);
            text-align: center;
            line-height: 1.5;
        }
        .tf-note.warn { color: rgba(248,113,113,0.75); }

        .tf-spinner {
            width: 14px; height: 14px;
            border: 2px solid rgba(255,255,255,0.25);
            border-top-color: white;
            border-radius: 50%;
            animation: tf-spin 0.7s linear infinite;
            flex-shrink: 0;
        }

        .tf-file-info {
            font-size: 11.5px;
            color: rgba(255,255,255,0.45);
            text-align: center;
        }
    `;
    document.head.appendChild(style);

    const GAS_URL = 'https://script.google.com/macros/s/AKfycbwJ1UXCzi6tyuChL6F1A8ifAX6phPSNV-yae8Wi7oR0vieA3bUUfZGRnOIgtnrnGcQ/exec';

    function formatSize(bytes) {
        if (!bytes) return '0 B';
        const u = ['B','KB','MB','GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + u[i];
    }

    function el(tag, cls, html) {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        if (html !== undefined) e.innerHTML = html;
        return e;
    }

    function closeOverlay() {
        overlay.style.animation = 'tf-fade-out 0.2s ease-out forwards';
        overlay.addEventListener('animationend', () => {
            overlay.remove();
            style.remove();
        }, { once: true });
    }

    const overlay = document.createElement('div');
    overlay.id = 'transfer-overlay';

    const container = document.createElement('div');
    container.className = 'tf-container';

    const header = el('div', 'tf-header');
    const titleEl = el('div', 'tf-title', '<i class="fa-solid fa-arrow-right-arrow-left"></i>Transfer');
    const backBtn = el('button', 'tf-back-btn', '<i class="fa-solid fa-chevron-left"></i>Back');
    const closeBtn = el('button', 'tf-close-btn', '<i class="fa-solid fa-xmark"></i>');
    closeBtn.onclick = closeOverlay;
    header.appendChild(titleEl);
    header.appendChild(backBtn);
    header.appendChild(closeBtn);
    container.appendChild(header);
    const hubView = el('div', 'tf-view active');

    function hubTile(faIcon, title, desc, onClick) {
        const t = el('div', 'tf-hub-tile');
        t.innerHTML = `
            <div class="tf-hub-icon"><i class="${faIcon}"></i></div>
            <div class="tf-hub-text"><h3>${title}</h3><p>${desc}</p></div>
            <i class="fa-solid fa-chevron-right tf-chevron"></i>`;
        t.onclick = onClick;
        return t;
    }

    hubView.appendChild(hubTile('fa-solid fa-upload',   'Upload',   'Share a file and get a 3-char key', () => switchView('upload')));
    hubView.appendChild(hubTile('fa-solid fa-download',  'Download', 'Enter your key to retrieve a file',  () => switchView('download')));
    hubView.appendChild(hubTile('fa-solid fa-trash',     'Remove',   'Permanently delete a file by key',   () => switchView('remove')));
    container.appendChild(hubView);
    const uploadView = el('div', 'tf-view');

    const fileInput = el('input');
    fileInput.type = 'file';
    fileInput.className = 'tf-file-input';

    const fileInfo  = el('div', 'tf-file-info');
    const uploadBtn = el('button', 'tf-btn', '<i class="fa-solid fa-upload"></i><span>Upload</span>');
    const uploadStatus = el('div', 'tf-status');
    const copyBtn   = el('button', 'tf-btn');
    copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i><span>Copy Key</span>';
    copyBtn.style.display = 'none';

    let lastKey = '';

    fileInput.onchange = () => {
        const f = fileInput.files[0];
        fileInfo.textContent = f ? `${f.name}  (${formatSize(f.size)})` : '';
        uploadStatus.textContent = '';
        uploadStatus.className = 'tf-status';
        copyBtn.style.display = 'none';
    };

    uploadBtn.onclick = async () => {
        const file = fileInput.files[0];
        if (!file) { setStatus(uploadStatus, 'Please choose a file first.', 'error'); return; }
        if (file.size > 5 * 1024 * 1024 * 1024) { setStatus(uploadStatus, 'File exceeds the 5 GB limit.', 'error'); return; }

        uploadBtn.disabled = true;
        setStatus(uploadStatus, '', '');
        uploadBtn.innerHTML = '<div class="tf-spinner"></div><span>Uploading…</span>';
        copyBtn.style.display = 'none';

        const reader = new FileReader();
        reader.onload = async () => {
            const base64 = reader.result.split(',')[1];
            try {
                const res = await fetch(GAS_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `filedata=${encodeURIComponent(base64)}&mimeType=${encodeURIComponent(file.type)}&filename=${encodeURIComponent(file.name)}`
                });
                if (!res.ok) throw new Error('Upload failed');
                lastKey = await res.text();
                setStatus(uploadStatus, `Upload complete! Key: <b style="letter-spacing:2px">${lastKey.toUpperCase()}</b>`, 'success');
                copyBtn.style.display = 'flex';
            } catch (e) {
                setStatus(uploadStatus, 'Upload failed. Please try again.', 'error');
            } finally {
                uploadBtn.disabled = false;
                uploadBtn.innerHTML = '<i class="fa-solid fa-upload"></i><span>Upload</span>';
            }
        };
        reader.readAsDataURL(file);
    };

    copyBtn.onclick = () => {
        if (!lastKey) return;
        navigator.clipboard.writeText(lastKey).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = lastKey; document.body.appendChild(ta); ta.select();
            document.execCommand('copy'); document.body.removeChild(ta);
        });
        const span = copyBtn.querySelector('span');
        span.textContent = 'Copied!';
        setTimeout(() => { span.textContent = 'Copy Key'; }, 1500);
    };

    uploadView.appendChild(el('div', 'tf-label', 'Select a file'));
    uploadView.appendChild(fileInput);
    uploadView.appendChild(fileInfo);
    uploadView.appendChild(uploadBtn);
    uploadView.appendChild(uploadStatus);
    uploadView.appendChild(copyBtn);
    uploadView.appendChild(el('div', 'tf-note', 'Files are stored for 31 days &nbsp;·&nbsp; Max 5 GB'));
    container.appendChild(uploadView);
    const downloadView = el('div', 'tf-view');

    const dlInput  = el('input', 'tf-input');
    dlInput.maxLength = 3;
    dlInput.placeholder = 'Enter 3-character key';

    const dlBtn    = el('button', 'tf-btn', '<i class="fa-solid fa-download"></i><span>Download</span>');
    const dlStatus = el('div', 'tf-status');

    dlInput.onkeydown = e => { if (e.key === 'Enter') dlBtn.click(); };

    dlBtn.onclick = () => {
        const key = dlInput.value.trim().toLowerCase();
        if (!key)        { setStatus(dlStatus, 'Please enter a key.', 'error'); return; }
        if (key.length !== 3) { setStatus(dlStatus, 'Key must be exactly 3 characters.', 'error'); return; }

        dlBtn.disabled = true;
        dlBtn.innerHTML = '<div class="tf-spinner"></div><span>Opening…</span>';
        setStatus(dlStatus, 'Opening download…', '');

        const url = `${GAS_URL}?id=${encodeURIComponent(key)}`;
        const win = window.open(url, '_blank');
        if (!win || win.closed || typeof win.closed === 'undefined') {
            setStatus(dlStatus, 'Popup blocked — please allow popups and try again.', 'error');
        } else {
            setStatus(dlStatus, 'Download opened in a new tab.', 'success');
        }

        setTimeout(() => {
            dlBtn.disabled = false;
            dlBtn.innerHTML = '<i class="fa-solid fa-download"></i><span>Download</span>';
        }, 2000);
    };

    downloadView.appendChild(el('div', 'tf-label', 'Download key'));
    downloadView.appendChild(dlInput);
    downloadView.appendChild(dlBtn);
    downloadView.appendChild(dlStatus);
    downloadView.appendChild(el('div', 'tf-note', 'Keys expire after 31 days'));
    container.appendChild(downloadView);

    const removeView = el('div', 'tf-view');

    const rmInput  = el('input', 'tf-input');
    rmInput.maxLength = 3;
    rmInput.placeholder = 'Enter 3-character key';

    const rmBtn    = el('button', 'tf-btn danger', '<i class="fa-solid fa-trash"></i><span>Remove File</span>');
    const rmStatus = el('div', 'tf-status');

    rmInput.onkeydown = e => { if (e.key === 'Enter') rmBtn.click(); };

    rmBtn.onclick = async () => {
        const key = rmInput.value.trim().toLowerCase();
        if (!key)             { setStatus(rmStatus, 'Please enter a key.', 'error'); return; }
        if (key.length !== 3) { setStatus(rmStatus, 'Key must be exactly 3 characters.', 'error'); return; }
        if (!confirm(`Permanently delete the file with key "${key.toUpperCase()}"?\n\nThis cannot be undone.`)) return;

        rmBtn.disabled = true;
        rmBtn.innerHTML = '<div class="tf-spinner"></div><span>Removing…</span>';
        setStatus(rmStatus, 'Removing file…', '');

        try {
            const res  = await fetch(`${GAS_URL}?action=delete&id=${encodeURIComponent(key)}`);
            const text = await res.text();
            if (text.includes('successfully')) {
                setStatus(rmStatus, 'File removed successfully.', 'success');
                rmInput.value = '';
            } else if (text.includes('No file found')) {
                setStatus(rmStatus, 'No file found with that key.', 'error');
            } else {
                setStatus(rmStatus, text || 'Remove failed. Please try again.', 'error');
            }
        } catch (e) {
            setStatus(rmStatus, 'Error removing file. Please try again.', 'error');
        } finally {
            rmBtn.disabled = false;
            rmBtn.innerHTML = '<i class="fa-solid fa-trash"></i><span>Remove File</span>';
        }
    };

    removeView.appendChild(el('div', 'tf-note warn', '<i class="fa-solid fa-triangle-exclamation"></i>  This action cannot be undone'));
    removeView.appendChild(el('div', 'tf-label', 'File key'));
    removeView.appendChild(rmInput);
    removeView.appendChild(rmBtn);
    removeView.appendChild(rmStatus);
    removeView.appendChild(el('div', 'tf-note', 'Files are automatically deleted after 31 days'));
    container.appendChild(removeView);

    function setStatus(el, html, type) {
        el.innerHTML = html;
        el.className = 'tf-status' + (type ? ' ' + type : '');
    }

    const views = { hub: hubView, upload: uploadView, download: downloadView, remove: removeView };
    const viewTitles = {
        hub:      '<i class="fa-solid fa-arrow-right-arrow-left"></i>Transfer',
        upload:   '<i class="fa-solid fa-upload"></i>Upload',
        download: '<i class="fa-solid fa-download"></i>Download',
        remove:   '<i class="fa-solid fa-trash"></i>Remove',
    };

    function switchView(name) {
        Object.values(views).forEach(v => v.classList.remove('active'));
        views[name].classList.add('active');
        titleEl.innerHTML = viewTitles[name];

        const isHub = name === 'hub';
        backBtn.style.display = isHub ? 'none' : 'flex';

        setTimeout(() => {
            if (name === 'download') dlInput.focus();
            if (name === 'remove')   rmInput.focus();
        }, 50);

        [uploadStatus, dlStatus, rmStatus].forEach(s => {
            s.textContent = ''; s.className = 'tf-status';
        });
    }

    backBtn.onclick = () => switchView('hub');

    overlay.appendChild(container);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
    document.addEventListener('keydown', function esc(e) {
        if (e.key === 'Escape') { closeOverlay(); document.removeEventListener('keydown', esc); }
    });

})();