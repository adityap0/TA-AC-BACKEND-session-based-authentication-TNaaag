let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let bcrypt = require("bcrypt");

let userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, min: 5, required: true },
    age: { type: Number },
    phone: { type: Number, required: true },
  },
  { timestamps: true }
);

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
module.exports = mongoose.model("User", userSchema);
