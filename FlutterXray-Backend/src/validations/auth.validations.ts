import { email, z } from 'zod';
export const registerSchema = z.object({
    body: z.object({
        email: z
            .string()
            .min(1, 'Email không được để trống!')
            .email('Email không đúng định dạng!'),

        password: z
            .string()
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự!'),
    }),
});
export const loginScheme = z.object({
    body: z.object({
        email: z.string()
            .min(1, 'Email không được để trống!')
            .email('Email không đúng định dạng!'),

        password: z
            .string()
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự!'),
    })
})