import { Request, Response } from 'express';
import * as authService from '../services/auth.services';
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await authService.registerUser(email, password);
        res.status(201).json({
            code: "error",
            message: 'Đăng ký tài khoản thành công',
            data: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });

    }

    catch (error: any) {
        res.status(400).json({
            code: "error",
            message: error.message,
            date: null
        });
    }
}
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await authService.loginUser(email, password)

        res.status(200).json({
            status: 'success',
            message: 'Đăng nhập thành công',
            data: {
                user: user.user,
                token: user.token
            },
        })
    }
    catch (error: any) {
        res.status(401).json({ status: 'fail', message: error.message, data: null });
    }
}