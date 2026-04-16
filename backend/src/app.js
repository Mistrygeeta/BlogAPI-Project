const cors = require("cors");
const express = require("express");
const blogRouter = require("./routers/blog.router")
const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","PATCH","DELETE"],
    credentials: true
}));
app.use(express.json());
app.use("/api/blog",blogRouter)

module.exports = app;