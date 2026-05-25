import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";


async function loadFirebaseConfig() {
  const res = await fetch('/.netlify/functions/get-firebase-config');
  if (!res.ok) throw new Error('Failed to fetch Firebase config');
  return await res.json();
}

(async () => {
  try {
    const config = await loadFirebaseConfig();
    const app = initializeApp(config);
    const db = getFirestore(app);

    const reloadDoc = doc(db, "control", "reload");

    onSnapshot(reloadDoc, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.reloadPage) {
          location.reload();
        }
      }
    });
  } catch (err) {
    console.error("Failed to init reload listener:", err);
  }
})();
