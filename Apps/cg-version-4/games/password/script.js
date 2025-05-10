function checkPassword() {
    var passwordInput = document.getElementById("password");
    var password = passwordInput.value;
    var correctPassword = "Tornado Siren"; // Set your correct password here
  
    if (password === correctPassword) {
      window.location.href = "../goofy/goofy reqs/index.html"; // Redirect to the welcome page
    } else {
      alert("Incorrect password. Please try again or ask Atticus for the password.");
      passwordInput.value = ""; // Clear the password input field
    }
  }
  