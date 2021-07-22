let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let articleSchema = new Schema({
  title: String,
  description: String,
  likes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  author: String,
  slug: String,
});

module.exports = mongoose.model("Article", articleSchema);
