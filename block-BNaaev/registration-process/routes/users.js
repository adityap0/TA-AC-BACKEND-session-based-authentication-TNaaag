var express = require("express");
var router = express.Router();
let User = require("../models/User");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// 2. Handle a GET request on `/users/register` where render the registration form
router.get("/register", function (req, res, next) {
  res.render("register-form");
});
// 3. Handle a POST request on `/users/register` where we will capture the data & save it into mongoDB database
router.post("/register", function (req, res, next) {
  User.create(req.body, (error, user) => {
    if (error) return next(error);
    res.send(user);
  });
});
module.exports = router;
