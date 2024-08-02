// src/routes/personRoutes.ts
import { Router } from 'express';
import { registerEntry, registerExit, getPeopleInside } from '../controllers/personController';

const router = Router();

router.post('/entry', registerEntry);
router.post('/exit', registerExit);
router.get('/people', getPeopleInside);

export default router;
