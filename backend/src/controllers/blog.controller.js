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
        message: "blog created succesfully",
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
            Blogs : blogs
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

module.exports = {createBlogController , getBlogController, getSingleBlogController} ;