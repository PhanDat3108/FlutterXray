import { Router } from "express";
import { validate } from '../middlewares/validate.middleware';
import { createWorkspaceSchema, updateWorkspaceSchema } from '../validations/workspace.validation';
import { verifyToken } from '../middlewares/auth.middleware'
import { getAllWorkspaces, getWorkspaceDetail, workspaceCreateController, updateWorkspaceController } from "../controllers/workspace.controllers";
import { uploadImage } from '../controllers/workspace.controllers';
import { uploadWireframe } from '../config/cloudinary.config';
import { generateCode } from '../controllers/workspace.controllers';


const router = Router();
router.post("/create", verifyToken, validate(createWorkspaceSchema), workspaceCreateController)
router.get('/', verifyToken, getAllWorkspaces);
router.get('/:id', verifyToken, getWorkspaceDetail);
router.patch('/update/:id', verifyToken, validate(updateWorkspaceSchema), updateWorkspaceController);
router.post('/:id/upload', verifyToken, uploadWireframe.single('image'), uploadImage);
router.post('/:id/generate', verifyToken, generateCode);

export default router;