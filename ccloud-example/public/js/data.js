function parseInputValue(value) {
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;
  if (!isNaN(value) && value.trim() !== '') return Number(value);
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

async function saveData() {
  const user = App.ccloud.getCurrentUser();
  const basePath = 'users/' + user.uid + '/data/';
  const path = document.getElementById('data-path').value;
  const key = document.getElementById('data-key').value;
  const value = document.getElementById('data-value').value;

  if (!path || !key || !value) return showError('Please fill in all fields');
  showLoading(true);
  try {
    await App.ccloud.setData(basePath + path, { [key]: parseInputValue(value) });
    showSuccess('Data committed successfully!');
    document.getElementById('data-key').value = '';
    document.getElementById('data-value').value = '';
    loadFileTree();
  } catch (e) {
    showError(e.message);
  }
  showLoading(false);
}

async function getData() {
  const path = document.getElementById('get-path').value;
  if (!path) return showError('Please enter a document path');

  showLoading(true);
  try {
    const raw = await App.ccloud.getData(getUserDataPath(path));
    const data = parseFirestoreDocument(raw);
    const el = document.getElementById('data-result');
    el.innerHTML = `<h5 style="margin: 14px 0 8px; font-size: 13px; text-transform: uppercase; color: var(--text-secondary);">Query Response</h5><pre>${escapeHtml(JSON.stringify(data, null, 2))}</pre>`;
    el.style.display = 'block';
    showSuccess('Query completed.');
  } catch (e) {
    showError(e.message);
    document.getElementById('data-result').style.display = 'none';
  }
  showLoading(false);
}

async function searchData() {
  const query = document.getElementById('search-query').value;
  if (!query) return showError('Please enter a search query');

  showLoading(true);
  try {
    const response = await authFetch('/data/search?q=' + encodeURIComponent(query));
    const data = await response.json();
    const resultsEl = document.getElementById('search-results');

    if (data.results.length === 0) {
      resultsEl.innerHTML =
        '<div style="opacity: 0.6; text-align: center; padding: 40px"><i class="fa-solid fa-folder-open" style="font-size: 24px; margin-bottom: 8px;"></i><p>No results matching keyword</p></div>';
    } else {
      let html = '<div class="files-grid">';
      data.results.forEach((result) => {
        const name = result.name;
        const safeName = escapeAttr(name);
        html += `
          <div class="file-card glass" onclick="viewFile('${safeName}')">
            <div class="file-card-header">
              <span class="file-badge found"><i class="fa-solid fa-check"></i> Found</span>
            </div>
            <div class="file-card-body">
              <div class="file-icon"><i class="fa-solid fa-file-invoice"></i></div>
              <div class="file-name" title="${escapeHtml(name)}">${escapeHtml(name)}</div>
            </div>
            <div class="file-card-footer">
              <button class="card-btn" style="width: 100%"><i class="fa-solid fa-eye"></i> View details</button>
            </div>
          </div>
        `;
      });
      html += '</div>';
      resultsEl.innerHTML = html;
    }

    showSuccess(`Found ${data.count} result(s).`);
  } catch (e) {
    showError(e.message);
  }
  showLoading(false);
}

Object.assign(window, {
  saveData,
  getData,
  searchData,
});
