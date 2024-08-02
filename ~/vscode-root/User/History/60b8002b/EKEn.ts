// src/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import config from './auth0.config';

const client = jwksClient({
  jwksUri: `https://${config.domain}/.well-known/jwks.json`,
  cache: true,
  cacheMaxEntries: 5,
  cacheMaxAge: 600000,
});

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

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  jwt.verify(
    token,
    getKey,
    { algorithms: ['RS256'], audience: config.audience, issuer: `https://${config.domain}/` },
    (err, decoded) => {
      if (err) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      req.user = decoded as JwtPayload; // Type assertion for clarity
      next();
    }
  );
};

export default auth;
