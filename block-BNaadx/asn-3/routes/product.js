var express = require("express");
var router = express.Router();
var Product = require("../Models/Product");

router.get("/new", (req, res, next) => {
  res.render("product");
});
router.post("/new", (req, res, next) => {
  Product.create(req.body, (error, product) => {
    if (error) return next(error);
    console.log(product);
    res.redirect("/users/admin-dashboard");
  });
});
router.get("/:id/edit", (req, res, next) => {
  let id = req.params.id;
  Product.findById(id, (error, product) => {
    if (error) return next(error);
    res.render("productEdit", { product });
  });
});
router.post("/:id/edit", (req, res, next) => {
  let id = req.params.id;
  Product.findByIdAndUpdate(id, req.body, (error, product) => {
    if (error) return next(error);
    res.redirect("/users/admin-dashboard");
  });
});
router.get("/:id/delete", (req, res, next) => {
  let id = req.params.id;
  Product.findByIdAndDelete(id, (error, product) => {
    if (error) return next(error);
    res.redirect("/users/admin-dashboard");
  });
});
router.get("/:id/like/:opr", (req, res, next) => {
  let opr = req.params.opr;
  let id = req.params.id;
  if (opr === "+") {
    Product.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (error, product) => {
      res.redirect("/users/user-dashboard");
    });
  } else {
    Product.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (error, product) => {
      res.redirect("/users/user-dashboard");
    });
  }
});
module.exports = router;
