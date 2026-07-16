/**
 * cCloud Client SDK
 * Embed this script to enable "Sign in with cCloud" functionality
 * No Firebase config required - all auth handled server-side
 */

class CCloud {
  constructor(config) {
    this.config = config;
    this.currentUser = null;
    this.token = null;
  }

  /**
   * Initialize (no Firebase config needed)
   */
  async init() {
    // Check for existing session in localStorage
    const savedSession = localStorage.getItem('ccloud_session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        this.currentUser = session.user;
        this.token = session.token;
      } catch (e) {
        localStorage.removeItem('ccloud_session');
      }
    }
  }

  /**
   * Save session to localStorage
   */
  saveSession(remember = false) {
    if (remember && this.currentUser && this.token) {
      localStorage.setItem('ccloud_session', JSON.stringify({
        user: this.currentUser,
        token: this.token
      }));
    }
  }

  /**
   * Clear session from localStorage
   */
  clearSession() {
    localStorage.removeItem('ccloud_session');
  }

  /**
   * Sign in with email/password (server-side)
   */
  async signInWithEmail(email, password, remember = false) {
    const response = await fetch(`${this.config.workerUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Email authentication failed');
    }

    const data = await response.json();
    this.currentUser = {
      uid: data.uid,
      email: data.email,
      displayName: data.displayName
    };
    this.token = data.token;
    this.saveSession(remember);
    return data;
  }

  /**
   * Register new user with email/password (server-side)
   */
  async registerWithEmail(email, password, displayName, remember = false) {
    const response = await fetch(`${this.config.workerUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, displayName }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Registration failed');
    }

    const data = await response.json();
    this.currentUser = {
      uid: data.uid,
      email: data.email,
      displayName: data.displayName
    };
    this.token = data.token;
    this.saveSession(remember);
    return data;
  }

  /**
   * Sign out
   */
  async signOut() {
    this.currentUser = null;
    this.token = null;
    this.clearSession();
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Get current token
   */
  async getToken() {
    return this.token;
  }

  /**
   * Get data from Firestore
   */
  async getData(path) {
    if (!this.token) {
      throw new Error('No user logged in');
    }

    const response = await fetch(`${this.config.workerUrl}/data/${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get data');
    }

    const result = await response.json();
    return result.data;
  }

  /**
   * Set data in Firestore
   */
  async setData(path, data) {
    if (!this.token) {
      throw new Error('No user logged in');
    }

    const response = await fetch(`${this.config.workerUrl}/data/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to set data');
    }
  }

  /**
   * Update data in Firestore
   */
  async updateData(path, data) {
    if (!this.token) {
      throw new Error('No user logged in');
    }

    const response = await fetch(`${this.config.workerUrl}/data/${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update data');
    }
  }

  /**
   * Delete data from Firestore
   */
  async deleteData(path) {
    if (!this.token) {
      throw new Error('No user logged in');
    }

    const response = await fetch(`${this.config.workerUrl}/data/${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete data');
    }
  }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CCloud;
}

// Also expose globally for script tag usage
if (typeof window !== 'undefined') {
  window.CCloud = CCloud;
}
