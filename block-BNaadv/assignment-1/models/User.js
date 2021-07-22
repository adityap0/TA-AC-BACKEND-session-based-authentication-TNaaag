let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let bcrypt = require("bcrypt");

let userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  password: { type: String },
});

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
userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (error, result) => {
    return cb(error, result);
  });
};
module.exports = mongoose.model("User", userSchema);
