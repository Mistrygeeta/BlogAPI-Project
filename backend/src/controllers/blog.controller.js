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
            error: message.error
        })
    }
};

module.exports = {createBlogController} ;