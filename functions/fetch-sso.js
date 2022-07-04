const Cumulio = require("cumulio");
const { auth } = require("../.netlify/lib/auth");

exports.handler = auth(async (event, context) => {
  let ssoResponse;
  var client = new Cumulio({
    api_key: process.env.CUMUL_KEY,
    api_token: process.env.CUMUL_TOKEN,
    host: "https://api.cumul.io",
  });

  const generateSSOcredentials = async () => {
    return await client.create("authorization", {
      integration_id: "5d4bc6b9-3f45-48d2-a23f-1efe4ce224c4",
      type: "sso",
      expiry: "24 hours",
      inactivity_interval: "10 minutes",
      username: "user1",
      name: "Brad Lambda",
      email: "bradlambda@cumul.io",
      suborganization: "user1",
      role: "viewer",
    });
  };
  try {
    ssoResponse = await generateSSOcredentials();
  } catch (err) {
    console.log(err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong, please try again later",
      }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ token: ssoResponse.token, key: ssoResponse.id }),
  };
});
