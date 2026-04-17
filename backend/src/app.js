const cors = require("cors");
const express = require("express");
const blogRouter = require("./routers/blog.router")
const app = express();

app.use(cors({
    origin: ["http://localhost:5173",
     "https://blog-api-project-seven.vercel.app",
     "http://blog-api-project-seven.vercel.app"
    ],
    methods: ["GET","POST","PUT","PATCH","DELETE"],
    credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Blog API is running");
});
app.use("/api/blog",blogRouter)

module.exports = app;