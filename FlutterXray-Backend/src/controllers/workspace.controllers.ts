import { authRequest } from "../middlewares/auth.middleware";
import * as workspaceService from "../services/workspace.services";
import { Request, Response } from 'express';
export const workspaceCreateController = async (req: authRequest, res: Response): Promise<void> => {
    try {
        const { name,
            description,
            isPublic } = req.body;
        if (req.user) {
            const userId = req.user.id;


            const newWorkspace = await workspaceService.createWorkspace(userId, name, description, isPublic)
            res.status(201).json({
                code: "success",
                message: 'Tạo workspace thành công',
                data: newWorkspace
            });
        }
    }
    catch (error: any) {
        res.status(400).json({
            code: "error",
            message: error.message,
            date: null
        });
    }
};