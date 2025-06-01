const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  productId: { type: Number, required: true }, // Frontend'iniz Number gönderiyor
  text: { type: String, required: true, maxlength: 200 },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);