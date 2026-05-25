import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

async function loadFirebaseConfig() {
  const res = await fetch('/.netlify/functions/get-firebase-config');
  if (!res.ok) throw new Error('Failed to fetch Firebase config');
  return await res.json();
}

(async () => {
  try {
    const config = await loadFirebaseConfig();
    const app = initializeApp(config);
    const db = getDatabase(app);

    const maintenanceRef = ref(db, "settings/maintenance");

    onValue(maintenanceRef, (snapshot) => {
      const isMaintenance = snapshot.val();
      if (isMaintenance === true) {
        window.location.href = 'maintenance.html';
      }
    });

  } catch (err) {
    console.error("Failed to init maintenance checker:", err);
  }
})();
