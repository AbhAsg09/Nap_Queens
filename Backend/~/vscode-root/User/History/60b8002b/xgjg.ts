import { NextFunction, Request, Response } from 'express';
import { auth as auth0 } from 'auth0';
import config from './auth0.config';

declare namespace Express {
  interface Request {
    user: any;
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const { payload, header } = await auth0.verifyIdToken(token, config);
    req.user = payload;

    return next();
  } catch (error) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
};

export default auth;