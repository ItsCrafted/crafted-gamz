/**
 * cCloud Client for Crafted Gamz
 * Replaces Firebase with cCloud (https://cloud.craftedgamz.com)
 * Handles authentication and data sync with offline-first support
 */

class CCloudClient {
  constructor(config = {}) {
    this.workerUrl = config.workerUrl || 'https://cloud.craftedgamz.com'
    this.currentUser = null
    this.token = null
    this.syncEnabled = false
    this.offline = false
    this.pendingOps = []
    this.localData = {}
    
    this._init()
  }

  /**
   * Initialize - restore session and listen to online/offline
   */
  async _init() {
    try {
      const savedSession = localStorage.getItem('ccloud_session')
      if (savedSession) {
        const session = JSON.parse(savedSession)
        this.currentUser = session.user
        this.token = session.token
        console.log('[cCloud] Session restored for:', this.currentUser.email)
      }
    } catch (e) {
      localStorage.removeItem('ccloud_session')
      console.warn('[cCloud] Session restore failed:', e)
    }

    window.addEventListener('online', () => this._handleOnline())
    window.addEventListener('offline', () => this._handleOffline())
    this.offline = !navigator.onLine
  }

  /**
   * Save session to localStorage
   */
  _saveSession(remember = false) {
    if (remember && this.currentUser && this.token) {
      localStorage.setItem('ccloud_session', JSON.stringify({
        user: this.currentUser,
        token: this.token
      }))
    }
  }

  /**
   * Clear session
   */
  _clearSession() {
    localStorage.removeItem('ccloud_session')
    this.currentUser = null
    this.token = null
  }

  /**
   * Handle going online - sync pending ops
   */
  async _handleOnline() {
    this.offline = false
    console.log('[cCloud] Back online, syncing pending ops...')
    await this._syncPending()
  }

  /**
   * Handle going offline
   */
  _handleOffline() {
    this.offline = true
    console.log('[cCloud] Offline mode enabled')
  }

  /**
   * Queue operation for offline/retry handling
   */
  _queueOp(type, path, data) {
    this.pendingOps.push({
      type,
      path,
      data,
      timestamp: Date.now(),
      retries: 0
    })
    localStorage.setItem('ccloud_pending_ops', JSON.stringify(this.pendingOps))
  }

  /**
   * Sync pending operations
   */
  async _syncPending() {
    if (!this.token || this.pendingOps.length === 0) return

    const ops = [...this.pendingOps]
    for (const op of ops) {
      try {
        if (op.type === 'set') {
          await this.setData(op.path, op.data)
        } else if (op.type === 'update') {
          await this.updateData(op.path, op.data)
        } else if (op.type === 'delete') {
          await this.deleteData(op.path)
        }
        this.pendingOps = this.pendingOps.filter(p => p !== op)
      } catch (e) {
        op.retries++
        if (op.retries > 3) {
          this.pendingOps = this.pendingOps.filter(p => p !== op)
          console.error('[cCloud] Op failed after retries:', op)
        }
      }
    }
    localStorage.setItem('ccloud_pending_ops', JSON.stringify(this.pendingOps))
  }

  /**
   * Sign up with email
   */
  async registerWithEmail(email, password, displayName, remember = false) {
    try {
      const response = await fetch(`${this.workerUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Registration failed')
      }

      const data = await response.json()
      this.currentUser = {
        uid: data.uid,
        email: data.email,
        displayName: data.displayName
      }
      this.token = data.token
      this._saveSession(remember)
      return data
    } catch (e) {
      console.error('[cCloud] Registration failed:', e)
      throw e
    }
  }

  /**
   * Sign in with email/password
   */
  async signInWithEmail(email, password, remember = false) {
    try {
      const response = await fetch(`${this.workerUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Sign in failed')
      }

      const data = await response.json()
      this.currentUser = {
        uid: data.uid,
        email: data.email,
        displayName: data.displayName
      }
      this.token = data.token
      this._saveSession(remember)
      return data
    } catch (e) {
      console.error('[cCloud] Sign in failed:', e)
      throw e
    }
  }

  /**
   * Sign out
   */
  async signOut() {
    this.currentUser = null
    this.token = null
    this.syncEnabled = false
    this._clearSession()
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    return this.currentUser
  }

  /**
   * Get current token
   */
  getToken() {
    return this.token
  }

  /**
   * Get data from cCloud
   */
  async getData(path) {
    if (!this.token) {
      throw new Error('No user logged in')
    }

    // Return cached offline data if available
    const cacheKey = `ccloud_data_${path}`
    
    if (this.offline) {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        try {
          return JSON.parse(cached).data
        } catch (e) {
          console.warn('[cCloud] Cache parse failed:', e)
        }
      }
      throw new Error('Offline and no cached data available')
    }

    try {
      const response = await fetch(`${this.workerUrl}/data/${path}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })

      if (!response.ok) {
        if (response.status === 404 || response.status === 500) {
          return null
        }
        throw new Error('Failed to get data')
      }

      const result = await response.json()
      // Cache the data
      localStorage.setItem(cacheKey, JSON.stringify(result))
      return result.data
    } catch (e) {
      console.warn('[cCloud] getData failed:', e)
      // Try cached version
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        try {
          return JSON.parse(cached).data
        } catch {}
      }
      throw e
    }
  }

  /**
   * Set data in cCloud
   */
  async setData(path, data) {
    if (!this.token) {
      throw new Error('No user logged in')
    }

    // Cache locally first
    const cacheKey = `ccloud_data_${path}`
    localStorage.setItem(cacheKey, JSON.stringify({ data }))

    if (this.offline) {
      this._queueOp('set', path, data)
      return
    }

    try {
      const response = await fetch(`${this.workerUrl}/data/${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to set data')
      }
    } catch (e) {
      console.warn('[cCloud] setData failed, queuing:', e)
      this._queueOp('set', path, data)
      throw e
    }
  }

  /**
   * Update data in cCloud
   */
  async updateData(path, data) {
    if (!this.token) {
      throw new Error('No user logged in')
    }

    // Get existing data and merge
    const cacheKey = `ccloud_data_${path}`
    try {
      const existing = await this.getData(path)
      const merged = { ...existing, ...data }
      localStorage.setItem(cacheKey, JSON.stringify({ data: merged }))
    } catch {
      // If get fails, just use the new data
      localStorage.setItem(cacheKey, JSON.stringify({ data }))
    }

    if (this.offline) {
      this._queueOp('update', path, data)
      return
    }

    try {
      const response = await fetch(`${this.workerUrl}/data/${path}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to update data')
      }
    } catch (e) {
      console.warn('[cCloud] updateData failed, queuing:', e)
      this._queueOp('update', path, data)
      throw e
    }
  }

  /**
   * Delete data from cCloud
   */
  async deleteData(path) {
    if (!this.token) {
      throw new Error('No user logged in')
    }

    // Remove from cache
    const cacheKey = `ccloud_data_${path}`
    localStorage.removeItem(cacheKey)

    if (this.offline) {
      this._queueOp('delete', path, null)
      return
    }

    try {
      const response = await fetch(`${this.workerUrl}/data/${path}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete data')
      }
    } catch (e) {
      console.warn('[cCloud] deleteData failed, queuing:', e)
      this._queueOp('delete', path, null)
      throw e
    }
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CCloudClient
}

// Expose globally
if (typeof window !== 'undefined') {
  window.CCloudClient = CCloudClient
}
