var express = require("express");
var router = express.Router();
var User = require("../models/User");

//login
router.get("/login", function (req, res, next) {
  res.render("login-form");
});
router.post("/login", function (req, res, next) {
  let { email, password } = req.body;
  //when email id OR password is blank
  if (!email || !password) {
    return res.redirect("/");
  }
  User.findOne({ email }, (error, user) => {
    if (error) return next(error);
    //no user
    if (!user) {
      return res.redirect("/");
    }
    //when user is present
    user.verifyPassword(password, (error, result) => {
      if (error) return next(error);
      if (!result) {
        return res.redirect("/");
      } else {
        req.session.userId = user._id;
        res.redirect("/users/dashboard");
      }
    });
  });
});

//dashBoard
router.get("/dashboard", function (req, res, next) {
  res.render("dashboard");
});
//Register
router.get("/register", function (req, res, next) {
  res.render("registration-form");
});
router.post("/register", function (req, res, next) {
  User.create(req.body, (error, user) => {
    if (error) return next(error);
    console.log(user);
    res.render("users", { user });
  });
});

module.exports = router;
