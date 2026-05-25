exports.handler = async (event, context) => {
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { action, sessionId } = body;

    const API_KEY = process.env.HYPERBEAM_API_KEY;

    if (!API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    if (action === 'create') {
      
      const response = await fetch('https://engine.hyperbeam.com/v0/vm', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          statusCode: response.status,
          headers,
          body: JSON.stringify({ 
            error: `Hyperbeam API error: ${response.status}`,
            details: errorText
          })
        };
      }

      const data = await response.json();
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data)
      };

    } else if (action === 'delete') {
      
      if (!sessionId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Session ID required for delete action' })
        };
      }

      const response = await fetch(`https://engine.hyperbeam.com/v0/vm/${sessionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          statusCode: response.status,
          headers,
          body: JSON.stringify({ 
            error: `Failed to delete session: ${response.status}`,
            details: errorText
          })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true })
      };

    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid action. Use "create" or "delete"' })
      };
    }

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};