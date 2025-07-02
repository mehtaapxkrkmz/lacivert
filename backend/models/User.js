// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  phone:     { type: String, required: true },
  gender:    { type: String, enum: ['Kadın','Erkek','Diğer'], required: true },
  birthdate: { type: Date, required: true },
  address:   { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  resetToken: String,
  resetTokenExpire: Date,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

// Parolayı kayıt öncesi hashle
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);