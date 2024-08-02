// auth0.config.js
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'ETRW9XrfR4ysgS0caOfSO0pjIwcEUxhNfE4uR_j5L_9cwKfiyhQzUQgO7H4ln8xt',
  baseURL: 'https://localhost:5000',
  clientID: 'm8GlIhuB4B9cz8HU1m0ucmJmRCnsb9e2',
  audience: 'https://asgola.auth0.com',
};

export default config;

