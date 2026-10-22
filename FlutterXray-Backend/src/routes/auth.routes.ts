import { Router } from "express";
import { register, login } from '../controllers/auth.controllers';
import { validate } from '../middlewares/validate.middleware';
import { registerSchema, loginScheme } from '../validadations/auth.validations';
const router = Router();
router.post("/register", validate(registerSchema), register)
router.post("/login", validate(loginScheme), login)

export default router;