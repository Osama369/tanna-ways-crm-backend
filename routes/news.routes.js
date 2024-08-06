import { Router } from "express";
const newsRouter = Router();
import { subscribe } from "../controllers/news.controller.js";

newsRouter.route("/subscribe").post(subscribe);

export default newsRouter;