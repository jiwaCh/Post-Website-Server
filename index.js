const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
// const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// use  "npm devStart" for you local host

app.use(express.json()); //method inbuilt in express() to recognize the incoming Request Object as a JSON Object
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested With, Content-Type, Accept"
  );
  next();
});

// app.use(cookieParser);

//Router
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter); // so it becomes https://post-website-server.herokuapp.com/posts

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter); // so it becomes https://post-website-server.herokuapp.com/comments

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter); // so it becomes https://post-website-server.herokuapp.com/auth

const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter); // so it becomes https://post-website-server.herokuapp.com/auth

// get the database models
const db = require("./models");

// create the database
db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3001, (response) => {
      console.log("Server running port " + response);
    });
  })
  .catch((errorMessage) => {
    console.error("Sequelize ERROR message:" + errorMessage);
  });
