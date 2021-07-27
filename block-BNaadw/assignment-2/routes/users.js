var express = require("express");
var router = express.Router();
var User = require("../models/User");
var Article = require("../models/Article");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("userIndex");
});

//registration
router.get("/register", function (req, res, next) {
  res.render("register");
});
router.post("/register", function (req, res, next) {
  User.create(req.body, (error, user) => {
    if (error) return next(error);
    res.redirect("/users");
  });
});

//login
router.get("/login", (req, res, next) => {
  res.render("login");
});
router.post("/login", (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.redirect("/users");
  }
  User.findOne({ email }, (error, user) => {
    if (error) return next(error);
    if (!user) {
      return res.redirect("/users");
    }
    user.verifyPassword(password, (error, result) => {
      if (error) return next(error);
      if (!result) {
        return res.redirect("/users");
      } else {
        req.session.userId = user._id;
        res.redirect("dashboard");
      }
    });
  });
});
//logout
router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.clearCookie();
  res.redirect("/users");
});

router.get("/dashboard", (req, res, next) => {
  Article.find({}, (error, articles) => {
    if (error) return next(error);
    console.log(articles);
    res.render("dashboard", { articles });
  });
});

module.exports = router;
