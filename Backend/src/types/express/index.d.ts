// types/express/index.d.ts
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

// Extending the Express Request interface to include the 'user' property
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload | string; // Adjust the type based on your use case
  }
}
