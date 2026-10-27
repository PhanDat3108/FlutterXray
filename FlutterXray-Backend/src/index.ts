import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import masterRoute from './routes/index.routes';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('dev'));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { status: 'error', message: 'Quá nhiều lượt truy cập, vui lòng thử lại sau!' }
});
app.use('/api/v1', apiLimiter);

app.use(cors());
app.use(express.json()); 
app.use('/api/v1', masterRoute);

app.listen(port, () => {
    console.log(`[Server]: API is running at http://localhost:${port}`);
});