document.addEventListener('DOMContentLoaded', async () => {
      await new Promise(r => setTimeout(r, 0))
      await preloadWispConnection()
      await initProxyStack()
      const frame = document.getElementById('proxy-frame')
      frame.src = getProxyUrl('https://monochrome.tf/')
    })