const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller")

router.post("/",blogController.createBlogController);
router.get("/",blogController.getBlogController);

module.exports = router ;