import { Router } from "express";
const userRouter = Router();
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";

userRouter.route("/register").post(registerUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").post(logoutUser);

export default userRouter;