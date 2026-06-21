window.addEventListener('message', event => {
  if (event.data && event.data.type === 'cg_navigate') {
    window.location.href = event.data.url
  }
})