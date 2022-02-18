const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    console.log("User not logged in! from middleware");
    return res.json({ error: "User not logged in!" });
  }

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.tempVariable = validToken;
    if (validToken) {
      console.log("validateToken passed in middleware");
      return next();
    }
  } catch (err) {
    console.log("error in middleware " + err);
    return res.json({ error: err });
  }
};

const validateUserLoggedIn = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (accessToken.includes("null")) {
    return next();
  }

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.tempVariable = validToken;
    if (validToken) {
      req.userId = validToken.id;

      return next();
    }
  } catch (err) {
    req.userId = null;
    return next();
  }
};

// const validateUserLoggedIn = (req, res, next) => {
//   const accessToken = req.header("accessToken");
//   req.UserState = "null";

//   if (accessToken.includes("null")) {
//     req.UserState = "notLoggedIn";
//     return next();
//   }

//   try {
//     const validToken = verify(accessToken, "importantsecret");
//     req.tempVariable = validToken;
//     if (validToken) {
//       req.userId = validToken.id;
//       req.UserState = "LoggedIn";
//       return next();
//     }
//   } catch (err) {
//     req.UserState = "notLoggedIn";
//     req.userId = null;
//     return next();
//   }
// };
module.exports = { validateToken, validateUserLoggedIn };
