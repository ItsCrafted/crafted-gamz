const tabsEl = document.getElementById('tabs-el')
const chromeTabs = new ChromeTabs()
chromeTabs.init(tabsEl)

document.getElementById('newtab-btn').addEventListener('click', () => openNewTab())

document.getElementById('newtab-search').addEventListener('keydown', e => {
  if (e.key === 'Enter') navigate(e.target.value)
})

document.querySelectorAll('.url-shortcut-btn').forEach(btn => {
  btn.addEventListener('click', () => navigate(btn.dataset.localUri))
})

initProxyStack()
ensureTabHistory(getActiveTab())
showNewTabPage()
document.addEventListener('DOMContentLoaded', () => {
  renderPins()
  setTimeout(() => Pins.seedFavicons(), 1200)
})