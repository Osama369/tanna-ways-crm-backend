import { Router } from "express";
const blogRouter = Router();
import { listBlogs, listBlogById ,createBlog, editBlog, deleteBlog } from "../controllers/blog.controller.js";

blogRouter.route("/list").get(listBlogs);

blogRouter.route("/list/:id").get(listBlogById);

blogRouter.route("/create").post(createBlog);

blogRouter.route("/update/:id").put(editBlog);

blogRouter.route("/delete/:id").delete(deleteBlog);

export default blogRouter;