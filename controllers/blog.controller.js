import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";

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

    const { title, content, createdBy, poster } = req.body;

    const blog = await Blog.create({
        title, 
        content, 
        createdBy, 
        poster
    })

    const createdBlog = await Blog.findById(blog._id);
    console.log(createdBlog);


    if (!createdBlog) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    res.status(201).json({
        message: "Blog created successfully",
        blog: createdBlog
    })
})

const editBlog = asyncHandler(async (req, res) => {
    
    const {_id, title, content, poster} = req.body;

    const blog = await Blog.findByIdAndUpdate(_id, {
        title: title, 
        content: content, 
        poster: poster
    })

    if (!blog) {
        throw new ApiError(500, "Something went wrong")
    }

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