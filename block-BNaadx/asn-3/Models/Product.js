let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let productSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, default: 0 },
  image: { type: String },
  likes: { type: Number, default: 0 },
  comments: [Schema.Types.ObjectId],
});

module.exports = mongoose.model("Product", productSchema);
