const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./api/user");
const authRouter = require("./api/auth");
const postRouter = require("./api/post");
const fileRouter = require("./api/fileStorage");
const path = require("path");

// connect db
dotenv.config();
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to Mongo DB.")
});

// define app
const app = express();

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

// api endpoint
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/file", fileRouter);
app.use("/images", express.static(path.join(__dirname, "public/images")));

// health-check api
app.get("/", (req, res) => {
    res.send("Hello world !!!")
});

// port start server
app.listen(8800, () => {
    console.log("Backend server !!!")
});