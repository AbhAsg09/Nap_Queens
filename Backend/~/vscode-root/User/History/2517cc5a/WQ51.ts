// auth.ts
import { expressjwt } from 'express-jwt';
import { domain, audience } from './auth.config';

const authenticate = expressjwt({
  secret: `https://https://asgola-auth0//.well-known/jwks.json`,
  audience: audience,
  algorithms: ['RS256'],
});

export default authenticate;