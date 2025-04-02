import express from "express";

import { AuthController } from "./auth.controller.js";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/send-verification-code", authController.sendVerificationCode);

authRouter.post("/verify-email-code", authController.verifyEmailCode);

authRouter.post("/verify-user", authController.verifyUser);

authRouter.post("/update-user-auth-email", authController.updateUserAuthEmail);

export default authRouter;