const cors = require("cors");
const express = require("express");
const blogRouter = require("./routers/blog.router")
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/blog",blogRouter)

module.exports = app;