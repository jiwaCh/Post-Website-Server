const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
// const cookieParser = require("cookie-parser");

// use  "npm devStart" for you local host

app.use(express.json()); //method inbuilt in express() to recognize the incoming Request Object as a JSON Object
app.use(cors());
// app.use(cookieParser);

//Router
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter); // so it becomes https://cors-anywhere.herokuapp.com/https://post-website-server.herokuapp.com/posts

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter); // so it becomes https://cors-anywhere.herokuapp.com/https://post-website-server.herokuapp.com/comments

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter); // so it becomes https://cors-anywhere.herokuapp.com/https://post-website-server.herokuapp.com/auth

const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter); // so it becomes https://cors-anywhere.herokuapp.com/https://post-website-server.herokuapp.com/auth

// get the database models
const db = require("./models");

// create the database
db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("Server running port 3001");
    });
  })
  .catch((errorMessage) => {
    console.error("Sequelize ERROR message:" + errorMessage);
  });
