(() => {
  const pill = document.getElementById('music-pill')
  if (!pill) return

  const MUSIC_API_BASE = (window.MUSIC_API_BASE || 'https://server.cgamz.online').replace(/\/+$/, '')
  const MUSIC_WS_URL = window.MUSIC_WS_URL || MUSIC_API_BASE.replace(/^http/, 'ws') + '/ws'
  const LRCLIB_API = 'https://lrclib.net/api'

  const state = {
    ws: null,
    wsReady: false,
    wsConnected: false,
    wsRequestId: 0,
    pendingWs: new Map(),
    audio: new Audio(),
    shaka: null,
    shakaPlayer: null,
    hls: null,
    currentTrack: null,
    currentPlayback: null,
    queue: [],
    currentIndex: -1,
    playing: false,
    panelOpen: false,
    view: 'player',
    searchDebounce: null,
    searchSeq: 0,
    searchResults: [],
    currentQuery: '',
    busy: false,
    externalReady: false,
    currentLyrics: null,
    lyricsLines: [],
    dockRotation: 0,
    expandedRotation: 0,
    rotationInterval: null,
    lastRotationUpdate: 0
  }

  state.audio.preload = 'none'
  state.audio.crossOrigin = 'anonymous'
  state.audio.volume = 0.85

  const dom = {}
  const addressBarWrap = document.querySelector('.address-bar-wrap')
  const urlInput = document.getElementById('url-input')

  function isMinimized() {
    return !state.playing && !state.panelOpen
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = Array.from(document.querySelectorAll('script[data-music-src]')).find((node) => node.dataset.musicSrc === src)
      if (existing) {
        if (existing.dataset.loaded === '1') {
          resolve(existing)
          return
        }
        existing.addEventListener('load', () => resolve(existing), { once: true })
        existing.addEventListener('error', reject, { once: true })
        return
      }

      const script = document.createElement('script')
      script.src = src
      script.async = true
      script.dataset.musicSrc = src
      script.addEventListener('load', () => {
        script.dataset.loaded = '1'
        resolve(script)
      }, { once: true })
      script.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true })
      document.head.appendChild(script)
    })
  }

  async function ensureShaka() {
    if (state.shaka) return state.shaka
    await loadScript('https://cdn.jsdelivr.net/npm/shaka-player@5.0.7/dist/shaka-player.compiled.js')
    if (!window.shaka) throw new Error('Shaka Player failed to initialize')
    window.shaka.polyfill.installAll()
    state.shaka = window.shaka
    return state.shaka
  }

  async function ensureHls() {
    if (window.Hls) return window.Hls
    await loadScript('https://cdn.jsdelivr.net/npm/hls.js@1.6.15/dist/hls.min.js')
    if (!window.Hls) throw new Error('Hls.js failed to initialize')
    return window.Hls
  }

  function apiUrl(path) {
    return `${MUSIC_API_BASE}${path}`
  }

  function wsSend(payload) {
    if (!state.ws || state.ws.readyState !== 1) return false
    state.ws.send(JSON.stringify(payload))
    return true
  }

  function wsRequest(type, payload = {}, timeoutMs = 12000) {
    return new Promise((resolve, reject) => {
      if (!state.ws || state.ws.readyState !== 1) {
        reject(new Error('WebSocket not connected'))
        return
      }

      const requestId = ++state.wsRequestId
      const timer = window.setTimeout(() => {
        state.pendingWs.delete(requestId)
        reject(new Error(`${type} timed out`))
      }, timeoutMs)

      state.pendingWs.set(requestId, {
        resolve: (message) => {
          window.clearTimeout(timer)
          resolve(message)
        },
        reject: (error) => {
          window.clearTimeout(timer)
          reject(error)
        },
        type,
      })

      state.ws.send(JSON.stringify({ type, requestId, ...payload }))
    })
  }

  async function httpJson(path, options = {}) {
    const res = await fetch(apiUrl(path), {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(text || `HTTP ${res.status}`)
    }
    return res.json()
  }

  function setBusy(busy, text = '') {
    state.busy = busy
    if (dom.status) {
      dom.status.textContent = text
    }
  }

  function getTrackTitle(track) {
    return track?.title || track?.name || track?.trackTitle || 'Untitled'
  }

  function getArtistText(track) {
    if (!track) return 'Unknown Artist'
    if (track.artistText) return track.artistText
    if (typeof track.artist === 'string') return track.artist
    if (track.artist?.name) return track.artist.name
    if (Array.isArray(track.artists)) {
      return track.artists
        .map((artist) => (typeof artist === 'string' ? artist : artist?.name))
        .filter(Boolean)
        .join(', ') || 'Unknown Artist'
    }
    return 'Unknown Artist'
  }

  function getSubtitle(track) {
    const artist = getArtistText(track)
    const album = track?.album?.title || track?.albumTitle || ''
    return album ? `${artist} · ${album}` : artist
  }

  function setArtwork(url) {
    const hasArt = !!url
    if (dom.artwork) {
      dom.artwork.src = url || ''
      dom.artwork.hidden = !hasArt
    }
    if (dom.placeholder) {
      dom.placeholder.hidden = hasArt
    }
    if (dom.heroArtwork) {
      dom.heroArtwork.src = url || ''
      dom.heroArtwork.hidden = !hasArt
    }
    if (dom.heroPlaceholder) {
      dom.heroPlaceholder.hidden = hasArt
    }
  }

  async function fetchLyrics(track) {
    if (!track) return null
    try {
      const title = getTrackTitle(track)
      const artist = getArtistText(track)
      const duration = Math.round(state.audio.duration || 0)
      
      const res = await fetch(`${LRCLIB_API}/get?artist_name=${encodeURIComponent(artist)}&track_name=${encodeURIComponent(title)}&duration=${duration}`)
      if (!res.ok) return null
      
      const data = await res.json()
      if (data.syncedLyrics) {
        state.currentLyrics = data.syncedLyrics
        parseLyrics(data.syncedLyrics)
        return data.syncedLyrics
      } else if (data.plainLyrics) {
        state.currentLyrics = data.plainLyrics
        return data.plainLyrics
      }
    } catch (error) {
      console.warn('Failed to fetch lyrics:', error)
    }
    return null
  }

  function parseLyrics(syncedLyrics) {
    state.lyricsLines = []
    if (!syncedLyrics) return
    
    const lines = syncedLyrics.split('\n')
    for (const line of lines) {
      const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/)
      if (match) {
        const minutes = parseInt(match[1], 10)
        const seconds = parseInt(match[2], 10)
        const centiseconds = parseInt(match[3], 10)
        const time = minutes * 60 + seconds + centiseconds / 100
        const text = match[4].trim()
        state.lyricsLines.push({ time, text })
      }
    }
  }

  function updateLyricsDisplay() {
    if (!dom.lyrics || !state.audio.duration) return

    const hasLyrics = state.lyricsLines.length > 0
    dom.lyrics.classList.toggle('has-lines', hasLyrics)

    if (!hasLyrics) {
      updateUrlBarLyrics('', '', '')
      return
    }

    const currentTime = state.audio.currentTime
    let currentIndex = -1

    for (let i = 0; i < state.lyricsLines.length; i++) {
      if (state.lyricsLines[i].time <= currentTime) {
        currentIndex = i
      } else {
        break
      }
    }

    const currentLine = currentIndex >= 0 ? state.lyricsLines[currentIndex].text : '♪'
    const nextLine = currentIndex + 1 < state.lyricsLines.length ? state.lyricsLines[currentIndex + 1].text : ''
    const prevLine = currentIndex - 1 >= 0 ? state.lyricsLines[currentIndex - 1].text : ''

    if (dom.currentLyric.textContent !== currentLine) {
      dom.currentLyric.textContent = currentLine
      dom.currentLyric.classList.remove('is-new')
      void dom.currentLyric.offsetWidth
      dom.currentLyric.classList.add('is-new')
    }
    dom.nextLyric.textContent = nextLine

    updateUrlBarLyrics(prevLine, currentLine, nextLine)
  }

  function updateUrlBarLyrics(prevLine, currentLine, nextLine) {
    const urlInput = document.getElementById('url-input')
    const hasLyrics = state.playing && state.lyricsLines.length > 0

    if (!urlInput) return

    if (!hasLyrics) {
      urlInput.dataset.lyricText = ''
      urlInput.placeholder = 'Search or enter address'
      addressBarWrap?.classList.remove('has-lyrics')
      return
    }

    const currentText = currentLine || '♪'

    // Only update if the text has changed
    if (urlInput.dataset.lyricText !== currentText) {
      urlInput.style.opacity = '0'
      setTimeout(() => {
        urlInput.placeholder = currentText
        urlInput.dataset.lyricText = currentText
        urlInput.style.opacity = '1'
      }, 200)
    }

    addressBarWrap?.classList.add('has-lyrics')
  }

  function updateDockChrome() {
    const minimized = isMinimized()
    pill.classList.toggle('is-minimized', minimized)

    if (minimized) {
      if (state.currentTrack) {
        const label = `${getTrackTitle(state.currentTrack)} — ${getArtistText(state.currentTrack)}`
        pill.title = label
        if (dom.chipBody) {
          dom.chipBody.title = state.playing ? 'Open music player' : 'Resume playback (double-click to open player)'
          dom.chipBody.setAttribute('aria-label', state.playing ? 'Open music player' : `Resume ${getTrackTitle(state.currentTrack)}`)
        }
      } else {
        pill.title = 'Music — click to search'
        if (dom.chipBody) {
          dom.chipBody.title = 'Search music'
          dom.chipBody.setAttribute('aria-label', 'Search music')
        }
      }
    } else {
      pill.removeAttribute('title')
      if (dom.chipBody) {
        dom.chipBody.title = 'Open music player'
        dom.chipBody.setAttribute('aria-label', 'Open music player')
      }
    }

    if (!state.playing) {
      updateUrlBarLyrics('', '', '')
      if (dom.chipSeekFill) dom.chipSeekFill.style.width = '0%'
    }
  }

  function setChipTitle(title) {
    if (!dom.chipTitle) return
    const raw = escapeHtml(title)
    const needsScroll = raw.length > 28
    dom.chipTitle.classList.toggle('is-scrolling', needsScroll)
    if (needsScroll) {
      const duration = Math.max(8, Math.min(18, Math.round(raw.length / 2)))
      dom.chipTitle.style.setProperty('--mp-scroll-dur', `${duration}s`)
      dom.chipTitle.innerHTML = `<span>${raw}</span><span aria-hidden="true">${raw}</span>`
    } else {
      dom.chipTitle.style.removeProperty('--mp-scroll-dur')
      dom.chipTitle.textContent = title
    }
  }

  function renderNowPlaying(track, playback = null) {
    const title = track ? getTrackTitle(track) : 'Music'
    const subtitle = track ? getSubtitle(track) : state.wsConnected ? 'Search songs' : 'Connecting...'
    const cover = track?.coverUrl || track?.album?.coverUrl || track?.album?.cover || track?.image || ''
    const artist = track ? getArtistText(track) : ''

    pill.classList.toggle('has-track', !!track)

    setChipTitle(title)

    if (dom.chipArtist) dom.chipArtist.textContent = subtitle
    if (dom.heroTitle) dom.heroTitle.textContent = title
    if (dom.heroArtist) dom.heroArtist.textContent = artist || subtitle

    setArtwork(cover)

    if (playback?.source && dom.chipArtist) {
      dom.chipArtist.textContent = `${subtitle} · ${playback.source}`
    }

    if ('mediaSession' in navigator) {
      if (track) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: title,
          artist: artist,
          album: track.album?.title || track.albumTitle || '',
          artwork: cover ? [{ src: cover, sizes: '512x512', type: 'image/png' }] : []
        })
      } else {
        navigator.mediaSession.metadata = null
      }
    }

    if (track) {
      fetchLyrics(track)
    }

    updateDockChrome()
  }

  function setView(view) {
    state.view = view === 'search' ? 'search' : 'player'
    pill.classList.toggle('mp-view-search', state.view === 'search')
    if (dom.viewPlayer) dom.viewPlayer.hidden = state.view !== 'player'
    if (dom.viewSearch) dom.viewSearch.hidden = state.view !== 'search'
    dom.tabs?.forEach((tab) => {
      tab.classList.toggle('is-active', tab.dataset.view === state.view)
    })
    if (state.view === 'search') {
      window.setTimeout(() => dom.searchInput?.focus(), 0)
    }
  }

  function setPanelOpen(open) {
    state.panelOpen = !!open
    pill.classList.toggle('is-open', state.panelOpen)
    if (dom.panel) dom.panel.hidden = !state.panelOpen
    if (state.panelOpen) {
      if (!state.currentTrack && state.view === 'player') {
        setView('search')
      }
      if (state.view === 'search') {
        window.setTimeout(() => dom.searchInput?.focus(), 0)
      }
    }
    updateDockChrome()
  }

  function updatePlayButton() {
    if (!dom.playBtn) return
    const playIcon = state.playing ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>'
    dom.playBtn.innerHTML = playIcon
    dom.playBtn.title = state.playing ? 'Pause' : 'Play'
    dom.playBtn.setAttribute('aria-label', state.playing ? 'Pause' : 'Play')

    if (dom.panelPlayBtn) {
      dom.panelPlayBtn.innerHTML = playIcon
    }

    pill.classList.toggle('is-playing', state.playing)

    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = state.playing ? 'playing' : 'paused'
    }

    if (state.playing) {
      startRotation()
    } else {
      stopRotation()
    }

    updateDockChrome()
  }

  function startRotation() {
    if (state.rotationInterval) return
    state.lastRotationUpdate = performance.now()
    state.rotationInterval = setInterval(updateRotation, 16)
  }

  function stopRotation() {
    if (state.rotationInterval) {
      clearInterval(state.rotationInterval)
      state.rotationInterval = null
    }
  }

  function updateRotation() {
    const now = performance.now()
    const delta = (now - state.lastRotationUpdate) / 1000
    state.lastRotationUpdate = now

    const dockSpeed = 360 / 12
    const expandedSpeed = 360 / 15

    state.dockRotation = (state.dockRotation + dockSpeed * delta) % 360
    state.expandedRotation = (state.expandedRotation + expandedSpeed * delta) % 360

    if (dom.artwork) {
      dom.artwork.style.transform = `rotate(${state.dockRotation}deg)`
    }
    if (dom.heroArtwork) {
      dom.heroArtwork.style.transform = `rotate(${state.expandedRotation}deg)`
    }
  }

  function updateProgressBar() {
    if (!state.audio.duration) return
    const percent = (state.audio.currentTime / state.audio.duration) * 100

    if (dom.seekFill) dom.seekFill.style.width = `${percent}%`
    if (dom.chipSeekFill) dom.chipSeekFill.style.width = `${percent}%`

    if (dom.timeCurrent) dom.timeCurrent.textContent = formatTime(state.audio.currentTime)
    if (dom.timeDuration) dom.timeDuration.textContent = formatTime(state.audio.duration)
  }

  function seekTo(e) {
    if (!state.audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = x / rect.width
    state.audio.currentTime = percent * state.audio.duration
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  function updateQueueMarker() {
    if (!dom.results) return
    const currentId = state.currentTrack?.id != null ? String(state.currentTrack.id) : ''
    dom.results.querySelectorAll('.mp-result').forEach((item) => {
      item.classList.toggle('is-active', item.dataset.trackId === currentId)
    })
  }

  function closePanel() {
    setPanelOpen(false)
  }

  function openPanel(view = null) {
    if (view) setView(view)
    else if (!state.currentTrack) setView('search')
    else setView('player')
    setPanelOpen(true)
  }

  function togglePanel() {
    setPanelOpen(!state.panelOpen)
  }

  async function proxyablePlaybackUrl(trackId, quality = 'LOSSLESS') {
    if (state.wsReady) {
      try {
        return await wsRequest('resolve', { id: trackId, quality }, 20000)
      } catch {}
    }
    return await httpJson(`/api/resolve?id=${encodeURIComponent(trackId)}&quality=${encodeURIComponent(quality)}`)
  }

  async function stopEngines() {
    if (state.hls) {
      try {
        state.hls.destroy()
      } catch {}
      state.hls = null
    }

    if (state.shakaPlayer) {
      try {
        if (typeof state.shakaPlayer.unload === 'function') await state.shakaPlayer.unload()
      } catch {}
      try {
        if (typeof state.shakaPlayer.detach === 'function') await state.shakaPlayer.detach()
      } catch {}
      state.shakaPlayer = null
    }

    if (state.audio.src) {
      state.audio.pause()
      state.audio.removeAttribute('src')
      state.audio.load()
    }
  }

  async function playDirect(url) {
    await stopEngines()
    state.audio.src = url
    await state.audio.play()
  }

  async function playDash(url) {
    await stopEngines()
    const shaka = await ensureShaka()
    if (!state.shakaPlayer) {
      state.shakaPlayer = new shaka.Player()
      state.shakaPlayer.configure({
        streaming: {
          bufferingGoal: 20,
          rebufferingGoal: 2,
          bufferBehind: 20,
        },
        abr: {
          enabled: true,
          defaultBandwidthEstimate: 120000,
          switchInterval: 1,
        },
      })
    }

    if (typeof state.shakaPlayer.attach === 'function' && state.shakaPlayer.getMediaElement?.() !== state.audio) {
      await state.shakaPlayer.attach(state.audio)
    }
    await state.shakaPlayer.load(url)
    await state.audio.play()
  }

  async function playHls(url) {
    await stopEngines()
    const Hls = await ensureHls()
    if (!Hls.isSupported()) {
      state.audio.src = url
      await state.audio.play()
      return
    }

    state.hls = new Hls({ enableWorker: true })
    state.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      state.hls?.loadSource(url)
    })
    state.hls.attachMedia(state.audio)
    await new Promise((resolve, reject) => {
      const done = () => resolve()
      const fail = (_event, data) => reject(new Error(data?.fatal ? 'HLS playback failed' : 'HLS attach failed'))
      state.hls.on?.(Hls.Events.MANIFEST_PARSED, done)
      state.hls.on?.(Hls.Events.ERROR, fail)
      window.setTimeout(resolve, 500)
    })
    await state.audio.play()
  }

  async function startPlayback(track, playback, queue = state.queue, index = -1) {
    state.currentTrack = track
    state.currentPlayback = playback
    state.queue = Array.isArray(queue) ? queue : state.queue
    state.currentIndex = Number.isFinite(index) ? index : state.currentIndex
    state.playing = true

    // Track in history
    if (window.CraftedHistory) {
      window.CraftedHistory.addToHistory(window.CraftedHistory.HISTORY_TYPES.MUSIC, {
        id: track.id,
        title: getTrackTitle(track),
        subtitle: getArtistText(track),
        cover: track.coverUrl || track.album?.coverUrl || ''
      });
    }

    renderNowPlaying(track, playback)
    updatePlayButton()
    updateQueueMarker()

    if (!playback?.url) {
      throw new Error('No playback URL returned')
    }

    if (playback.kind === 'dash') {
      await playDash(playback.url)
    } else if (playback.kind === 'hls') {
      await playHls(playback.url)
    } else {
      await playDirect(playback.url)
    }

    syncStateToServer()
  }

  async function playQueueIndex(index) {
    if (!Array.isArray(state.queue) || state.queue.length === 0) return
    const normalized = (index + state.queue.length) % state.queue.length
    const track = state.queue[normalized]
    if (!track) return
    const resolved = await proxyablePlaybackUrl(track.id)
    await startPlayback(resolved.track || track, resolved.playback, state.queue, normalized)
  }

  async function playTrack(track, queue = state.searchResults, index = 0) {
    if (!track?.id) return
    const resolved = await proxyablePlaybackUrl(track.id)
    const trackQueue = Array.isArray(queue) && queue.length > 0 ? queue : [track]
    const trackIndex = Array.isArray(queue) && queue.length > 0 ? index : 0
    await startPlayback(resolved.track || track, resolved.playback, trackQueue, trackIndex)
    setView('player')
  }

  async function nextTrack() {
    if (!state.queue.length) return
    await playQueueIndex(state.currentIndex + 1)
  }

  async function prevTrack() {
    if (!state.queue.length) return
    await playQueueIndex(state.currentIndex - 1)
  }

  async function togglePlay() {
    if (!state.currentTrack) {
      if (state.searchResults.length > 0) {
        await playTrack(state.searchResults[0], state.searchResults, 0)
      }
      return
    }

    if (state.audio.paused) {
      await state.audio.play()
      state.playing = true
    } else {
      state.audio.pause()
      state.playing = false
    }

    updatePlayButton()
    syncStateToServer()
  }

  function syncStateToServer() {
    if (!state.currentTrack) return
    const payload = {
      type: 'state',
      playing: state.playing,
      currentIndex: state.currentIndex,
      queue: state.queue.map((track) => ({
        id: track.id,
        title: getTrackTitle(track),
        artistText: getArtistText(track),
        coverUrl: track.coverUrl,
      })),
      track: {
        id: state.currentTrack.id,
        title: getTrackTitle(state.currentTrack),
        artistText: getArtistText(state.currentTrack),
        coverUrl: state.currentTrack.coverUrl,
      },
    }
    wsSend(payload)
  }

  function renderEmpty(message) {
    if (!dom.results) return
    dom.results.innerHTML = `<div class="mp-empty">${escapeHtml(message)}</div>`
  }

  function renderSkeletons(count = 8) {
    if (!dom.results) return
    dom.results.innerHTML = Array(count).fill(0).map(() => `
      <div class="mp-skeleton-result">
        <div class="mp-skeleton-art"></div>
        <div class="mp-skeleton-copy">
          <div class="mp-skeleton-title"></div>
          <div class="mp-skeleton-meta"></div>
        </div>
      </div>
    `).join('')
  }

  function renderSearchResults(payload) {
    const tracks = payload?.tracks?.items || payload?.items || []
    state.searchResults = tracks
    if (!dom.results) return

    if (!tracks.length) {
      renderEmpty(`No tracks found for "${payload?.query || state.currentQuery || ''}"`)
      return
    }

    dom.results.innerHTML = tracks.slice(0, 20).map((track, index) => {
      const title = escapeHtml(getTrackTitle(track))
      const meta = escapeHtml(getSubtitle(track))
      const cover = escapeHtml(track.coverUrl || track.album?.coverUrl || '')
      const isActive = state.currentTrack?.id != null && String(state.currentTrack.id) === String(track.id)
      return `
        <button class="mp-result${isActive ? ' is-active' : ''}" type="button" data-track-id="${escapeHtml(track.id)}" data-index="${index}">
          ${cover ? `<img class="mp-result-art" src="${cover}" alt="">` : `<div class="mp-result-art-fallback"><i class="fa-solid fa-music"></i></div>`}
          <div class="mp-result-copy">
            <div class="mp-result-title">${title}</div>
            <div class="mp-result-meta">${meta}</div>
          </div>
        </button>
      `
    }).join('')
    updateQueueMarker()
  }

  async function runSearch(query) {
    const trimmed = String(query || '').trim()
    state.currentQuery = trimmed

    if (!trimmed) {
      renderEmpty('Search for a song, album, or artist.')
      setBusy(false, state.wsConnected ? 'Ready' : 'Connecting...')
      return
    }

    setBusy(true, `Searching for "${trimmed}"...`)
    renderSkeletons(8)
    const requestId = ++state.searchSeq

    try {
      const payload = state.wsReady
        ? await wsRequest('search', { query: trimmed, scope: 'all' }, 15000).catch(() => httpJson(`/api/search?q=${encodeURIComponent(trimmed)}&scope=all`))
        : await httpJson(`/api/search?q=${encodeURIComponent(trimmed)}&scope=all`)

      if (requestId !== state.searchSeq) return
      renderSearchResults(payload)
      setBusy(false, `${payload.tracks?.items?.length || 0} tracks found`)
    } catch (error) {
      if (requestId !== state.searchSeq) return
      renderEmpty(`Could not search music. ${error.message}`)
      setBusy(false, 'Search failed')
    }
  }

  function scheduleSearch(query) {
    window.clearTimeout(state.searchDebounce)
    state.searchDebounce = window.setTimeout(() => {
      runSearch(query)
    }, 250)
  }

  function setTransportState(connected, ready = false) {
    state.wsConnected = connected
    state.wsReady = ready
    if (!state.currentTrack) {
      renderNowPlaying(null, null)
    }
    if (connected && ready) {
      setBusy(false, 'Ready')
    } else if (connected) {
      setBusy(true, 'Connecting...')
    } else {
      setBusy(true, 'Offline')
    }
  }

  function connectWebSocket() {
    try {
      const ws = new WebSocket(MUSIC_WS_URL)
      state.ws = ws
      setTransportState(false, false)

      ws.addEventListener('open', () => {
        setTransportState(true, false)
        wsSend({ type: 'hello', client: 'browser-music-dock' })
      })

      ws.addEventListener('message', (event) => {
        let message
        try {
          message = JSON.parse(event.data)
        } catch {
          return
        }

        if (message.type === 'welcome') {
          setTransportState(true, true)
          if (dom.status && !state.currentTrack) {
            dom.status.textContent = 'Ready'
          }
          return
        }

        if (message.type === 'hello') {
          state.externalReady = true
          setTransportState(true, true)
          if (message.state?.track) {
            const current = message.state.track
            if (current?.id && !state.currentTrack) {
              renderNowPlaying(current, null)
            }
          }
          return
        }

        if (message.type === 'search-results') {
          if (message.requestId && state.pendingWs.has(message.requestId)) {
            const pending = state.pendingWs.get(message.requestId)
            state.pendingWs.delete(message.requestId)
            pending.resolve(message)
            return
          }
          if (state.currentQuery) {
            renderSearchResults(message)
            setBusy(false, `${message.tracks?.items?.length || 0} tracks found`)
          }
          return
        }

        if (message.type === 'resolved-track') {
          if (message.requestId && state.pendingWs.has(message.requestId)) {
            const pending = state.pendingWs.get(message.requestId)
            state.pendingWs.delete(message.requestId)
            pending.resolve(message)
            return
          }
          return
        }

        if (message.type === 'album') {
          if (message.requestId && state.pendingWs.has(message.requestId)) {
            const pending = state.pendingWs.get(message.requestId)
            state.pendingWs.delete(message.requestId)
            pending.resolve(message)
          }
          return
        }

        if (message.type === 'state' && message.track?.id) {
          state.playing = !!message.playing
          updatePlayButton()
        }
      })

      ws.addEventListener('close', () => {
        setTransportState(false, false)
        state.ws = null
        window.setTimeout(connectWebSocket, 2500)
      })

      ws.addEventListener('error', () => {
        setTransportState(false, false)
      })
    } catch {
      setTransportState(false, false)
    }
  }

  function buildDom() {
    pill.classList.add('mp-root')
    pill.innerHTML = `
      <div class="mp-chip">
        <button class="mp-chip-body" type="button" aria-label="Music player">
          <div class="mp-art">
            <img class="mp-art-img" id="mp-art-img" alt="" hidden>
            <div class="mp-art-fallback" id="mp-art-fallback"><i class="fa-solid fa-music"></i></div>
            <div class="mp-art-ring" aria-hidden="true"></div>
          </div>
          <div class="mp-chip-meta">
            <div class="mp-chip-title-wrap">
              <span class="mp-chip-title" id="mp-chip-title">Music</span>
            </div>
            <div class="mp-chip-artist" id="mp-chip-artist">Search songs</div>
          </div>
          <div class="mp-chip-wave" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
        </button>
        <div class="mp-chip-transport">
          <button class="mp-btn" id="mp-prev" type="button" aria-label="Previous" title="Previous"><i class="fa-solid fa-backward-step"></i></button>
          <button class="mp-btn mp-btn-play" id="mp-play" type="button" aria-label="Play" title="Play"><i class="fa-solid fa-play"></i></button>
          <button class="mp-btn" id="mp-next" type="button" aria-label="Next" title="Next"><i class="fa-solid fa-forward-step"></i></button>
        </div>
        <div class="mp-chip-seek" id="mp-chip-seek"><div class="mp-chip-seek-fill" id="mp-chip-seek-fill"></div></div>
      </div>

      <div class="mp-panel" id="mp-panel" hidden>
        <div class="mp-panel-top">
          <div class="mp-tabs">
            <button class="mp-tab is-active" type="button" data-view="player">Now Playing</button>
            <button class="mp-tab" type="button" data-view="search">Search</button>
          </div>
          <button class="mp-icon-btn" id="mp-close" type="button" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <div class="mp-view mp-view-player" id="mp-view-player">
          <div class="mp-hero">
            <div class="mp-hero-art">
              <img class="mp-hero-img" id="mp-hero-img" alt="" hidden>
              <div class="mp-hero-fallback" id="mp-hero-fallback"><i class="fa-solid fa-music"></i></div>
            </div>
            <div class="mp-hero-info">
              <div class="mp-hero-title" id="mp-hero-title">Music</div>
              <div class="mp-hero-artist" id="mp-hero-artist">Search for a song</div>
            </div>
          </div>
          <div class="mp-panel-controls">
            <button class="mp-btn" id="mp-panel-prev" type="button" aria-label="Previous"><i class="fa-solid fa-backward-step"></i></button>
            <button class="mp-btn mp-btn-play" id="mp-panel-play" type="button" aria-label="Play"><i class="fa-solid fa-play"></i></button>
            <button class="mp-btn" id="mp-panel-next" type="button" aria-label="Next"><i class="fa-solid fa-forward-step"></i></button>
          </div>
          <div class="mp-seek">
            <span class="mp-seek-time" id="mp-time-cur">0:00</span>
            <div class="mp-seek-bar" id="mp-seek-bar"><div class="mp-seek-fill" id="mp-seek-fill"></div></div>
            <span class="mp-seek-time" id="mp-time-dur">0:00</span>
          </div>
          <div class="mp-lyrics" id="mp-lyrics">
            <p class="mp-lyric-line" id="mp-lyric-cur">♪</p>
            <p class="mp-lyric-next" id="mp-lyric-next"></p>
          </div>
          <div class="mp-volume">
            <i class="fa-solid fa-volume-low"></i>
            <input type="range" id="mp-volume" min="0" max="100" value="85" aria-label="Volume">
            <i class="fa-solid fa-volume-high"></i>
          </div>
        </div>

        <div class="mp-view mp-view-search" id="mp-view-search" hidden>
          <div class="mp-search-box">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input class="mp-search-input" id="mp-search-input" type="text" placeholder="Songs, albums, artists" spellcheck="false" autocomplete="off">
          </div>
          <div class="mp-search-status" id="mp-search-status">Search songs, albums, or artists.</div>
          <div class="mp-search-results" id="mp-search-results"></div>
        </div>
      </div>
    `

    dom.artwork = document.getElementById('mp-art-img')
    dom.placeholder = document.getElementById('mp-art-fallback')
    dom.heroArtwork = document.getElementById('mp-hero-img')
    dom.heroPlaceholder = document.getElementById('mp-hero-fallback')
    dom.chipTitle = document.getElementById('mp-chip-title')
    dom.chipArtist = document.getElementById('mp-chip-artist')
    dom.heroTitle = document.getElementById('mp-hero-title')
    dom.heroArtist = document.getElementById('mp-hero-artist')
    dom.prevBtn = document.getElementById('mp-prev')
    dom.playBtn = document.getElementById('mp-play')
    dom.nextBtn = document.getElementById('mp-next')
    dom.panel = document.getElementById('mp-panel')
    dom.searchInput = document.getElementById('mp-search-input')
    dom.closeBtn = document.getElementById('mp-close')
    dom.status = document.getElementById('mp-search-status')
    dom.results = document.getElementById('mp-search-results')
    dom.chipBody = pill.querySelector('.mp-chip-body')
    dom.seekFill = document.getElementById('mp-seek-fill')
    dom.seekBar = document.getElementById('mp-seek-bar')
    dom.chipSeek = document.getElementById('mp-chip-seek')
    dom.chipSeekFill = document.getElementById('mp-chip-seek-fill')
    dom.timeCurrent = document.getElementById('mp-time-cur')
    dom.timeDuration = document.getElementById('mp-time-dur')
    dom.lyrics = document.getElementById('mp-lyrics')
    dom.currentLyric = document.getElementById('mp-lyric-cur')
    dom.nextLyric = document.getElementById('mp-lyric-next')
    dom.volumeSlider = document.getElementById('mp-volume')
    dom.panelPlayBtn = document.getElementById('mp-panel-play')
    dom.panelPrevBtn = document.getElementById('mp-panel-prev')
    dom.panelNextBtn = document.getElementById('mp-panel-next')
    dom.viewPlayer = document.getElementById('mp-view-player')
    dom.viewSearch = document.getElementById('mp-view-search')
    dom.tabs = Array.from(pill.querySelectorAll('.mp-tab'))
  }

  function attachEvents() {
    dom.chipBody?.addEventListener('click', async (event) => {
      event.preventDefault()
      event.stopPropagation()

      if (isMinimized() && state.currentTrack) {
        try {
          await togglePlay()
        } catch (error) {
          setBusy(false, error.message)
        }
        return
      }

      openPanel(state.currentTrack ? 'player' : 'search')
    })

    dom.chipBody?.addEventListener('dblclick', (event) => {
      event.preventDefault()
      event.stopPropagation()
      if (!state.panelOpen) openPanel('player')
    })

    dom.tabs?.forEach((tab) => {
      tab.addEventListener('click', (event) => {
        event.preventDefault()
        event.stopPropagation()
        setView(tab.dataset.view)
      })
    })

    dom.chipSeek?.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      seekTo(event)
    })

    const bindTransport = (btn, action) => {
      btn?.addEventListener('click', async (event) => {
        event.preventDefault()
        event.stopPropagation()
        try {
          await action()
        } catch (error) {
          setBusy(false, error.message)
        }
      })
    }

    bindTransport(dom.prevBtn, prevTrack)
    bindTransport(dom.panelPrevBtn, prevTrack)
    bindTransport(dom.playBtn, togglePlay)
    bindTransport(dom.panelPlayBtn, togglePlay)
    bindTransport(dom.nextBtn, nextTrack)
    bindTransport(dom.panelNextBtn, nextTrack)

    dom.closeBtn?.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      closePanel()
    })

    dom.searchInput?.addEventListener('input', (event) => {
      const query = event.target.value.trim();
      scheduleSearch(query);
      
      // Track search history
      if (window.CraftedHistory && query.length >= 2) {
        window.CraftedHistory.addSearchHistory(query, 'music');
      }
    })

    dom.searchInput?.addEventListener('keydown', async (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        await runSearch(event.target.value)
      } else if (event.key === 'Escape') {
        closePanel()
      }
    })

    dom.results?.addEventListener('click', async (event) => {
      const button = event.target.closest('.mp-result')
      if (!button) return
      const index = Number(button.dataset.index || 0)
      const track = state.searchResults[index] || state.searchResults.find((item) => String(item.id) === String(button.dataset.trackId))
      if (!track) return
      try {
        await playTrack(track, state.searchResults, index)
        setView('player')
      } catch (error) {
        setBusy(false, error.message)
      }
    })

    document.addEventListener('click', (event) => {
      if (!state.panelOpen) return
      if (pill.contains(event.target)) return
      closePanel()
    })

    dom.volumeSlider?.addEventListener('input', (event) => {
      const volume = parseInt(event.target.value, 10) / 100
      state.audio.volume = volume
      try {
        localStorage.setItem('cg-music-volume', String(volume))
        if (window.accountManager && typeof window.accountManager.scheduleMusicVolumeSync === 'function') {
          window.accountManager.scheduleMusicVolumeSync()
        }
      } catch (e) {}
    })

    state.audio.addEventListener('play', () => {
      state.playing = true
      updatePlayButton()
      syncStateToServer()
    })

    state.audio.addEventListener('pause', () => {
      state.playing = false
      updatePlayButton()
      syncStateToServer()
    })

    state.audio.addEventListener('timeupdate', () => {
      updateProgressBar()
      updateLyricsDisplay()
    })

    state.audio.addEventListener('waiting', () => {
      if (state.currentTrack && dom.chipArtist) {
        dom.chipArtist.textContent = `${getSubtitle(state.currentTrack)} · Buffering`
      }
    })

    state.audio.addEventListener('canplay', () => {
      if (state.currentTrack) renderNowPlaying(state.currentTrack, state.currentPlayback)
    })

    state.audio.addEventListener('ended', async () => {
      try {
        await nextTrack()
      } catch {}
    })

    state.audio.addEventListener('error', async () => {
      if (state.currentPlayback?.kind === 'dash' && state.currentPlayback?.manifestUrl && state.currentPlayback?.url !== state.currentPlayback.manifestUrl) {
        try {
          await playDash(state.currentPlayback.manifestUrl)
          return
        } catch {}
      }
      setBusy(false, 'Playback failed')
    })

    dom.seekBar?.addEventListener('click', (event) => {
      if (!state.audio.duration) return
      const rect = event.currentTarget.getBoundingClientRect()
      const percent = (event.clientX - rect.left) / rect.width
      state.audio.currentTime = percent * state.audio.duration
    })
  }

  function initMediaSession() {
    if (!('mediaSession' in navigator)) return
    navigator.mediaSession.setActionHandler('play', async () => {
      try { await togglePlay() } catch (err) { console.error(err) }
    })
    navigator.mediaSession.setActionHandler('pause', async () => {
      try { await togglePlay() } catch (err) { console.error(err) }
    })
    navigator.mediaSession.setActionHandler('previoustrack', async () => {
      try { await prevTrack() } catch (err) { console.error(err) }
    })
    navigator.mediaSession.setActionHandler('nexttrack', async () => {
      try { await nextTrack() } catch (err) { console.error(err) }
    })
  }

  function init() {
    buildDom()
    attachEvents()
    setView('player')
    renderNowPlaying(null, null)
    renderEmpty('Search for a song, album, or artist.')
    updatePlayButton()
    pill.classList.toggle('has-track', !!state.currentTrack)
    updateDockChrome()
    connectWebSocket()
    initMediaSession()

    // Restore saved volume
    try {
      const savedVolume = localStorage.getItem('cg-music-volume')
      if (savedVolume !== null) {
        const vol = parseFloat(savedVolume)
        state.audio.volume = vol
        if (dom.volumeSlider) {
          dom.volumeSlider.value = Math.round(vol * 100)
        }
      }
    } catch (e) {}

    urlInput?.addEventListener('focus', () => {
      addressBarWrap?.classList.add('is-editing-url')
    })

    urlInput?.addEventListener('blur', () => {
      addressBarWrap?.classList.remove('is-editing-url')
    })

    window.addEventListener('beforeunload', () => {
      try {
        if (state.ws) state.ws.close()
      } catch {}
    })

    // Handle search from history
    window.addEventListener('searchFromHistory', (e) => {
      const query = e.detail;
      if (query && dom.searchInput) {
        dom.searchInput.value = query;
        runSearch(query);
      }
    })
  }

  window.MusicDock = {
    open(view) {
      openPanel(view)
    },
    close() {
      closePanel()
    },
    toggle() {
      if (state.panelOpen) closePanel()
      else openPanel()
    },
    play() {
      return togglePlay()
    },
    isPlaying() {
      return state.playing
    },
    getCurrentTrack() {
      return state.currentTrack
    },
  }

  init()
})()
