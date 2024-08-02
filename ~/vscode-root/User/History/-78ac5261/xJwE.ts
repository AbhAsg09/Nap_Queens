// src/routes/personRoutes.ts
import { Router } from 'express';
import { registerEntry, registerExit, getPeopleInside, getPeopleByDate, getAnalytics } from '../controllers/personController';

const router = Router();

router.post('/entry', registerEntry);
router.post('/exit', registerExit);
router.get('/people', getPeopleInside);
router.get('/people/by-date', getPeopleByDate);
router.get('/analytics', getAnalytics);

export default router;
