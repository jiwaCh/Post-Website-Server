const express = require("express");
const router = express.Router();
const { Posts, Likes, Comments } = require("../models");
const {
  validateUserLoggedIn,
  validateToken,
} = require("../middlewares/middlewares");

// router.get("/", validateUserLoggedIn, async (req, res) => {
//   console.log(req.UserState);

//   if (req.UserState.includes("notLoggedIn")) {
//     return res.json({ error: "User not logged in!", state: "notLoggedIn" });
//   }
//   var listOfLikedPosts = [];
//   const listOfPosts = await Posts.findAll({ include: [Likes] });

//   // const listOfPosts1 = await Posts.findAll({ include: [Likes] });
//   // const listOfPosts2 = await Posts.findAll({ include: [Comments] });
//   // console.log(listOfPosts1);
//   // console.log(listOfPosts2);

//   try {
//     await Likes.findAll({
//       where: { UserId: req.tempVariable.id },
//       attributes: ["PostId"],
//     }).then((resultObj) => {
//       listOfLikedPosts = resultObj.map((value) => {
//         return value.PostId;
//       });
//     }); // returns all the postId as array which the user has liked

//     res.json({
//       listOfPosts: listOfPosts,
//       listOfLikedPosts: listOfLikedPosts,
//       userId: req.userId,
//       state: "LoggedIn",
//     });
//   } catch (e) {
//     res.json({ state: "notLoggedIn" });
//     console.log(e);
//   }
// });

router.get("/", validateUserLoggedIn, async (req, res) => {
  console.log(req.UserState);

  var listOfLikedPosts = [];
  const listOfPosts = await Posts.findAll({ include: [Likes, Comments] });

  try {
    await Likes.findAll({
      where: { UserId: req.tempVariable.id },
      attributes: ["PostId"],
    }).then((resultObj) => {
      listOfLikedPosts = resultObj.map((value) => {
        return value.PostId;
      });
    }); // returns all the postId as array which the user has liked

    res.json({
      listOfPosts: listOfPosts,
      listOfLikedPosts: listOfLikedPosts,
      userId: req.userId,
      // state: "LoggedIn",
    });
  } catch (e) {
    // res.json({ state: "notLoggedIn" });
    console.log(e);
  }
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Posts.findByPk(id);
    res.json(post);
  } catch (e) {
    console.log(e);
  }
});

router.delete("/", validateToken, async (req, res) => {
  const id = req.header("PostId");
  try {
    await Posts.destroy({ where: { id: id } });
    res.send("comment deleted");
  } catch (e) {
    console.log(e);
  }
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.userName = req.tempVariable.userName;
  post.UserId = req.tempVariable.id;
  console.log(post);
  try {
    await Posts.create(post);
    res.json(post);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
