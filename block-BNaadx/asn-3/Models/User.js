let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let bcrypt = require("bcrypt");

let userSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  state: { type: String, required: true },
  kart: [Schema.Types.ObjectId],
});

userSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    bcrypt.hash(this.password, 10, (error, hashed) => {
      if (error) return next(error);
      this.password = hashed;
      console.log(this.password);
      next();
    });
  } else next();
});

userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (error, result) => {
    return cb(error, result);
  });
};
module.exports = mongoose.model("User", userSchema);
