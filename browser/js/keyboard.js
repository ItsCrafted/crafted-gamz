const DOUBLE_KEY_SHORTCUT_INTERVAL = 300
const recentShortcutKeys = new Map()

function isTypingTarget(target) {
  return !!target && (
    target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT' || target.isContentEditable
  )
}

function handleDoubleKeyShortcut(key) {
  if (key === 't') { openNewTab(); return true }
  if (key === 'w') {
    const activeTab = chromeTabs.activeTabEl
    if (activeTab) chromeTabs.removeTab(activeTab)
    return true
  }
  return false
}

window.addEventListener('keydown', e => {
  const key = e.key.toLowerCase()
  if (e.ctrlKey && key === 't') { openNewTab(); e.preventDefault(); return }
  if (e.ctrlKey && key === 'w') {
    const activeTab = chromeTabs.activeTabEl
    if (activeTab) chromeTabs.removeTab(activeTab)
    e.preventDefault()
    return
  }
  if (key === 'f5' && pageFrame.style.display !== 'none') { pageFrame.src = pageFrame.src; return }
  if (e.repeat || e.ctrlKey || e.metaKey || e.altKey || isTypingTarget(e.target)) return
  const now = performance.now()
  const lastPressAt = recentShortcutKeys.get(key) || 0
  if (now - lastPressAt <= DOUBLE_KEY_SHORTCUT_INTERVAL) {
    recentShortcutKeys.delete(key)
    if (handleDoubleKeyShortcut(key)) e.preventDefault()
    return
  }
  recentShortcutKeys.set(key, now)
})

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') hideConnectionPopup()
})