// Inject styles
const style = document.createElement('style');
style.innerHTML = `
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.85);
    padding: 18px 0;
    text-align: center;
    z-index: 999;
  }

  nav a {
    display: inline-block;
    margin: 0 16px;
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    position: relative;
    transition: color 0.2s ease;
  }

  nav a i {
    color: #96f3f5;
    margin-right: 6px;
  }

  nav a::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    left: 0;
    bottom: -4px;
    background: linear-gradient(to right, #00ffe5, #4bf9ed);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  nav a:hover {
    color: #96f3f5;
  }

  nav a:hover::after {
    transform: scaleX(1);
  }

  nav a.active {
    color: #00ffe5;
  }
`;
document.head.appendChild(style);

// Inject nav HTML
const navHTML = `
  <nav>
    <a href="main.html"><i class="fas fa-house"></i> Home</a>
    <a href="search.html"><i class="fas fa-magnifying-glass"></i> Search</a>
    <a href="games.html"><i class="fas fa-gamepad"></i> Games</a>
    <a href="apps.html"><i class="fas fa-th-large"></i> Apps</a>
    <a href="tools.html"><i class="fas fa-wrench"></i> Tools</a>
    <a href="transfer.html"><i class="fas fa-share"></i> Transfer</a>
    <a href="ai.html"><i class="fas fa-robot"></i> AI</a>
    <a href="partners.html"><i class="fas fa-handshake"></i> Partners</a>
  </nav>
`;
document.body.insertAdjacentHTML("afterbegin", navHTML);

// Highlight active link
const currentPage = location.pathname.split("/").pop();
document.querySelectorAll("nav a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});
