let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let commentSchema = new Schema({
  content: { type: String },
  author: String,
  articleId: { type: Schema.Types.ObjectId },
});

module.exports = mongoose.model("Comment", commentSchema);
