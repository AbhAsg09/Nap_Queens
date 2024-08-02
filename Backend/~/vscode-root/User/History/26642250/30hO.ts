// types/express/index.d.ts
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string; // Adjust the type based on your use case
    }
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}
