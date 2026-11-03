import { authRequest } from "../middlewares/auth.middleware";
import * as workspaceService from "../services/workspace.services";
import { response, Response } from 'express';
import { generateFlutterFromImage } from '../services/gemini.services';

export const workspaceCreateController = async (req: authRequest, res: Response): Promise<void> => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ code: "error", message: 'Không tìm thấy thông tin xác thực!', data: null });
            return;
        }

        const userId = req.user.id;
        const { name, description, isPublic } = req.body;

        const newWorkspace = await workspaceService.createWorkspace(userId, name, description, isPublic);

        res.status(201).json({
            code: "success",
            message: 'Tạo workspace thành công',
            data: newWorkspace
        });
    }
    catch (error: any) {
        res.status(400).json({
            code: "error",
            message: error.message,
            data: null
        });
    }
};

export const getAllWorkspaces = async (req: authRequest, res: Response): Promise<void> => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ code: "error", message: 'Không tìm thấy thông tin xác thực!', data: null });
            return;
        }

        const userId = req.user.id;

        const allWorkspaces = await workspaceService.getWorkspacesByUserId(userId);

        res.status(200).json({
            code: "success",
            message: 'Lấy danh sách thành công',
            data: allWorkspaces
        });
    }
    catch (error: any) {
        res.status(400).json({
            code: "error",
            message: error.message,
            data: null
        });
    }
}
export const getWorkspaceDetail = async (req: authRequest, res: Response): Promise<void> => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ code: "error", message: 'Không tìm thấy thông tin xác thực!', data: null });
            return;
        }

        const userId = req.user.id;
        const workspaceId = req.params.id as string;
        const workspaceDetail = await workspaceService.getWorkspaceById(workspaceId, userId);
        res.status(200).json({
            code: "success",
            message: 'Lấy danh sách thành công',
            data: workspaceDetail
        });
    }
    catch (error: any) {
        res.status(400).json({
            code: "error",
            message: error.message,
            data: null
        });
    }
}
export const updateWorkspaceController = async (req: authRequest, res: Response): Promise<void> => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ code: "error", message: 'Không tìm thấy thông tin xác thực!', data: null });
            return;
        }
        const userId = req.user.id;
        const workspaceId = req.params.id as string;
        const updateData = req.body;
        const updatedWorkspace = await workspaceService.updateWorkspace(workspaceId, userId, updateData);
        res.status(200).json({
            code: "success",
            message: 'Cập nhật bản vẽ thành công',
            data: updatedWorkspace
        });
    }
    catch (error: any) {
        res.status(400).json({ code: "error", message: error.message, data: null });
    }
}
export const uploadImage = async (req: authRequest, res: Response): Promise<void> => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ code: "error", message: 'Chưa xác thực!', data: null });
            return;
        }

        const userId = req.user.id;
        const workspaceId = req.params.id as string;

        if (!req.file) {
            res.status(400).json({ code: "error", message: 'Không tìm thấy file ảnh đính kèm!', data: null });
            return;
        }

        const imageUrl = req.file.path;

        const updatedWorkspace = await workspaceService.updateWorkspace(
            workspaceId,
            userId,
            { thumbnailUrl: imageUrl }
        );

        res.status(200).json({
            code: "success",
            message: 'Tải ảnh và lưu Database thành công!',
            data: updatedWorkspace
        });
    } catch (error: any) {
        res.status(500).json({ code: "error", message: error.message, data: null });
    }
};
export const generateCode = async (req: authRequest, res: Response): Promise<void> => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ code: "error", message: 'Chưa xác thực!', data: null });
            return;
        }

        const userId = req.user.id;
        const workspaceId = req.params.id as string;

        const workspace = await workspaceService.getWorkspaceById(workspaceId, userId);

        if (!workspace) throw new Error('Không tìm thấy bản vẽ!');
        if (!workspace.thumbnailUrl) throw new Error('Bản vẽ này chưa có ảnh upload!');

        const generatedCode = await generateFlutterFromImage(workspace.thumbnailUrl);

        const historyRecord = await workspaceService.createGeneratedHistory(workspace.id, generatedCode);

        res.status(200).json({
            code: "success",
            message: "Sinh code Flutter thành công!",
            data: historyRecord
        });

    } catch (error: any) {
        res.status(400).json({ code: "error", message: error.message, data: null });
    }
};