import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";

const listBlogs = asyncHandler(async (req, res) => {

    const blogs = await Blog.find({}).populate("createdBy", "fullName email");

    if (!blogs) {
        throw new ApiError(404, "No blogs found");
    }

    res.status(200).json({
        message: "Blogs fetched successfully",
        blogs
    })

})

const listBlogById = asyncHandler(async (req, res) => {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    res.status(200).json({
        message: "Blog fetched successfully",
        blog
    })

})

const createBlog = asyncHandler(async (req, res) => {
    const { title, content, createdBy } = req.body;

    const poster = req.files.poster[0].path;
    console.log(poster);

    const blog = await Blog.create({
        title, 
        content, 
        createdBy, 
        poster
    })

    if (!blog) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    res.status(201).json({
        message: "Blog created successfully",
        blog: blog
    })
})

const editBlog = asyncHandler(async (req, res) => {
    
    const {title, content} = req.body;
    const poster = req.files.poster[0].path;

    const blog = await Blog.findByIdAndUpdate(req.params.id, {
        title: title, 
        content: content, 
        poster: poster
    })

    if (!blog) {
        throw new ApiError(500, "Something went wrong")
    }

     // Delete the file
     fs.unlink(blog.poster, (err) => {
        if (err) {
            console.error(`Failed to delete file: ${err.message}`);
        }
    });

    res.status(201).json({
        message: "Blog edited successfully",
        blog
    })
})

const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    console.log(blog.poster+" deleting");

    // Delete the file
    fs.unlink(blog.poster, (err) => {
        if (err) {
            console.error(`Failed to delete file: ${err.message}`);
        }
    });

    res.status(200).json({
        message: "Blog deleted successfully",
    })
})

export {
    listBlogs,
    listBlogById,
    createBlog,
    editBlog,
    deleteBlog
}

// TODO: Implement poster uploading through multer