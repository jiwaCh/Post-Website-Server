const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/middlewares");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments); // this is returned when calling axios as a varible. in our instance, this is response varible (example below)
});

// axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
//   setComment(response.data);
// });

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  comment.userName = req.tempVariable.userName;
  await Comments.create(comment);
  res.json(comment); // this is returned when calling axios as a varible. in our instance, this is response varible (example above)
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;
  console.log("commentId")
  console.log(commentId)
  await Comments.destroy({ where: { id: commentId } });
  console.log("workinggg?????????????")
  res.send("comment deleted");
});

module.exports = router;