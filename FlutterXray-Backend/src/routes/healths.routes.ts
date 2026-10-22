import { Router, Request, Response } from 'express';
const router = Router();
router.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to FlutterXray Engine API',
        status: 'OK',
        timestamp: new Date().toISOString()
    })
})
export default router;