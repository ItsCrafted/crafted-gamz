import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

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
const submissionsDiv = document.getElementById("submissions");

function format(docSnap) {
  const data = docSnap.data();
  const id = docSnap.id;

  let html = `<div class="entry" data-id="${id}"><h3>${new Date(data.timestamp).toLocaleString()}</h3>`;

  if (data.bug) {
    html += `
      <div class="section">
        <strong>🐛 Bug Report</strong><br>
        Name: ${data.bug.name || "N/A"}<br>
        Type: ${data.bug.type || "N/A"}<br>
        Version: ${data.bug.version || "N/A"}<br>
        Description: ${data.bug.description || "N/A"}
      </div>`;
  }

  if (data.game) {
    html += `
      <div class="section">
        <strong>🕹 Game Suggestion</strong><br>
        Name: ${data.game.name || "N/A"}<br>
        Email: ${data.game.email || "N/A"}<br>
        Title: ${data.game.title || "N/A"}<br>
        URL: ${data.game.url ? `<a href="${data.game.url}" target="_blank">${data.game.url}</a>` : "N/A"}<br>
        Reason: ${data.game.reason || "N/A"}<br>
        Follow-up: ${data.game.followUp || "N/A"}<br>
        Contact Method: ${data.game.contactMethod || "N/A"}
      </div>`;
  }

  html += `<button class="deleteBtn">🗑 Delete</button></div>`;
  return html;
}

async function loadSubmissions() {
  try {
    const q = query(collection(db, "cg_feedback"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      submissionsDiv.innerHTML = "<p>No submissions found.</p>";
      return;
    }

    submissionsDiv.innerHTML = snapshot.docs.map(doc => format(doc)).join("");
  } catch (err) {
    submissionsDiv.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const entry = e.target.closest(".entry");
    const id = entry.getAttribute("data-id");

    if (confirm("Delete this submission?")) {
      await deleteDoc(doc(db, "cg_feedback", id));
      entry.remove();
    }
  }
});

loadSubmissions();
