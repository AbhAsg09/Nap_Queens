import express, { Router } from 'express';
import authenticate from '../auth.middleware';

const adminRouter: Router = express.Router();

adminRouter.use(authenticate);

adminRouter.get('/dashboard', (req, res) => {
  res.render('admin/dashboard');
});

adminRouter.get('/users', (req, res) => {
  res.render('admin/users');
});

export default adminRouter;