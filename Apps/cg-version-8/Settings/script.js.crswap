const themeSelect = document.getElementById("theme");
const saveBtn = document.getElementById("saveBtn");
const goback = document.getElementById("goback");
const overlay = document.getElementById("overlay");
const themeText = document.getElementById("themeText");


// Define your additional themes here (add more if needed)
const themes = {
    light: "Light Theme",
    dark: "Dark Theme",
    sunset: "Sunset",
    nuclear: "Nuclear",
    sky: "Sky",
    ocean: "Ocean",
    poison: "Poison",
    // Add more themes like this:
    // myTheme: "My Custom Theme"
};


// Load saved theme from localStorage on page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);
}


saveBtn.addEventListener("click", function () {
    const selectedTheme = themeSelect.value;
    localStorage.setItem("theme", selectedTheme); // Save theme in localStorage
    applyTheme(selectedTheme);
});

goback.addEventListener("click", function () {
    window.location.href = "../gameloader.html";
});

overlay.addEventListener("click", function () {
    window.location.href = "../index.html";
});


function applyTheme(theme) {
    document.body.className = theme;
    themeText.textContent = themes[theme] || "Unknown Theme";
}
