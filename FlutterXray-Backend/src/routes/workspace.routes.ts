import { Router } from "express";
import { validate } from '../middlewares/validate.middleware';
import { createWorkspaceSchema, updateWorkspaceSchema } from '../validadations/workspace.validation';
import { verifyToken } from '../middlewares/auth.middleware'
import { getAllWorkspaces, getWorkspaceDetail, workspaceCreateController, updateWorkspaceController } from "../controllers/workspace.controllers";


const router = Router();
router.post("/create", verifyToken, validate(createWorkspaceSchema), workspaceCreateController)
router.get('/', verifyToken, getAllWorkspaces);
router.get('/:id', verifyToken, getWorkspaceDetail);
router.patch('/update/:id', verifyToken, validate(updateWorkspaceSchema), updateWorkspaceController);

export default router;