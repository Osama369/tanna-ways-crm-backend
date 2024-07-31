import { Router } from "express";
const podcastRouter = Router();
import { listPodcasts, listPodcastById, createPodcast, editPodcast, deletePodcast } from "../controllers/podcast.controller.js";
import { upload } from "../middlewares/multer.js";

podcastRouter.route("/list").get(listPodcasts);

podcastRouter.route("/list/:id").get(listPodcastById);

podcastRouter.route("/create").post(
    upload.fields([
        {
            name: "Podcast",
            maxCount: 1
        }
    ]),
    createPodcast);

podcastRouter.route("/update/:id").put(
    upload.fields([
        {
            name: "Podcast",
            maxCount: 1
        }
    ]),
    editPodcast);

podcastRouter.route("/delete/:id").delete(deletePodcast);

export default podcastRouter;