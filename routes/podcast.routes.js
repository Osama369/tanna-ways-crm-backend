import { Router } from "express";
const podcastRouter = Router();
import { listPodcasts, listPodcastById, createPodcast, editPodcast, deletePodcast } from "../controllers/podcast.controller.js";
import { upload } from "../middlewares/multer.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";

podcastRouter.route("/list").get(listPodcasts);

podcastRouter.route("/list/:id").get(listPodcastById);

podcastRouter.route("/create").post(VerifyJWT,
    upload.fields([
        {
            name: "Podcast",
            maxCount: 1
        }
    ]),
    createPodcast);

podcastRouter.route("/update/:id").put(VerifyJWT,
    upload.fields([
        {
            name: "Podcast",
            maxCount: 1
        }
    ]),
    editPodcast);

podcastRouter.route("/delete/:id").delete(VerifyJWT, deletePodcast);

export default podcastRouter;