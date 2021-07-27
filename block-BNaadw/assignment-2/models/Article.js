let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let slug = require("slug");

let articleSchema = new Schema({
  title: String,
  description: String,
  likes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  slug: String,
});
articleSchema.pre("save", function (next) {
  this.slug = slug(this.title);
  next();
});
module.exports = mongoose.model("Article", articleSchema);
