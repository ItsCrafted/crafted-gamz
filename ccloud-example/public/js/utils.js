let alertTimeout;

function parseFirestoreValue(value) {
  if (value == null || typeof value !== 'object') return value;
  if ('stringValue' in value) return value.stringValue;
  if ('integerValue' in value) return parseInt(value.integerValue, 10);
  if ('doubleValue' in value) return value.doubleValue;
  if ('booleanValue' in value) return value.booleanValue;
  if ('nullValue' in value) return null;
  if ('timestampValue' in value) return value.timestampValue;
  if ('arrayValue' in value) return (value.arrayValue.values || []).map(parseFirestoreValue);
  if ('mapValue' in value) {
    const obj = {};
    for (const [key, val] of Object.entries(value.mapValue.fields || {})) {
      obj[key] = parseFirestoreValue(val);
    }
    return obj;
  }
  return value;
}

function parseFirestoreDocument(doc) {
  if (!doc || typeof doc !== 'object') return doc;
  if (doc.fields) {
    const result = {};
    for (const [key, val] of Object.entries(doc.fields)) {
      result[key] = parseFirestoreValue(val);
    }
    return result;
  }
  return doc;
}

function getUserDataPath(name = '') {
  const user = App.ccloud.getCurrentUser();
  if (!user) return '';
  const base = 'users/' + user.uid + '/data';
  return name ? base + '/' + name : base;
}

function showError(msg) {
  clearTimeout(alertTimeout);
  const el = document.getElementById('error-message');
  document.getElementById('error-text').textContent = msg;
  el.classList.remove('hidden');
  alertTimeout = setTimeout(() => el.classList.add('hidden'), 5000);
}

function showSuccess(msg) {
  clearTimeout(alertTimeout);
  const el = document.getElementById('success-message');
  document.getElementById('success-text').textContent = msg;
  el.classList.remove('hidden');
  alertTimeout = setTimeout(() => el.classList.add('hidden'), 5000);
}

function showLoading(show) {
  const el = document.getElementById('loading');
  if (show) el.classList.remove('hidden');
  else el.classList.add('hidden');
}

async function authFetch(path, options = {}) {
  const idToken = await App.ccloud.getToken();
  const response = await fetch(App.workerUrl + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + idToken,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Request failed');
  }

  return response;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

Object.assign(window, {
  parseFirestoreValue,
  parseFirestoreDocument,
  getUserDataPath,
  showError,
  showSuccess,
  showLoading,
  authFetch,
  escapeHtml,
  escapeAttr,
});
