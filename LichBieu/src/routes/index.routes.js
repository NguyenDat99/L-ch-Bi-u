import express from 'express';
import AccountRouter from './account.routes';
import SubjectRouter from './subject.routers';
import ScheduleRouter from './schedule.routers';

const router = express.Router();

// API api
router.use('/api', AccountRouter);
router.use('/api', SubjectRouter);
router.use('/api', ScheduleRouter);
export default router;
