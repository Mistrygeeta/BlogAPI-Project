const blogModel = require("../models/blog.model");


async function createBlogController(req, res) {
    try {
    let {title, author, content} = req.body;
    if(!title || !author || !content){
        return res.status(422).json({
            message: "All field are required!"
        })
    };
    let newBlog = await blogModel.create({
        title,
        author,
        content
    });

    if(!newBlog){
        return res.status(400).json({
            message : "error in creating blog!",

        })
    };

    return res.status(201).json({
        message: "blog created successfully",
        Blog : newBlog
    })
    } catch (error) {
        return res.status(500).json({
            message : "internal server error",
            error: error.message
        })
    }
};

async function getBlogController(req, res) {
    try {
        let blogs = await blogModel.find()
        if(blogs.length === 0){
            return res.status(404).json({
                message : "blogs not found"
            })
        }
        res.status(200).json({
            message : "blog fetched successfully",
            blogs : blogs
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error",
        })
    }
};

async function getSingleBlogController(req,res) {
    try {
        let {id} = req.params;

        let blog = await blogModel.findById(id);

        if(!blog){
            return res.status(404).json({
                message: "blog not found"
            })
        };

        return res.status(200).json({
            message: "blog fetched successfully",
            Blog: blog
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function updateBlogController(req, res) {
    try {
        let {id} = req.params;

        let {title,author, content} = req.body;

        if(!title || !author|| !content){
            return res.status(422).json({
                message: " All field are required for update!"
            })
        };

        let updateBlogs = await blogModel.findByIdAndUpdate(id,{title,author,content},{ new: true, runValidators: true });

        if(!updateBlogs){
            return res.status(404).json({
                message : "blogs not found"
            })
        };

        return res.status(200).json({
            message: "blog update successfully",
            blog : updateBlogs
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "internal server error"
        })
    }
};

async function updatePartialBlogController(req, res) {
    try {
        let {id} = req.params;

        let updateBlog = await blogModel.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});

        if(!updateBlog){
            return res.status(404).json({
                message: "blog not found!"
            })
        };

        return res.status(200).json({
          message:  "blog updated successfully",
            blog : updateBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"internal server error"
        })
    }
};

async function deleteBlogController(req, res) {
    try {
        let {id} = req.params;

        let deleteBlog = await blogModel.findByIdAndDelete(id);
        if(!deleteBlog){
            return res.status(404).json({
                message : "blog not found"
            })
        };

        return res.status(200).json({
            message : "blog deleted successfully",
            blog : deleteBlog
        });
    } catch (error) {
        console.log("error in delete blog:", error)
        return res.status(500).json({
            message : "internal server error",
            error : error.message
        })
    }
}
module.exports = {createBlogController , getBlogController, getSingleBlogController,
    updateBlogController,updatePartialBlogController,deleteBlogController};