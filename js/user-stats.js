(function (global) {
  const STATS_DOC = 'userCounts'
  const HEARTBEAT_MS = 60000
  const ONLINE_WINDOW_MS = 300000

  let ccloud = null
  let presenceUid = null
  let heartbeatId = null
  let visHandler = null
  let authBound = false

  function todayUTC() {
    return new Date().toISOString().slice(0, 10)
  }

  function monthUTC() {
    return new Date().toISOString().slice(0, 7)
  }

  function formatCount(n) {
    if (n == null || Number.isNaN(n)) return '—'
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    if (n >= 10000) return Math.round(n / 1000) + 'K'
    return String(n)
  }

  async function recordNewUser(ccloudClient) {
    if (!ccloudClient) return
    try {
      const ref = `stats/${STATS_DOC}`
      const todayDate = todayUTC()
      const monthKey = monthUTC()

      const existing = await ccloudClient.getData(ref).catch(() => null)
      const data = existing || {}

      const updated = {
        allTime: (data.allTime || 0) + 1,
        today: data.todayDate === todayDate ? (data.today || 0) + 1 : 1,
        todayDate,
        month: data.monthKey === monthKey ? (data.month || 0) + 1 : 1,
        monthKey,
        updatedAt: new Date().toISOString()
      }

      await ccloudClient.setData(ref, updated)
    } catch (e) {
      console.warn('[UserStats] recordNewUser failed:', e)
    }
  }

  function currentPage() {
    try {
      return (location.pathname + location.search).slice(0, 500)
    } catch {
      return '/'
    }
  }

  async function startPresence(ccloudClient, uid) {
    if (!uid || presenceUid === uid) return
    stopPresence()

    ccloud = ccloudClient
    presenceUid = uid
    const ref = `presence/${uid}/online`

    const ping = async () => {
      try {
        await ccloud.setData(ref, {
          timestamp: Date.now(),
          page: currentPage()
        })
      } catch (e) {
        console.warn('[UserStats] Presence ping failed:', e)
      }
    }

    await ping()
    heartbeatId = setInterval(ping, HEARTBEAT_MS)

    visHandler = () => {
      if (!document.hidden) ping()
    }
    document.addEventListener('visibilitychange', visHandler)
  }

  function stopPresence() {
    if (heartbeatId) {
      clearInterval(heartbeatId)
      heartbeatId = null
    }
    if (visHandler) {
      document.removeEventListener('visibilitychange', visHandler)
      visHandler = null
    }
    presenceUid = null
  }

  function bindCCloud(ccloudClient) {
    if (authBound) return
    authBound = true
    
    const user = ccloudClient.getCurrentUser()
    if (user) {
      startPresence(ccloudClient, user.uid)
    }
  }

  function subscribeUserCounts(ccloudClient, onUpdate) {
    // Polling fallback since cCloud doesn't have real-time subscriptions
    const pollInterval = setInterval(async () => {
      try {
        const data = await ccloudClient.getData(`stats/${STATS_DOC}`).catch(() => ({}))
        onUpdate({
          allTime: data.allTime || 0,
          today: data.todayDate === todayUTC() ? (data.today || 0) : 0,
          month: data.monthKey === monthUTC() ? (data.month || 0) : 0
        })
      } catch (e) {
        console.warn('[UserStats] subscribeUserCounts failed:', e)
        onUpdate({ allTime: 0, today: 0, month: 0 })
      }
    }, 30000)

    return () => clearInterval(pollInterval)
  }

  function subscribeOnlineCount(ccloudClient, onUpdate) {
    // Polling fallback - fetch all presence docs
    const pollInterval = setInterval(async () => {
      try {
        const data = await ccloudClient.getData('presence').catch(() => ({}))
        if (!data || typeof data !== 'object') {
          onUpdate(0)
          return
        }

        const now = Date.now()
        let count = 0
        for (const uid in data) {
          const userPresence = data[uid]
          if (userPresence && userPresence.online && typeof userPresence.online.timestamp === 'number') {
            if (userPresence.online.timestamp >= now - ONLINE_WINDOW_MS) {
              count++
            }
          }
        }
        onUpdate(count)
      } catch (e) {
        console.warn('[UserStats] subscribeOnlineCount failed:', e)
        onUpdate(0)
      }
    }, 30000)

    return () => clearInterval(pollInterval)
  }

  global.UserStats = {
    recordNewUser,
    bindCCloud,
    startPresence,
    stopPresence,
    subscribeUserCounts,
    subscribeOnlineCount,
    formatCount
  }
})(window)
