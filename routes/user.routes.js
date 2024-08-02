import { Router } from "express";
const userRouter = Router();
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";

userRouter.route("/register").post(registerUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").post(logoutUser);

export default userRouter;