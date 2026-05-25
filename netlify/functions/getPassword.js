exports.handler = async (event, context) => {
  try {
    const password1 = process.env.PASSWORD_1;
    const password2 = process.env.PASSWORD_2 || "";
    const clientRedirectUrl = process.env.REDIRECT_1 || "main.html";
    const homeRedirectUrl = process.env.REDIRECT_HOME || "";

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({
        password: password1,
        alternatePassword: password2,
        clientRedirectUrl,
        homeRedirectUrl
      })
    };
  } catch (error) {
    console.error('Error in getPassword function:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Internal server error'
      })
    };
  }
};
