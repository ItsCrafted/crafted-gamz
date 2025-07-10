export async function handler(event, context) {
  const versionApiUrl = process.env.VERSION_API_URL;
  const versionApiPassword = process.env.VERSION_API_PASSWORD;

  if (!versionApiUrl) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'VERSION_API_URL env var not set' }),
    };
  }

  try {
    if (event.httpMethod === 'POST') {
      // increment version
      if (!versionApiPassword) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'VERSION_API_PASSWORD env var not set' }),
        };
      }
      const body = JSON.parse(event.body || '{}');
      if (body.password !== versionApiPassword) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: 'Unauthorized' }),
        };
      }

      const response = await fetch(versionApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: versionApiPassword }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          statusCode: response.status,
          body: JSON.stringify({ error: 'Worker error: ' + errorText }),
        };
      }

      const newVersion = await response.text();

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ version: newVersion }),
      };

    } else {
      // GET current version, no increment
      const response = await fetch(versionApiUrl, { method: 'GET' });
      const versionText = await response.text();

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ version: versionText }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Fetch error: ' + error.message }),
    };
  }
}
