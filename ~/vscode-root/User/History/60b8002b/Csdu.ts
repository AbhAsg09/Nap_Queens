import { NextFunction, Request as ExpressRequest, Response } from 'express';import jwt, { JwtPayload } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import config from './auth0.config';

interface Config {
  domain: string;
  clientId: string;
  clientSecret: string;
  audience: string;
}

const authConfig: Config = config;

const client = jwksClient({
  jwksUri: `https://asgola.us.auth0/.well-known/jwks.json`,
  cache: true,
  cacheMaxEntries: 5, // Default value
  cacheMaxAge: 600000, // Default value in ms
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

interface Request extends express.Request {
  user?: JwtPayload;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  jwt.verify(
    token,
    getKey,
    { algorithms: ['RS256'], audience: authConfig.audience, issuer: `https://asgola.us.auth0.com` },
    (err, decoded) => {
      if (err) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      req.user = decoded as JwtPayload; // Type assertion for clarity
      next(); // Call next to continue the request pipeline
    }
  );
};

const adminRouter = express.Router();
adminRouter.use('/', auth);

adminRouter.get('/dashboard', (req: Request, res: Response) => {
  res.render('admin/dashboard');
});

export default adminRouter;