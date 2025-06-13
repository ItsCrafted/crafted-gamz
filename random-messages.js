const messages = [
  "Built with Crafted care",
  "Still unblockable. Still Crafted.",
  "You found the good stuff",
  "Im in your walls",
  "Yeah chat im done.",
  "Arsen 🔥🔥🔥",
  "Chat GPT carrys this shi hard",
  "God help me",
  "Ok StudentVue, if you insist",
  "Dont threaten me with a good time",
  "Got-To-Go-Guardian",
  "78",
  "26",
  "LXXVIII",
  "1535 Columbia",
  "Pulling up chat",
  "Came with instrustions"
];

window.addEventListener("DOMContentLoaded", () => {
  const message = messages[Math.floor(Math.random() * messages.length)];
  document.getElementById("random-message").textContent = message;
});
