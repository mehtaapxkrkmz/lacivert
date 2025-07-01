const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/Auth');

// ➕ Favori ekle
router.post('/:productId', auth, async (req, res) => {
  console.log('FAVORİ EKLEME API ÇAĞRILDI:', req.params.productId);
  const userId = req.user.id;
  const productId = req.params.productId;

  try {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { favorites: productId }
    });
    res.json({ message: 'Ürün favorilere eklendi' });
  } catch (err) {
    res.status(500).json({ message: 'Favori eklenemedi' });
  }
});

// ❌ Favori çıkar
router.delete('/:productId', auth, async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  try {
    await User.findByIdAndUpdate(userId, {
      $pull: { favorites: productId }
    });
    res.json({ message: 'Ürün favorilerden çıkarıldı' });
  } catch (err) {
    res.status(500).json({ message: 'Favori silinemedi' });
  }
});

// ✅ Tüm favorileri al
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    res.json(user.favorites || []);
  } catch (err) {
    res.status(500).json({ message: 'Favoriler alınamadı' });
  }
});

module.exports = router;