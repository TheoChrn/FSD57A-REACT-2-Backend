import { Router } from "express";
import { registerUser } from "../controllers/authController";
import { loginUser } from "../controllers/authController";
import { loginVerification } from "../middlewares/login-verification";
const authRouter = Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

export default authRouter;
