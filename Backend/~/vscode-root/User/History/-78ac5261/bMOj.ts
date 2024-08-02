// src/routes/personRoutes.ts
import { Router } from 'express';
import { registerEntry, registerExit, getPeopleInside, getPeopleByDate, getAnalytics } from '../controllers/personController';

const router = Router();

router.post('/admin/entry', registerEntry);
router.post('/admin/exit', registerExit);
router.get('/admin/people', getPeopleInside);
router.get('/admin/people/by-date', getPeopleByDate);
router.get('/admin/analytics', getAnalytics);

export default router;
