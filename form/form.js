import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXnUu4MrcFYeKwVMRoX-R-ej_2TTF41oU",
  authDomain: "crafted-gamz-fdcc0.firebaseapp.com",
  projectId: "crafted-gamz-fdcc0",
  storageBucket: "crafted-gamz-fdcc0.firebasestorage.app",
  messagingSenderId: "139495303211",
  appId: "1:139495303211:web:71757fd932155b3fe1626e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const bugName = document.getElementById("bugName").value.trim();
  const bugType = document.getElementById("bugType").value;
  const bugVersion = document.getElementById("bugVersion").value;
  const bugDesc = document.getElementById("bugDesc").value.trim();

  const gameName = document.getElementById("gameName").value.trim();
  const gameEmail = document.getElementById("gameEmail").value.trim();
  const gameTitle = document.getElementById("gameTitle").value.trim();
  const gameURL = document.getElementById("gameUrl").value.trim();
  const gameReason = document.getElementById("gameReason").value.trim();
  const gameFollowUp = document.getElementById("gameFollowUp").value;
  const gameContactMethod = document.getElementById("gameContactMethod").value;

  const feedback = { timestamp: new Date().toISOString() };

  if (bugName || bugType || bugVersion || bugDesc) {
    feedback.bug = {
      name: bugName,
      type: bugType,
      version: bugVersion,
      description: bugDesc,
    };
  }

  if (gameTitle || gameURL || gameReason || gameName || gameEmail) {
    feedback.game = {
      name: gameName,
      email: gameEmail,
      title: gameTitle,
      url: gameURL,
      reason: gameReason,
      followUp: gameFollowUp,
      contactMethod: gameContactMethod,
    };
  }

  try {
    await addDoc(collection(db, "cg_feedback"), feedback);
    document.getElementById("status").textContent = "Submitted!";
    document.getElementById("feedbackForm").reset();
  } catch (err) {
    document.getElementById("status").textContent = "Error: " + err.message;
  }
});
