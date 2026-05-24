function applyTheme(theme) {
    document.body.className = theme;
  }
  
  // Load saved theme from localStorage on page load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  }
  