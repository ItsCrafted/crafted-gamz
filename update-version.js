import fetch from 'node-fetch';

const netlifyFunctionUrl = process.env.VERSION_API_URL;
const password = process.env.VERSION_API_PASSWORD;

if (!netlifyFunctionUrl || !password) {
  console.error('Missing VERSION_API_URL or VERSION_API_PASSWORD environment variables.');
  process.exit(1);
}

async function incrementVersion() {
  try {
    const response = await fetch(netlifyFunctionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to increment version: ${response.status} ${text}`);
    }

    const versionText = await response.text();  // <-- change here, not .json()
    console.log('Version incremented to:', versionText);
  } catch (error) {
    console.error('Error incrementing version:', error.message);
    process.exit(1);
  }
}

incrementVersion();
