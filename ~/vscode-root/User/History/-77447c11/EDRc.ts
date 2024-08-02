const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'CnAxvHK0ubL5w3t-XhYOftY2RJ059-tWd6mRxo4CPd77hUtTUoUogjZEGfVW4jD5',
  baseURL: 'http://localhost:5000',
  clientID: 'LVKj4KvHGFklq4IhllnvNqMcuiNtIEYP',
  issuerBaseURL: 'https://asgola.us.auth0.com'
};

export default auth.config