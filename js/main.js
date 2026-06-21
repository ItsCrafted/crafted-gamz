const tabsEl = document.getElementById('tabs-el')
const chromeTabs = new ChromeTabs()
chromeTabs.init(tabsEl)

document.getElementById('newtab-btn').addEventListener('click', () => openNewTab())

document.getElementById('newtab-search').addEventListener('keydown', e => {
  if (e.key === 'Enter') navigate(e.target.value)
})

document.querySelectorAll('.url-shortcut-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.localUri === 'cg://music' && window.MusicDock) {
      window.MusicDock.open('search')
      return
    }
    navigate(btn.dataset.localUri)
  })
})

ensureTabHistory(getActiveTab())
showNewTabPage()

renderPins()
setTimeout(() => Pins.seedFavicons(), 1200)

const tip = document.getElementById('newtab-tip')
const tipClose = document.getElementById('newtab-tip-close')
const loadingTip = document.getElementById('page-loading-tip')

const tipDismissed = !!localStorage.getItem('cg_tip_dismissed')

if (tipDismissed) {
  if (tip) tip.style.display = 'none'
}

if (tipClose) {
  tipClose.addEventListener('click', () => {
    tip.style.opacity = '0'
    setTimeout(() => { tip.style.display = 'none' }, 300)
    localStorage.setItem('cg_tip_dismissed', '1')
  })
}

const _origNavigate = navigate
window.navigate = function(url) {
  if (tip && url && url !== 'newtab' && !url.startsWith('cg://')) {
    tip.style.opacity = '0'
    setTimeout(() => { tip.style.display = 'none' }, 300)
  }
  return _origNavigate.apply(this, arguments)
}