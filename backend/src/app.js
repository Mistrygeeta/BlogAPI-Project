const express = require("express");
const blogRouter = require("./routers/blog.router")
const app = express();

app.use(express.json());
app.use("/api/blog",blogRouter)

module.exports = app;