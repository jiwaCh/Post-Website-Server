const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/middlewares");


// post likes / destroy likes
router.post("/", validateToken, async (req, res) => {
  const PostId = req.body.PostId;
  const UserId = req.tempVariable.id;

  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  if (!found) {
    await Likes.create({ PostId: PostId, UserId: UserId });
    res.json({ liked: true });
  } else {
    await Likes.destroy({
      where: { PostId: PostId, UserId: UserId },
    });
    res.json({ liked: false });
  }
});

module.exports = router;
