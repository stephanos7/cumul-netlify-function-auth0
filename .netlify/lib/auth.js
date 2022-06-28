const { NetlifyJwtVerifier } = require("@serverless-jwt/netlify");

export const auth = NetlifyJwtVerifier({
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
});
