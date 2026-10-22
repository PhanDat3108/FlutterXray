import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import masterRoute from './routes/index.routes';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Cài đặt Middleware
app.use(cors()); // Cho phép Frontend gọi API mà không bị chặn CORS
app.use(express.json()); // Hỗ trợ server parse data từ Client gửi lên dưới dạng JSON

// Viết một Route API để Health Check
app.use('/api/v1', masterRoute);

app.listen(port, () => {
    console.log(`[Server]: API is running at http://localhost:${port}`);
});