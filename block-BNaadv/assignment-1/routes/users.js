var express = require("express");
var router = express.Router();
var User = require("../models/User");

/* GET users listing. */
router.get("/", function (req, res, next) {
  let info = res.render("user-index");
});
router.get("/signup", function (req, res, next) {
  res.render("signup");
});
router.post("/signup", function (req, res, next) {
  var { email, password } = req.body;
  if (!email || !password) {
    return res.redirect("/users/signup");
  } else {
    User.create(req.body, (error, user) => {
      if (error) return next(error);
      // req.flash("info", "User successfully Registered");
      return res.redirect("/users");
    });
  }
});

router.get("/login", function (req, res, next) {
  res.render("login");
});
router.post("/login", function (req, res, next) {
  var { email, password } = req.body;
  //no email / password entered
  if (!email || !password) {
    return res.redirect("/users/login");
  }
  User.findOne({ email }, (error, user) => {
    if (error) return next(error);
    //no user found
    if (!user) {
      return res.redirect("/users/login");
    }

    //user found
    user.verifyPassword(password, (error, result) => {
      if (error) return next(error);
      //wrong password entered
      if (!result) {
        return res.redirect("/users/login");
      }
      //right password
      else {
        req.session.userId = user._id;
        res.render("dashboard", { user });
      }
    });
  });
});
router.get("/logout", function (req, res, next) {
  console.log(req.session, "Session - Before");
  req.session.destroy();
  res.clearCookie("connect.sid");
  console.log(req.session, "Session - After");
  res.redirect("/users");
});
module.exports = router;
