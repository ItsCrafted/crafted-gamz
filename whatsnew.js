document.addEventListener("DOMContentLoaded", () => {
  const key = "cg_v13_seen";
  const cutoff = new Date("2025-10-30T23:59:59");
  const now = new Date();

  if (now <= cutoff && !localStorage.getItem(key)) {
    localStorage.setItem(key, "1");
    window.location.href = "whatsnew.html";
  }
});
