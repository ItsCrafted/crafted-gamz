


exports.handler = async (event, context) => {
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    let userIP = 'unknown';
    
    
    if (event.body) {
      try {
        const body = JSON.parse(event.body);
        if (body.ip) {
          userIP = body.ip;
        }
      } catch (e) {
        console.log('Could not parse body');
      }
    }
    
    
    if (userIP === 'unknown') {
      userIP = event.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
               event.headers['client-ip'] || 
               event.headers['x-real-ip'] ||
               'unknown';
    }

    console.log('Checking IP:', userIP);

    
    
    const blacklistedIPsJson = process.env.BLACKLISTED_IPS || '[]';
    let blacklistedIPs = [];
    
    try {
      blacklistedIPs = JSON.parse(blacklistedIPsJson);
    } catch (e) {
      console.error('Error parsing BLACKLISTED_IPS:', e);
      blacklistedIPs = [];
    }

    
    const isBlacklisted = blacklistedIPs.includes(userIP);

    console.log('Is blacklisted:', isBlacklisted);
    console.log('Blacklisted IPs:', blacklistedIPs);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ip: userIP,
        isBlacklisted: isBlacklisted,
        message: isBlacklisted ? 'IP is blacklisted' : 'IP is not blacklisted'
      })
    };

  } catch (error) {
    console.error('Error in game-blacklist function:', error);
    
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