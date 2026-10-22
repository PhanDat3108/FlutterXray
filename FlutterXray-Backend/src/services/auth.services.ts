
import bcrypt from 'bcrypt';
import prisma from '../config/db';
import Jwt from 'jsonwebtoken';
export const registerUser = async (email: string, password: string) => {
    const existingUser = await prisma.user.findUnique({
        where: { email }
    }
    )
    if (existingUser) {
        throw new Error("Email đã tồn tại")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await prisma.user.create({
        data: {
            email: email, password: hashedPassword
        }
    })
    return newUser;
}
export const loginUser = async (email: string, password: string) => {
    const existingUser = await prisma.user.findUnique({
        where: { email }
    })
    if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
        throw new Error("Email hoac mat khau sai")
    }
    const secretKey = process.env.JWT_SECRET
    if (!secretKey) {
        throw new Error('Chưa cấu hình JWT_SECRET trong file .env');
    }
    const token = Jwt.sign(
        {
            id: existingUser.id,
            role: existingUser.role
        }, secretKey, {
        expiresIn: '7d',
    }
    )
    return {
        user: {
            id: existingUser.id,
            email: existingUser.email,
            role: existingUser.role,
        },
        token,
    };


}