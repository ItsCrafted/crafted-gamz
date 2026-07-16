async function updateAccount() {
  const displayName = document.getElementById('update-displayname').value;
  const email = document.getElementById('update-email').value;

  if (!displayName && !email) return showError('Please enter a display name or email to update');

  showLoading(true);
  try {
    const response = await authFetch('/account/update', {
      method: 'POST',
      body: JSON.stringify({ displayName, email }),
    });
    const data = await response.json();
    showSuccess(data.message || 'Account updated successfully!');

    if (displayName) {
      document.getElementById('user-name').textContent = displayName;
      document.getElementById('update-displayname').value = '';
    }
  } catch (e) {
    showError(e.message);
  }
  showLoading(false);
}

async function exportData() {
  showLoading(true);
  try {
    const user = App.ccloud.getCurrentUser();
    const idToken = await App.ccloud.getToken();
    const response = await fetch(App.workerUrl + '/account/export', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + idToken },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to export data');
    }

    const data = await response.json();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ccloud-export-${user.uid}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showSuccess('Data exported successfully!');
  } catch (e) {
    showError(e.message);
  }
  showLoading(false);
}

async function importData(input) {
  const file = input.files[0];
  if (!file) return;

  showLoading(true);
  try {
    const text = await file.text();
    const payload = JSON.parse(text);
    const response = await authFetch('/account/import', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    showSuccess(`Imported ${result.importedCount} of ${result.total} documents. ${result.errors.length} errors.`);
    if (result.errors.length > 0) {
      console.error('Import errors:', result.errors);
    }
    loadFileTree();
  } catch (e) {
    showError(e.message);
  }
  showLoading(false);
  input.value = '';
}

Object.assign(window, {
  updateAccount,
  exportData,
  importData,
});
