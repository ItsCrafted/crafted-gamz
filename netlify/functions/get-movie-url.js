
exports.handler = async (event, context) => {
  console.log('Function called, checking environment variables...');
  
  try {
    
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
        },
        body: ""
      };
    }

    
    const movieUrl = process.env.MOVIE_URL;
    
    console.log('MOVIE_URL exists:', !!movieUrl);

    
    if (!movieUrl) {
      console.error('MOVIE_URL environment variable not found');
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
        },
        body: JSON.stringify({
          error: "MOVIE_URL environment variable not configured",
          debug: "Check Netlify dashboard > Site settings > Environment variables"
        })
      };
    }
    
    console.log('Returning URL successfully');
    
    
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
      },
      body: JSON.stringify({
        url: movieUrl,
        timestamp: new Date().toISOString()
      })
    };
    
  } catch (error) {
    console.error('Error in get-movie-url function:', error);
    
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
      },
      body: JSON.stringify({
        error: "Internal server error",
        message: error.message
      })
    };
  }
};