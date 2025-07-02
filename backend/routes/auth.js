require('dotenv').config(); //

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  // jwt'yi aktarıyoruz
const authMiddleware = require('../middleware/Auth');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const { sendToQueue } = require('../rabbitmq');

const JWT_SECRET = process.env.JWT_SECRET || '';

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    // JWT oluştur
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({
      message: 'Giriş başarılı',
      token,   // token'ı frontend'e yolluyoruz
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, phone, gender, birthdate, address, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kayıtlı.' });
    }

    const newUser = new User({ firstname, lastname, phone, gender, birthdate, address, email, password });
    await newUser.save();

    // Kayıttan sonra token oluşturup dönebiliriz
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1d' });
    await sendToQueue({
      email: newUser.email,
      firstname: newUser.firstname
    });

    res.status(201).json({
      message: 'Kayıt başarılı',
      token,
      user: {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Kullanıcı güncelleme
router.put('/:id',authMiddleware , async (req, res) => {
     // Sadece kendi profilini güncelleyebilsin kontrolü:
  if (req.user.id !== req.params.id) {
    return res.status(403).json({ message: 'Bu işlemi yapmaya yetkiniz yok.' });
  }
     try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Güncelleme sırasında hata oluştu.' });
  }
});

//kullanıcı silme
// DELETE /api/users/:id

router.delete('/:id',authMiddleware, async (req, res) => {
  // sadece kendi hesabını silebilsin
  if (req.user.id !== req.params.id) {
    return res.status(403).json({ message: 'Bu işlemi yapmaya yetkiniz yok.' });
  }
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }
    res.status(200).json({ message: 'Kullanıcı silindi.' });
  } catch (err) {
    console.error('Silme hatası:', err);
    res.status(500).json({ error: 'Silme sırasında hata oluştu.' });
  }
});


router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });

  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.resetTokenExpire = Date.now() + 1000 * 60 * 15; // 15 dk
  await user.save();

  // Gmail ile mail gönder
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


  
  const resetUrl = `https://lacivert-proje2.vercel.app/reset-password/${token}`;

  
  await transporter.sendMail({
    to: user.email,
    subject: 'Şifre Sıfırlama',
    html: `<p>Şifreni sıfırlamak için <a href="${resetUrl}">buraya tıkla</a></p>`
  });

  res.json({ message: 'E-posta gönderildi' });
});




// Şifre sıfırlama: Token ile yeni şifre belirleme
// Şifre sıfırlama: Token ile yeni şifre belirleme
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Şifre en az 6 karakter olmalı.' });
  }

  try {
    // Sadece token ve süresini kontrol et
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Token geçersiz veya süresi dolmuş.' });
    }

    // Yeni şifreyi hashle ve kaydet
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

  

    res.json({ message: 'Şifre başarıyla sıfırlandı.' });
  } catch (err) {
    console.error('Reset Password Error:', err.message);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});
module.exports = router;