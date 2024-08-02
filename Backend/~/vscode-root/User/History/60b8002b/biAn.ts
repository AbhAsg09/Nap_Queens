// src/auth.ts
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import config from './auth0.config';

// Define a JWKS client to fetch RSA keys
const client = jwksClient({
  jwksUri: `https://asgola-auth0/.well-known/jwks.json`,
  cache: true,
  cacheMaxEntries: 5, // Default value
  cacheMaxAge: 600000, // Default value in ms
});

interface Config {
  domain: string;
  clientId: string;
  clientSecret: string;
  audience: string;
}

const authConfig: Config = config;

// Function to retrieve the signing key
function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err, undefined);
    } else {
      const signingKey = key?.getPublicKey();
      callback(null, signingKey);
    }
  });
}

// Auth middleware
const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  // Verify the token
  jwt.verify(token, getKey, { algorithms: ['RS256'], audience: config.audience, issuer: `https://${config.domain}/` }, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};

export default auth;
