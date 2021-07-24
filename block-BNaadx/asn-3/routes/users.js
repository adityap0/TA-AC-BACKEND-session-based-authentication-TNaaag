var express = require("express");
var router = express.Router();
var User = require("../Models/User");
var Product = require("../Models/Product");

router.get("/", (req, res, next) => {
  res.render("landingPage");
});
router.get("/register", (req, res, next) => {
  res.render("register");
});
router.post("/register", (req, res, next) => {
  req.body.name = req.body.name.trim().toLowerCase();
  User.create(req.body, (error, user) => {
    if (error) return next(error);
    res.redirect("/users");
  });
});
router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.redirect("/users/login");
  }
  User.findOne({ email }, (error, user) => {
    if (error) return next(error);
    if (!user) {
      return res.redirect("/users/login");
    }
    user.verifyPassword(password, (error, result) => {
      if (error) return next(error);
      if (!result) {
        return res.redirect("/users/login");
      } else {
        req.session.userId = user._id;
        if (user.name === "admin") {
          res.redirect("/users/admin-dashboard");
        } else {
          res.redirect("/users/user-dashboard/" + user._id);
        }
      }
    });
  });
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/users");
});
router.get("/user-dashboard/:uid", (req, res, next) => {
  let uid = req.params.uid;
  Product.find({}, (error, products) => {
    if (error) return next(error);
    res.render("user-dashboard", { products, uid });
  });
});
router.get("/kart/:pid/:uid", (req, res, next) => {
  let pid = req.params.pid;
  let uid = req.params.uid;
  User.findByIdAndUpdate(uid, { $push: { kart: pid } }, (error, user) => {
    if (error) return next(error);
    console.log(user);
    res.redirect("/users/user-dashboard/" + uid);
  });
});
router.get("/admin-dashboard", (req, res, next) => {
  Product.find({}, (error, products) => {
    if (error) return next(error);
    res.render("admin-dashboard", { products });
  });
});

module.exports = router;
