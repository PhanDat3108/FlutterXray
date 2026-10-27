import { Router } from "express";
import { workspaceCreateController } from '../controllers/workspace.controllers';
import { validate } from '../middlewares/validate.middleware';
import { createWorkspaceSchema } from '../validadations/workspace.validation';
const router = Router();
router.post("/workspace", validate(createWorkspaceSchema), workspaceCreateController)
export default router;