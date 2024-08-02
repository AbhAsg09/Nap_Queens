import express, { Router, Response, NextFunction } from 'express';
import auth from '../auth.middleware';

type ExpressRequest = express.Request;

const adminRouter: Router = express.Router();

// Apply the auth middleware to all routes in this router
adminRouter.use(auth);

adminRouter.get('/dashboard', (req: ExpressRequest, res: Response) => {
  res.render('admin/dashboard');
});

adminRouter.get('/users', (req: ExpressRequest, res: Response) => {
  res.render('admin/users');
});

// Error-handling middleware
adminRouter.use((err: any, req: ExpressRequest, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    // Handle unauthorized error
    res.status(401).redirect('/login');
  } else {
    next(err);
  }
});

export default adminRouter;