exports.handler = async (event, context) => {
    try {
        // Get passwords from environment variables
        const password1 = process.env.PASSWORD_1 || 'craftedgamz';
        const password2 = process.env.PASSWORD_2 || 'crafted';
        
        // Get redirect URLs from environment variables
        const clientRedirectUrl = process.env.REDIRECT_1 || 'client.html';
        const homeRedirectUrl = process.env.REDIRECT_2 || 'home.html';
        
        // Return the passwords and redirect URLs
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({
                password: password1, // Returns 'craftedgamz' by default
                alternatePassword: password2, // Returns 'crafted' by default
                clientRedirectUrl: clientRedirectUrl, // Returns 'client.html' by default
                homeRedirectUrl: homeRedirectUrl // Returns 'home.html' by default
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