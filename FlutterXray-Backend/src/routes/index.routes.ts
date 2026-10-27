import { Router } from 'express';
import authRoute from './auth.routes';
import healthRoute from './healths.routes';
import workspaceRoute from './workspace.routes';



const router = Router();


router.use('/health', healthRoute);
router.use('/auth', authRoute);
router.use('/workspace', workspaceRoute);

export default router;