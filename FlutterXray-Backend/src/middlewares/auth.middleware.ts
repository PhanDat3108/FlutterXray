import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import prisma from '../config/db';

export interface authRequest extends Request {
    user?: User
}
export const verifyToken = async (req: authRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            res.status(401).json({
                status: "false",
                message: "Ban chua dang nhap hoac khong co quyen truy cap"
            })
            return;
        }
        const token = authHeader.split(" ")[1];
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) throw new Error('Chưa cấu hình JWT_SECRET');
        const decoded: any = jwt.verify(token, secretKey);
        const checkUser = await prisma.user.findUnique({
            where: {
                id: decoded.id

            }
        })

        if (!checkUser) {
            res.status(401).json({ status: 'fail', message: 'Tài khoản người dùng không còn tồn tại!' });
            return;
        }
        req.user = checkUser;
        next();
    }
    catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ status: 'fail', message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!' });
            return;
        }
        res.status(401).json({ status: 'fail', message: 'Token không hợp lệ!' });
        return;
    };

}