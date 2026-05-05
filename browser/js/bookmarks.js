const Bookmarks = (() => {
  const LS_KEY = 'cg_bookmarks'

  function load() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || [] } catch { return [] }
  }

  function save(list) {
    localStorage.setItem(LS_KEY, JSON.stringify(list))
  }

  function getAll() { return load() }

  function find(url) { return load().find(b => b.url === url) }

  function add(bookmark) {
    const list = load().filter(b => b.url !== bookmark.url)
    list.push(bookmark)
    save(list)
  }

  function remove(url) {
    save(load().filter(b => b.url !== url))
  }

  function rename(url, newTitle) {
    save(load().map(b => b.url === url ? { ...b, title: newTitle } : b))
  }

  function isBookmarked(url) { return !!find(url) }

  async function fetchAndCacheFavicon(url, force = false) {
    const existing = find(url)
    if (!existing) return
    if (!force && existing.favicon && existing.favicon.startsWith('data:')) return

    const faviconUrl = `https://www.google.com/s2/favicons?sz=32&domain_url=${encodeURIComponent(url)}`
    try {
      const proxyUrl = (typeof __uv$config !== 'undefined')
        ? __uv$config.prefix + __uv$config.encodeUrl(faviconUrl)
        : faviconUrl
      const res = await fetch(proxyUrl)
      if (!res.ok) return
      const blob = await res.blob()
      const b64 = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
      const current = find(url)
      if (current) {
        current.favicon = b64
        save(load().map(b => b.url === url ? current : b))
        renderBookmarksBar()
      }
    } catch (e) {
      console.warn('Favicon fetch failed:', e)
    }
  }

  function refreshFavicon(url) {
    return fetchAndCacheFavicon(url, true)
  }

  return { getAll, find, add, remove, rename, isBookmarked, fetchAndCacheFavicon, refreshFavicon }
})()