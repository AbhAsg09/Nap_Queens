const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '0urW7femjyJPRjMaGfD5cYndMrsl1rUcEB88a4RZs3E9ZZ3xeJZO6WElmMBL_xp1',
  baseURL: 'http://localhost:5000',
  clientID: 'rV6hC2eSVojV3gB7p6QQS3d27JF2jrBW',
  issuerBaseURL: 'https://asgola.us.auth0.com'
};

export default auth.config