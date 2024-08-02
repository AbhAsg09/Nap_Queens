import { auth } from 'express-openid-connect';

const config: {
  authRequired: boolean;
  auth0Logout: boolean;
  secret: string;
  baseURL: string;
  clientID: string;
  audience: string;
  issuerBaseURL: string;
} = {
  authRequired: false,
  auth0Logout: true,
  secret: 'ETRW9XrfR4ysgS0caOfSO0pjIwcEUxhNfE4uR_j5L_9cwKfiyhQzUQgO7H4ln8xt',
  baseURL: 'https://localhost:5000',
  clientID: '8GlIhuB4B9cz8HU1m0ucmJmRCnsb9e2',
  audience: 'https://asgola.auth0.com/api/v2/', // added /api/v2/ to the audience
  issuerBaseURL: 'https://asgola.auth0.com', // added issuerBaseURL
};

export default config;