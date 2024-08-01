import { Router } from "express";
const blogRouter = Router();
import { listBlogs, listBlogById ,createBlog, editBlog, deleteBlog } from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";


blogRouter.route("/list").get(listBlogs);

blogRouter.route("/list/:id").get(listBlogById);

blogRouter.route("/create").post(VerifyJWT,
    upload.fields([
        {
            name: "poster",
            maxCount: 1
        }
    ]),
    createBlog);

blogRouter.route("/update/:id").put(VerifyJWT,
    upload.fields([
        {
            name: "poster",
            maxCount: 1
        }
    ]),
    editBlog);

blogRouter.route("/delete/:id").delete(VerifyJWT, deleteBlog);

export default blogRouter;