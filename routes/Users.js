const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");
const { response } = require("express");
const { validateToken } = require("../middlewares/middlewares");

router.post("/", async (req, res) => {
  const { userName, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      userName: userName,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  const user = await Users.findOne({ where: { userName: userName } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong userName And Password Combination" });

    const accessToken = sign(
      { userName: user.userName, id: user.id },
      "importantsecret"
    );
    res.json(accessToken);
  });
});

router.post("/validUsername", async (req, res) => {
  const user = await Users.findOne({ where: { userName: req.body.userName } });

  if (user === null) {
    res.json("Success");
  } else {
    res.json("Failed");
  }
});

router.get("/valid", validateToken, async (req, res) => {
  res.json(req.tempVariable);
});

module.exports = router;
