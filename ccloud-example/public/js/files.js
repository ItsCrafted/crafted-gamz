const EMPTY_FILES_HTML =
  '<div style="opacity: 0.6; text-align: center; padding: 40px"><i class="fa-solid fa-folder-open" style="font-size: 32px; margin-bottom: 12px;"></i><p>No documents yet. Set your first document in Database Editor!</p></div>';

async function loadFileTree() {
  const user = App.ccloud.getCurrentUser();
  if (!user) return;

  const basePath = 'users/' + user.uid + '/data';
  const treeEl = document.getElementById('file-tree');
  treeEl.innerHTML =
    '<div style="opacity: 0.6; text-align: center; padding: 40px"><div class="spinner" style="margin: 0 auto 16px;"></div>Loading files...</div>';

  try {
    const idToken = await App.ccloud.getToken();
    const url = App.workerUrl + '/data/' + basePath + '?mask.fieldPaths=__name__';
    const response = await fetch(url, { headers: { Authorization: 'Bearer ' + idToken } });

    if (!response.ok) {
      treeEl.innerHTML = EMPTY_FILES_HTML;
      return;
    }

    const result = await response.json();
    const firestoreData = result.data || result;

    if (!firestoreData.documents || firestoreData.documents.length === 0) {
      treeEl.innerHTML = EMPTY_FILES_HTML;
      return;
    }

    let html = '<div class="files-grid">';
    firestoreData.documents.forEach((doc) => {
      const name = doc.name.split('/').pop();
      const safeName = escapeAttr(name);
      html += `
        <div class="file-card glass">
          <div class="file-card-header">
            <input type="checkbox" class="file-checkbox" value="${escapeAttr(name)}" onchange="updateBulkActionState()">
            <span class="file-badge"><i class="fa-solid fa-code"></i> JSON</span>
          </div>
          <div class="file-card-body" onclick="viewFile('${safeName}')">
            <div class="file-icon"><i class="fa-solid fa-file-invoice"></i></div>
            <div class="file-name" title="${escapeHtml(name)}">${escapeHtml(name)}</div>
          </div>
          <div class="file-card-footer">
            <button class="card-btn" onclick="viewFile('${safeName}')" title="Edit Data"><i class="fa-solid fa-eye"></i> View</button>
            <button class="card-btn delete" onclick="deleteSingleFile('${safeName}')" title="Delete"><i class="fa-solid fa-trash-can"></i> Delete</button>
          </div>
        </div>
      `;
    });
    html += '</div>';
    treeEl.innerHTML = html;
    updateBulkActionState();
  } catch (e) {
    treeEl.innerHTML =
      '<div style="opacity: 0.6; text-align: center; padding: 40px">Error loading files: ' + escapeHtml(e.message) + '</div>';
  }
}

async function viewFile(name) {
  showLoading(true);
  try {
    const raw = await App.ccloud.getData(getUserDataPath(name));
    const data = parseFirestoreDocument(raw);

    document.getElementById('file-viewer').classList.remove('hidden');
    document.getElementById('file-viewer-name').textContent = name;

    let type = 'Object (JSON)';
    if (typeof data === 'string') type = 'String';
    else if (typeof data === 'number') type = 'Number';
    else if (typeof data === 'boolean') type = 'Boolean';
    else if (Array.isArray(data)) type = 'Array';
    else if (data === null) type = 'Null';

    document.getElementById('file-viewer-type').textContent = type;

    const size = JSON.stringify(data).length;
    document.getElementById('file-viewer-size').textContent = size + ' bytes';
    document.getElementById('file-viewer-contents').textContent = JSON.stringify(data, null, 2);

    document.getElementById('file-viewer').scrollIntoView({ behavior: 'smooth' });
    showSuccess('File details loaded.');
  } catch (e) {
    showError(e.message);
  }
  showLoading(false);
}

async function deleteSingleFile(name) {
  if (!confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) return;
  showLoading(true);
  try {
    await authFetch('/data/bulk', {
      method: 'POST',
      body: JSON.stringify({ operation: 'delete', paths: [name] }),
    });
    showSuccess(`Deleted "${name}" successfully`);
    loadFileTree();
  } catch (e) {
    showError(e.message);
  }
  showLoading(false);
}

async function bulkDeleteSelected() {
  const checkboxes = document.querySelectorAll('.file-checkbox:checked');
  if (checkboxes.length === 0) return showError('Please select files to delete');

  if (!confirm(`Are you sure you want to delete ${checkboxes.length} file(s)? This cannot be undone.`)) return;

  const paths = Array.from(checkboxes).map((cb) => cb.value);
  showLoading(true);
  try {
    const response = await authFetch('/data/bulk', {
      method: 'POST',
      body: JSON.stringify({ operation: 'delete', paths }),
    });
    const data = await response.json();
    showSuccess(`Deleted ${data.successCount} of ${data.total} files`);
    if (data.errors.length > 0) {
      console.error('Delete errors:', data.errors);
    }
    loadFileTree();
  } catch (e) {
    showError(e.message);
  }
  showLoading(false);
}

Object.assign(window, {
  loadFileTree,
  viewFile,
  deleteSingleFile,
  bulkDeleteSelected,
});
