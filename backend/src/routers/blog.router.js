const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller")

router.post("/",blogController.createBlogController);
router.get("/",blogController.getBlogController);
router.get("/:id", blogController.getSingleBlogController);
router.put("/:id",blogController.updateBlogController);
router.patch("/:id",blogController.updatePartialBlogController);
router.delete("/:id", blogController.deleteBlogController);

module.exports = router ;