(() => {
  const pill = document.getElementById('music-pill')
  if (!pill) return

  const MUSIC_API_BASE = (window.MUSIC_API_BASE || 'https://music.cgamz.online').replace(/\/+$/, '')
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
    if (dom.expandedArtwork) {
      dom.expandedArtwork.src = url || ''
      dom.expandedArtwork.hidden = !hasArt
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
    if (!dom.lyricsContainer || !state.audio.duration) return

    const hasLyrics = state.lyricsLines.length > 0

    if (!hasLyrics) {
      dom.lyricsContainer.style.display = 'none'
      updateUrlBarLyrics('', '', '')
      return
    }

    dom.lyricsContainer.style.display = 'flex'

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
      dom.currentLyric.classList.remove('lyric-animate')
      void dom.currentLyric.offsetWidth
      dom.currentLyric.classList.add('lyric-animate')
    }
    dom.nextLyric.textContent = nextLine

    updateUrlBarLyrics(prevLine, currentLine, nextLine)
  }

  function updateUrlBarLyrics(prevLine, currentLine, nextLine) {
    const urlLyricsMarquee = document.getElementById('url-lyrics-marquee')
    if (!urlLyricsMarquee || !state.playing) {
      if (urlLyricsMarquee) urlLyricsMarquee.innerHTML = ''
      return
    }

    const prevText = prevLine || ''
    const currentText = currentLine || '♪'
    const nextText = nextLine || ''

    urlLyricsMarquee.innerHTML = `
      <span class="url-lyrics-line prev">${escapeHtml(prevText)}</span>
      <span class="url-lyrics-line current">${escapeHtml(currentText)}</span>
      <span class="url-lyrics-line next">${escapeHtml(nextText)}</span>
    `
  }

  function renderNowPlaying(track, playback = null) {
    const title = track ? getTrackTitle(track) : 'Music'
    const subtitle = track ? getSubtitle(track) : state.wsConnected ? 'Search songs' : 'Connecting to music server...'
    const cover = track?.coverUrl || track?.album?.coverUrl || track?.album?.cover || track?.image || ''
    const artist = track ? getArtistText(track) : ''

    pill.classList.toggle('has-track', !!track)
    if (!track) pill.classList.remove('is-searching')

    if (dom.titleClip) {
      const rawTitle = escapeHtml(title)
      const needsScroll = rawTitle.length > 34 || (dom.titleClip.clientWidth > 0 && dom.titleText && dom.titleText.scrollWidth > dom.titleClip.clientWidth)
      dom.titleMarquee.classList.toggle('is-scrolling', needsScroll)
      dom.titleMarquee.style.removeProperty('--music-marquee-duration')
      if (needsScroll) {
        const duration = Math.max(10, Math.min(20, Math.round(rawTitle.length / 2)))
        dom.titleMarquee.style.setProperty('--music-marquee-duration', `${duration}s`)
      }
      dom.titleMarquee.innerHTML = needsScroll
        ? `<span class="music-dock-title">${rawTitle}</span><span class="music-dock-title" aria-hidden="true">${rawTitle}</span>`
        : `<span class="music-dock-title">${rawTitle}</span>`
    }

    if (dom.subtitle) {
      dom.subtitle.textContent = subtitle
    }

    if (dom.panelTitle) {
      dom.panelTitle.textContent = title
    }
    if (dom.panelArtist) {
      dom.panelArtist.textContent = artist
    }

    setArtwork(cover)

    if (playback?.source) {
      dom.subtitle.textContent = `${subtitle} · ${playback.source}`
    }

    if (track) {
      fetchLyrics(track)
    }
  }

  function setPanelOpen(open) {
    state.panelOpen = !!open
    pill.classList.toggle('is-open', state.panelOpen)
    if (dom.panel) dom.panel.hidden = !state.panelOpen
    if (state.panelOpen) {
      if (dom.searchInput) {
        window.setTimeout(() => dom.searchInput?.focus(), 0)
      }
    }
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

    if (state.playing) {
      startRotation()
    } else {
      stopRotation()
    }
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
    if (dom.expandedArtwork) {
      dom.expandedArtwork.style.transform = `rotate(${state.expandedRotation}deg)`
    }
  }

  function updateProgressBar() {
    if (!dom.progressBar || !state.audio.duration) return
    const percent = (state.audio.currentTime / state.audio.duration) * 100
    dom.progressBar.style.width = `${percent}%`

    const dockProgressFill = document.getElementById('music-dock-progress-fill')
    if (dockProgressFill) {
      dockProgressFill.style.width = `${percent}%`
    }

    if (dom.timeDisplay) {
      const current = formatTime(state.audio.currentTime)
      const duration = formatTime(state.audio.duration)
      dom.timeDisplay.textContent = `${current} / ${duration}`
    }
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
    dom.results.querySelectorAll('.music-search-item').forEach((item) => {
      item.classList.toggle('is-playing', item.dataset.trackId === currentId)
    })
  }

  function closeSearchPanel() {
    setPanelOpen(false)
  }

  function openSearchPanel() {
    setPanelOpen(true)
  }

  function toggleSearchPanel() {
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
    dom.results.innerHTML = `<div class="music-dock-empty">${escapeHtml(message)}</div>`
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
        <button class="music-search-item${isActive ? ' is-playing' : ''}" type="button" data-track-id="${escapeHtml(track.id)}" data-index="${index}">
          ${cover ? `<img class="music-search-item-art" src="${cover}" alt="">` : `<div class="music-dock-art-placeholder"><i class="fa-solid fa-music"></i></div>`}
          <div class="music-search-item-copy">
            <div class="music-search-item-title">${title}</div>
            <div class="music-search-item-meta">${meta}</div>
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
    pill.innerHTML = `
      <button class="music-dock-main" type="button" aria-label="Open music player">
        <div class="music-dock-art-wrapper">
          <img class="music-dock-art" id="music-dock-art" alt="" hidden>
          <div class="music-dock-art-placeholder" id="music-dock-art-placeholder"></div>
        </div>
        <div class="music-dock-copy">
          <div class="music-dock-title-clip">
            <span class="music-dock-title-marquee" id="music-dock-title-marquee">
              <span class="music-dock-title" id="music-dock-title">Music</span>
            </span>
          </div>
          <div class="music-dock-subtitle" id="music-dock-subtitle">Search songs</div>
        </div>
        <div class="music-dock-progress-bar">
          <div class="music-dock-progress-fill" id="music-dock-progress-fill"></div>
        </div>
      </button>
      <div class="music-dock-controls">
        <button class="music-dock-btn" id="music-dock-prev" type="button" aria-label="Previous track" title="Previous track">
          <i class="fa-solid fa-backward-step"></i>
        </button>
        <button class="music-dock-btn is-primary" id="music-dock-play" type="button" aria-label="Play" title="Play">
          <i class="fa-solid fa-play"></i>
        </button>
        <button class="music-dock-btn" id="music-dock-next" type="button" aria-label="Next track" title="Next track">
          <i class="fa-solid fa-forward-step"></i>
        </button>
      </div>
      <div class="music-dock-panel" id="music-dock-panel" hidden>
        <div class="music-panel-header">
          <button class="music-panel-search-toggle" id="music-panel-search-toggle" type="button" title="Search music">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <div class="music-expanded-art-container">
            <img class="music-expanded-art" id="music-expanded-art" alt="" hidden>
            <div class="music-expanded-art-placeholder" id="music-expanded-art-placeholder"></div>
          </div>
          <div class="music-panel-info">
            <div class="music-panel-title" id="music-panel-title">Music Player</div>
            <div class="music-panel-artist" id="music-panel-artist">Search for a song</div>
          </div>
          <button class="music-search-close" id="music-dock-close" type="button" aria-label="Close player">
            <i class="fa-solid fa-chevron-down"></i>
          </button>
        </div>
        
        <div class="music-dropdown-controls" id="music-dropdown-controls">
          <button class="music-dock-btn" id="music-panel-prev" type="button" aria-label="Previous track">
            <i class="fa-solid fa-backward-step"></i>
          </button>
          <button class="music-dock-btn is-primary" id="music-panel-play" type="button" aria-label="Play/Pause">
            <i class="fa-solid fa-play"></i>
          </button>
          <button class="music-dock-btn" id="music-panel-next" type="button" aria-label="Next track">
            <i class="fa-solid fa-forward-step"></i>
          </button>
        </div>

        <div class="music-progress-container">
          <div class="music-progress-bar-wrapper">
            <div class="music-progress-bar" id="music-progress-bar"></div>
          </div>
          <div class="music-time-display" id="music-time-display">0:00 / 0:00</div>
        </div>
        <div class="music-lyrics-container" id="music-lyrics-container">
          <div class="music-lyric-current" id="music-lyric-current">♪</div>
          <div class="music-lyric-next" id="music-lyric-next"></div>
        </div>
        <div class="music-volume-container">
          <i class="fa-solid fa-volume-low"></i>
          <input type="range" class="music-volume-slider" id="music-volume-slider" min="0" max="100" value="85">
          <i class="fa-solid fa-volume-high"></i>
        </div>
        <div class="music-search-row">
          <input class="music-search-input" id="music-dock-search" type="text" placeholder="Search songs, albums, artists" spellcheck="false" autocomplete="off">
          <button class="music-search-close" id="music-search-back" type="button" aria-label="Back to player" style="display:none">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
        </div>
        <div class="music-search-status" id="music-dock-status">Search songs, albums, or artists.</div>
        <div class="music-search-results" id="music-dock-results"></div>
      </div>
    `

    dom.artwork = document.getElementById('music-dock-art')
    dom.placeholder = document.getElementById('music-dock-art-placeholder')
    dom.expandedArtwork = document.getElementById('music-expanded-art')
    dom.expandedPlaceholder = document.getElementById('music-expanded-art-placeholder')
    dom.titleClip = document.querySelector('.music-dock-title-clip')
    dom.titleMarquee = document.getElementById('music-dock-title-marquee')
    dom.titleText = document.getElementById('music-dock-title')
    dom.subtitle = document.getElementById('music-dock-subtitle')
    dom.panelTitle = document.getElementById('music-panel-title')
    dom.panelArtist = document.getElementById('music-panel-artist')
    dom.prevBtn = document.getElementById('music-dock-prev')
    dom.playBtn = document.getElementById('music-dock-play')
    dom.nextBtn = document.getElementById('music-dock-next')
    dom.panel = document.getElementById('music-dock-panel')
    dom.searchInput = document.getElementById('music-dock-search')
    dom.closeBtn = document.getElementById('music-dock-close')
    dom.status = document.getElementById('music-dock-status')
    dom.results = document.getElementById('music-dock-results')
    dom.mainButton = pill.querySelector('.music-dock-main')
    dom.progressBar = document.getElementById('music-progress-bar')
    dom.timeDisplay = document.getElementById('music-time-display')
    dom.lyricsContainer = document.getElementById('music-lyrics-container')
    dom.currentLyric = document.getElementById('music-lyric-current')
    dom.nextLyric = document.getElementById('music-lyric-next')
    dom.volumeSlider = document.getElementById('music-volume-slider')
    dom.searchToggle = document.getElementById('music-panel-search-toggle')
    dom.searchBack = document.getElementById('music-search-back')
    dom.panelPlayBtn = document.getElementById('music-panel-play')
    dom.panelPrevBtn = document.getElementById('music-panel-prev')
    dom.panelNextBtn = document.getElementById('music-panel-next')
    dom.dockProgressBar = document.querySelector('.music-dock-progress-bar')
  }

  function attachEvents() {
    dom.mainButton?.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      toggleSearchPanel()
      if (state.panelOpen && dom.searchInput) dom.searchInput.focus()
    })
    
    dom.searchToggle?.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      pill.classList.add('is-searching')
      if (dom.searchBack) dom.searchBack.style.display = 'flex'
      window.setTimeout(() => dom.searchInput?.focus(), 0)
    })
    
    dom.searchBack?.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      pill.classList.remove('is-searching')
      if (dom.searchBack) dom.searchBack.style.display = 'none'
    })

    dom.dockProgressBar?.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      seekTo(event)
    })

    dom.prevBtn?.addEventListener('click', async (event) => {
      event.preventDefault()
      event.stopPropagation()
      try {
        await prevTrack()
      } catch (error) {
        setBusy(false, error.message)
      }
    })
    
    dom.panelPrevBtn?.addEventListener('click', async (event) => {
      event.preventDefault()
      event.stopPropagation()
      try {
        await prevTrack()
      } catch (error) {
        setBusy(false, error.message)
      }
    })

    dom.playBtn?.addEventListener('click', async (event) => {
      event.preventDefault()
      event.stopPropagation()
      try {
        await togglePlay()
      } catch (error) {
        setBusy(false, error.message)
      }
    })
    
    dom.panelPlayBtn?.addEventListener('click', async (event) => {
      event.preventDefault()
      event.stopPropagation()
      try {
        await togglePlay()
      } catch (error) {
        setBusy(false, error.message)
      }
    })

    dom.nextBtn?.addEventListener('click', async (event) => {
      event.preventDefault()
      event.stopPropagation()
      try {
        await nextTrack()
      } catch (error) {
        setBusy(false, error.message)
      }
    })
    
    dom.panelNextBtn?.addEventListener('click', async (event) => {
      event.preventDefault()
      event.stopPropagation()
      try {
        await nextTrack()
      } catch (error) {
        setBusy(false, error.message)
      }
    })

    dom.closeBtn?.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      closeSearchPanel()
    })

    dom.searchInput?.addEventListener('input', (event) => {
      scheduleSearch(event.target.value)
    })

    dom.searchInput?.addEventListener('keydown', async (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        await runSearch(event.target.value)
      } else if (event.key === 'Escape') {
        closeSearchPanel()
      }
    })

    dom.results?.addEventListener('click', async (event) => {
      const button = event.target.closest('.music-search-item')
      if (!button) return
      const index = Number(button.dataset.index || 0)
      const track = state.searchResults[index] || state.searchResults.find((item) => String(item.id) === String(button.dataset.trackId))
      if (!track) return
      try {
        await playTrack(track, state.searchResults, index)
      } catch (error) {
        setBusy(false, error.message)
      }
    })

    document.addEventListener('click', (event) => {
      if (!state.panelOpen) return
      if (pill.contains(event.target)) return
      closeSearchPanel()
    })

    dom.volumeSlider?.addEventListener('input', (event) => {
      const volume = parseInt(event.target.value, 10) / 100
      state.audio.volume = volume
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
      if (state.currentTrack) dom.subtitle.textContent = `${getSubtitle(state.currentTrack)} · Buffering`
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

    dom.progressBar?.parentElement?.addEventListener('click', (event) => {
      if (!state.audio.duration) return
      const rect = event.currentTarget.getBoundingClientRect()
      const percent = (event.clientX - rect.left) / rect.width
      state.audio.currentTime = percent * state.audio.duration
    })
  }

  function init() {
    buildDom()
    attachEvents()
    renderNowPlaying(null, null)
    renderEmpty('Search for a song, album, or artist.')
    updatePlayButton()
    pill.classList.toggle('has-track', !!state.currentTrack)
    connectWebSocket()
    window.addEventListener('beforeunload', () => {
      try {
        if (state.ws) state.ws.close()
      } catch {}
    })
  }

  init()
})()
