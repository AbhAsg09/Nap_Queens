// auth0.config.js
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'ETRW9XrfR4ysgS0caOfSO0pjIwcEUxhNfE4uR_j5L_9cwKfiyhQzUQgO7H4ln8xt',
  baseURL: 'https://asgola-auth0/',
  clientID: 'm8GlIhuB4B9cz8HU1m0ucmJmRCnsb9e2',
  issuerBaseURL: 'https://asgola.auth0.com',
};

module.exports = config;

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

// auth.middleware.js
const { auth } = require('express-openid-connect');
const config = require('./auth0.config');

const authenticate = async (req, res, next) => {
  try {
    await auth(req, res, next, config);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticate;

// routes/admin.js
const express = require('express');
const router = express.Router();
const authenticate = require('../auth.middleware');

router.get('/admin/dashboard', authenticate, (req, res) => {
  // Only authenticated users can access this route
  res.json({ message: 'Welcome to the admin dashboard!' });
});

// routes/auth.js
const express = require('express');
const router = express.Router();
const { auth } = require('express-openid-connect');
const config = require('../auth0.config');

router.get('/login', (req, res) => {
  res.oidc.login({
    returnTo: '/admin/dashboard',
    authorizationParams: {
      scope: 'openid profile email',
    },
  });
});

router.get('/logout', (req, res) => {
  res.oidc.logout({
    returnTo: '/',
  });
});