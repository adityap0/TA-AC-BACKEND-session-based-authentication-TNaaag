var express = require("express");
var router = express.Router();
let User = require("../models/User");

router.get("/", function (req, res, next) {
  console.log(req.session);
  res.send("respond with a resource");
});

router.get("/login", function (req, res, next) {
  res.render("login-form");
});
router.post("/login", function (req, res, next) {
  var { email, password } = req.body;
  //email OR password field blank
  if (!email || !password) {
    res.redirect("/users/login");
  }
  User.findOne({ email }, (error, user) => {
    if (error) return next(error);
    //no user
    if (!user) {
      return res.redirect("/users/login ");
    }
    //valid user
    user.verifyPassword(password, (error, result) => {
      console.log(error, result);
      if (error) return next(error);
      if (!result) {
        return res.redirect("/users/login ");
      }
      req.session.userId = user.id;
      res.redirect("/users");
    });
  });
});

router.get("/register", function (req, res, next) {
  res.render("register-form");
});

router.post("/register", function (req, res, next) {
  User.create(req.body, (error, user) => {
    if (error) return next(error);
    res.send(user);
  });
});
module.exports = router;
