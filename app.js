import express, { urlencoded } from "express";
import cors from "cors";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16mb"}))
app.use(express.urlencoded({extended: true, limit: "16mb"}))
app.use('/public', express.static('public'));

import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
import podcastRouter from "./routes/podcast.routes.js";
import contactRouter from "./routes/contact.routes.js";
import newsRouter from "./routes/news.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/podcasts", podcastRouter);
app.use("/api/v1/contacts", contactRouter);
app.use("/api/v1/newsletter", newsRouter);
// https://localhost:3000/api/v1/users/register



export {app}
