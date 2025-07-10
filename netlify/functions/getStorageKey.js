// netlify/functions/getStorageKey.js
exports.handler = async function () {
  const keyName = process.env.LOCALSTORAGE_KEY || 'loggedIn';
  return {
    statusCode: 200,
    body: JSON.stringify({ keyName }),
  };
};
