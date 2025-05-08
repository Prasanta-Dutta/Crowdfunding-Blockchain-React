import { Router } from "express";
import { registerUser, loginUser, logoutUser, checkSession, verifyUser } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser);
userRouter.route("/check-session").post(checkSession);
userRouter.route("/verify-user").post(verifyUser);

export default userRouter;