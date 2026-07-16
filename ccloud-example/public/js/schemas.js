async function saveSchema() {
  const docName = document.getElementById('schema-doc-name').value;
  const schemaJson = document.getElementById('schema-json').value;

  if (!docName || !schemaJson) return showError('Please fill in all fields');

  let schema;
  try {
    schema = JSON.parse(schemaJson);
  } catch {
    return showError('Invalid JSON format');
  }

  showLoading(true);
  try {
    await authFetch('/schema/save', {
      method: 'POST',
      body: JSON.stringify({ documentName: docName, schema }),
    });
    showSuccess('Schema saved successfully');
    document.getElementById('schema-doc-name').value = '';
    document.getElementById('schema-json').value = '';
    loadSchemas();
  } catch (e) {
    showError(e.message);
  }
  showLoading(false);
}

async function loadSchemas() {
  showLoading(true);
  try {
    const response = await authFetch('/schema/list');
    const data = await response.json();
    const listEl = document.getElementById('schemas-list');

    if (data.schemas.length === 0) {
      listEl.innerHTML =
        '<div style="opacity: 0.6; text-align: center; padding: 40px"><i class="fa-solid fa-shield-halved" style="font-size: 24px; margin-bottom: 8px;"></i><p>No validation schemas active.</p></div>';
    } else {
      let html = '<div class="schemas-grid">';
      data.schemas.forEach((schema) => {
        const name = schema.name.split('/').pop();
        let fieldsCount = 0;
        try {
          fieldsCount = Object.keys(schema.fields || {}).length;
        } catch {
          /* ignore */
        }

        html += `
          <div class="schema-card glass">
            <div class="schema-card-header">
              <span class="schema-badge"><i class="fa-solid fa-shield-halved"></i> Active</span>
            </div>
            <div class="schema-card-body">
              <div class="schema-icon"><i class="fa-solid fa-table-list"></i></div>
              <div class="schema-name">${escapeHtml(name)}</div>
              <div class="schema-meta">${fieldsCount} field rule(s) defined</div>
            </div>
            <div class="schema-card-footer">
              <button class="btn-schema-delete" onclick="deleteSchema('${escapeAttr(name)}')"><i class="fa-solid fa-trash-can"></i> Remove Schema</button>
            </div>
          </div>
        `;
      });
      html += '</div>';
      listEl.innerHTML = html;
    }

    showSuccess(`Loaded ${data.schemas.length} schema rules.`);
  } catch (e) {
    showError(e.message);
  }
  showLoading(false);
}

async function deleteSchema(name) {
  if (!confirm(`Are you sure you want to delete schema for "${name}"?`)) return;

  showLoading(true);
  try {
    await authFetch('/schema/delete?name=' + encodeURIComponent(name), { method: 'DELETE' });
    showSuccess('Schema deleted successfully');
    loadSchemas();
  } catch (e) {
    showError(e.message);
  }
  showLoading(false);
}

Object.assign(window, {
  saveSchema,
  loadSchemas,
  deleteSchema,
});
