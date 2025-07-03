const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  text: { type: String, required: true, maxlength: 200 },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model("Comment", commentSchema);