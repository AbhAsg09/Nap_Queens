import { Request, Response, NextFunction } from 'express';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  await auth(req, res, next, config).catch(next);
};

module.exports = authenticate;