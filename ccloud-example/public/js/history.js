async function loadHistory() {
  const path = document.getElementById('history-path').value;
  showLoading(true);
  try {
    const user = App.ccloud.getCurrentUser();
    let url = App.workerUrl + '/data/history';
    if (path) {
      url += '?path=' + encodeURIComponent('users/' + user.uid + '/data/' + path);
    }

    const idToken = await App.ccloud.getToken();
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + idToken },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to load history');
    }

    const data = await response.json();
    const resultsEl = document.getElementById('history-results');

    if (data.history.length === 0) {
      resultsEl.innerHTML =
        '<div style="opacity: 0.6; text-align: center; padding: 40px"><i class="fa-solid fa-timeline" style="font-size: 24px; margin-bottom: 8px;"></i><p>No changes audit logs recorded yet.</p></div>';
    } else {
      let html = '<div class="timeline">';
      data.history.forEach((entry) => {
        const timestamp = entry.fields.timestamp?.stringValue || 'Unknown';
        const docPath = entry.fields.documentPath?.stringValue || 'Unknown';
        const filename = docPath.split('/').pop();
        const historyId = entry.name.split('/').pop();

        const fields = entry.fields;
        let changeSummary = 'Document modified';
        if (fields.oldData && fields.newData) {
          try {
            const oldSize = JSON.stringify(fields.oldData).length;
            const newSize = JSON.stringify(fields.newData).length;
            const sizeDiff = newSize - oldSize;
            const sign = sizeDiff >= 0 ? '+' : '';
            changeSummary = `Payload size change: ${sign}${sizeDiff} bytes`;
          } catch {
            /* keep default summary */
          }
        }

        html += `
          <div class="timeline-item glass">
            <div class="timeline-badge"><i class="fa-solid fa-clock-rotate-left"></i></div>
            <div class="timeline-content">
              <div class="timeline-header">
                <span class="timeline-title">${escapeHtml(filename)}</span>
                <span class="timeline-time"><i class="fa-solid fa-clock"></i> ${escapeHtml(new Date(timestamp).toLocaleString())}</span>
              </div>
              <div class="timeline-body">
                <p style="font-size: 13.5px; opacity: 0.9;">${escapeHtml(changeSummary)}</p>
                <small class="timeline-meta">Audit ID: ${escapeHtml(historyId)}</small>
              </div>
              <div class="timeline-actions">
                <button class="btn-timeline-rollback" onclick="rollbackData('${escapeAttr(historyId)}')"><i class="fa-solid fa-rotate-left"></i> Rollback State</button>
              </div>
            </div>
          </div>
        `;
      });
      html += '</div>';
      resultsEl.innerHTML = html;
    }

    showSuccess(`Loaded ${data.count} audit events.`);
  } catch (e) {
    showError(e.message);
  }
  showLoading(false);
}

async function rollbackData(historyId) {
  if (!confirm('Are you sure you want to rollback to this version? This will replace the current data.')) return;

  showLoading(true);
  try {
    const response = await authFetch('/data/rollback', {
      method: 'POST',
      body: JSON.stringify({ historyId }),
    });
    const data = await response.json();
    showSuccess(data.message || 'Rollback successful');
    loadFileTree();
  } catch (e) {
    showError(e.message);
  }
  showLoading(false);
}

Object.assign(window, {
  loadHistory,
  rollbackData,
});
