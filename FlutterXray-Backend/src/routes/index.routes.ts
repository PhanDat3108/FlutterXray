import { Router } from 'express';
import authRoute from './auth.routes';
import healthRoute from './healths.routes';


const router = Router();


router.use('/health', healthRoute);
router.use('/auth', authRoute);

export default router;