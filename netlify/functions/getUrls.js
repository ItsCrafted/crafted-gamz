exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      calculator: process.env.CALCULATOR_URL,
      elaAssistant: process.env.ELAASSISTANT_URL
    })
  };
}
