import express from 'express';
import AccountRouter from './account.routes';
// import ProductRouter from './product.routes';
// import CategoryRouter from './category.routers';
import SubjectRouter from './subject.routers';
const router = express.Router();

// API api
router.use('/api', AccountRouter);
//router.use('/api', ProductRouter);
// router.use('/api', CategoryRouter);
router.use('/api', SubjectRouter);

export default router;
