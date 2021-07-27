let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let bcrypt = require("bcrypt");

var userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  city: String,
  fullName: String,
  article: [{ type: Schema.Types.ObjectId, ref: "Article" }],
});

//to create the fullName
userSchema.pre("save", function (next) {
  this.fullName = this.firstName + " " + this.lastName;
  next();
});
//to encrypt the password
userSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    bcrypt.hash(this.password, 12, (error, hashed) => {
      if (error) return next(error);
      this.password = hashed;
      next();
    });
  } else {
    next();
  }
});

//to verify the password
userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (error, result) => {
    return cb(error, result);
  });
};
module.exports = mongoose.model("User", userSchema);
