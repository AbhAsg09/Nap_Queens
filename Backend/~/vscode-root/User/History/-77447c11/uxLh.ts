const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:5000',
  clientID: 'rV6hC2eSVojV3gB7p6QQS3d27JF2jrBW',
  issuerBaseURL: 'https://asgola.us.auth0.com'
};

export default auth.config