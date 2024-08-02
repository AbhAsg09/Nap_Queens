import express, { Router, Request, Response, NextFunction } from 'express';
import auth from '../auth.middleware';

const adminRouter: Router = express.Router();

adminRouter.use(auth);

adminRouter.get('/dashboard', (req: Request, res: Response) => {
  res.render('admin/dashboard');
});

adminRouter.get('/users', (req: Request, res: Response) => {
  res.render('admin/users');
});

// Catch any errors that occur during authentication
adminRouter.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'AuthenticationError') {
    res.status(401).redirect('/login');
  } else {
    next(err);
  }
});

export default adminRouter;