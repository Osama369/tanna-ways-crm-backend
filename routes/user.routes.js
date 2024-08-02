import { Router } from "express";
const userRouter = Router();
import { registerUser, loginUser, logoutUser, refreshAccessToken } from "../controllers/user.controller.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";

userRouter.route("/register").post(registerUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").post(VerifyJWT, logoutUser);

userRouter.route("/refresh-token").post(VerifyJWT, refreshAccessToken);

export default userRouter;