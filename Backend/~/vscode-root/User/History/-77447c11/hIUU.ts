// auth0.config.js
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'your_client_secret',
  baseURL: 'https://your_domain.com',
  clientID: 'your_client_id',
  issuerBaseURL: 'https://your_domain.auth0.com',
};

module.exports = config;