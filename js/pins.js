const Pins = (() => {
  const LS_KEY = 'cg_pins'

  const DEFAULTS = [
    { url: 'https://google.com',   title: 'Google'  },
    { url: 'https://youtube.com',  title: 'YouTube' },
    { url: 'https://github.com',   title: 'GitHub'  },
    { url: 'https://reddit.com',   title: 'Reddit'  },
    { url: 'https://x.com',        title: 'X'       },
  ]

  function load() {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) return JSON.parse(raw)
    } catch {}
    return null
  }

  function save(list) {
    localStorage.setItem(LS_KEY, JSON.stringify(list))
    if (window.accountManager && typeof window.accountManager.schedulePinSync === 'function') {
      window.accountManager.schedulePinSync()
    }
  }

  function getAll() {
    const stored = load()
    if (stored) return stored
    save(DEFAULTS)
    return DEFAULTS
  }

  function add(pin) {
    const list = getAll().filter(p => p.url !== pin.url)
    list.push({ url: pin.url, title: pin.title })
    save(list)
  }

  function remove(url) {
    save(getAll().filter(p => p.url !== url))
  }

  function find(url) { return getAll().find(p => p.url === url) }

  function getFaviconUrl(url) {
    return `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(url)}`
  }

  function fetchAndCacheFavicon() { return Promise.resolve() }
  function seedFavicons() {}

  return { getAll, add, remove, find, getFaviconUrl, fetchAndCacheFavicon, seedFavicons, save, load, LS_KEY, DEFAULTS }
})()

function renderPins() {
  const container = document.querySelector('.shortcuts')
  if (!container) return

  container.innerHTML = ''

  Pins.getAll().forEach(pin => {
    const item = document.createElement('div')
    item.className = 'shortcut'
    item.dataset.nav = pin.url

    const iconWrap = document.createElement('div')
    iconWrap.className = 'icon'

    const img = document.createElement('img')
    img.src = Pins.getFaviconUrl(pin.url)
    img.alt = ''
    img.className = 'pin-favicon-img'
    img.onerror = () => {
      const letter = document.createElement('span')
      letter.className = 'pin-letter'
      letter.textContent = (pin.title || pin.url).charAt(0).toUpperCase()
      img.replaceWith(letter)
    }
    iconWrap.appendChild(img)

    const label = document.createElement('span')
    label.textContent = pin.title || new URL(pin.url).hostname.replace(/^www\./, '')

    const removeBtn = document.createElement('button')
    removeBtn.className = 'pin-remove-btn'
    removeBtn.title = 'Remove pin'
    removeBtn.setAttribute('aria-label', 'Remove pin')
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    removeBtn.addEventListener('click', e => {
      e.stopPropagation()
      Pins.remove(pin.url)
      renderPins()
      showPinToast('Pin removed')
    })

    item.appendChild(iconWrap)
    item.appendChild(label)
    item.appendChild(removeBtn)
    item.addEventListener('click', () => navigate(pin.url))
    container.appendChild(item)
  })

  const addBtn = document.createElement('div')
  addBtn.className = 'shortcut pin-add-btn'
  addBtn.title = 'Add pin'
  addBtn.setAttribute('aria-label', 'Add pin')
  addBtn.innerHTML = `
    <div class="icon"><i class="fa-solid fa-plus" style="color:rgba(255,255,255,0.55);font-size:18px"></i></div>
    <span>Add</span>
  `
  addBtn.addEventListener('click', showAddPinDialog)
  container.appendChild(addBtn)
}

function showPinToast(msg) {
  let toast = document.getElementById('bm-toast')
  if (!toast) {
    toast = document.createElement('div')
    toast.id = 'bm-toast'
    document.body.appendChild(toast)
  }
  toast.textContent = msg
  toast.classList.add('show')
  clearTimeout(toast._hideTimer)
  toast._hideTimer = setTimeout(() => toast.classList.remove('show'), 1800)
}

function showAddPinDialog() {
  if (document.getElementById('pin-add-dialog')) return

  const overlay = document.createElement('div')
  overlay.id = 'pin-add-dialog'
  overlay.innerHTML = `
    <div class="pin-dialog-box">
      <div class="pin-dialog-title">Add a pin</div>
      <input id="pin-add-url"   class="pin-dialog-input" type="text" placeholder="URL (e.g. https://example.com)" spellcheck="false" autocomplete="off">
      <input id="pin-add-label" class="pin-dialog-input" type="text" placeholder="Label (optional)" spellcheck="false" autocomplete="off">
      <div class="pin-dialog-actions">
        <button class="pin-dialog-btn pin-dialog-cancel">Cancel</button>
        <button class="pin-dialog-btn pin-dialog-save">Add pin</button>
      </div>
    </div>
  `
  document.body.appendChild(overlay)

  const urlInput   = overlay.querySelector('#pin-add-url')
  const labelInput = overlay.querySelector('#pin-add-label')
  const saveBtn    = overlay.querySelector('.pin-dialog-save')
  const cancelBtn  = overlay.querySelector('.pin-dialog-cancel')

  urlInput.focus()

  const doSave = () => {
    let url = urlInput.value.trim()
    if (!url) { urlInput.focus(); return }
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url
    let title = labelInput.value.trim()
    if (!title) {
      try { title = new URL(url).hostname.replace(/^www\./, '') } catch { title = url }
    }
    Pins.add({ url, title })
    renderPins()
    showPinToast('Pin added')
    overlay.remove()
  }

  saveBtn.addEventListener('click', doSave)
  cancelBtn.addEventListener('click', () => overlay.remove())
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove() })
  overlay.addEventListener('keydown', e => {
    if (e.key === 'Enter') doSave()
    if (e.key === 'Escape') overlay.remove()
  })
}