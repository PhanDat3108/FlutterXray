import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';
export const validate = (schema: ZodType) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await schema.parseAsync(
                {
                    body: req.body,
                    param: req.params,
                    query: req.query,
                }
            )
            next();
        }
        catch (error: any) {
            if (error instanceof ZodError) {
                const errorMessage = error.issues[0]?.message || 'Dữ liệu đầu vào không hợp lệ';
                res.status(400).json({ status: 'fail', message: errorMessage, data: null });
                return;
            }
            res.status(500).json({ status: 'error', message: 'Lỗi hệ thống', data: null });
        }
    }

}