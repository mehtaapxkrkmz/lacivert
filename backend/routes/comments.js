const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// POST /api/comments - Yorum ekleme (Frontend'inizle uyumlu)
router.post('/', async (req, res) => {
  try {
    const { productId, text, rating } = req.body;
    
    console.log('Gelen veri:', { productId, text, rating }); // Debug için
    
    if (!productId || !text || text.trim() === '') {
      return res.status(400).json({ 
        success: false,
        message: "productId ve text zorunludur" 
      });
    }

    const newComment = new Comment({
      productId: parseInt(productId), // Number'a çevir
      text: text.trim(),
      rating: rating || 0,
      date: new Date()
    });

    const savedComment = await newComment.save();
    
    res.status(201).json({
      success: true,
      data: {
        id: savedComment._id,
        productId: savedComment.productId,
        text: savedComment.text,
        rating: savedComment.rating,
        date: savedComment.date.toLocaleDateString('tr-TR')
      }
    });
  } catch (error) {
    console.error('Yorum ekleme hatası:', error);
    res.status(500).json({ 
      success: false,
      message: 'Yorum eklenirken hata oluştu',
      error: error.message 
    });
  }
});

// GET /api/comments/product/:productId - Belirli ürünün yorumlarını getir
router.get('/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await Comment.find({ productId: parseInt(productId) })
                                  .sort({ date: -1 });
    
    const formattedComments = comments.map(comment => ({
      id: comment._id,
      productId: comment.productId,
      text: comment.text,
      rating: comment.rating,
      date: comment.date.toLocaleDateString('tr-TR')
    }));

    res.status(200).json({
      success: true,
      data: formattedComments
    });
  } catch (error) {
    console.error('Yorumları getirme hatası:', error);
    res.status(500).json({ 
      success: false,
      message: 'Yorumlar getirilirken hata oluştu',
      error: error.message 
    });
  }
});

// GET /api/comments - Tüm yorumları getir
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 });
    
    const formattedComments = comments.map(comment => ({
      id: comment._id,
      productId: comment.productId,
      text: comment.text,
      rating: comment.rating,
      date: comment.date.toLocaleDateString('tr-TR')
    }));

    res.status(200).json({
      success: true,
      data: formattedComments
    });
  } catch (error) {
    console.error('Tüm yorumları getirme hatası:', error);
    res.status(500).json({ 
      success: false,
      message: 'Yorumlar getirilirken hata oluştu',
      error: error.message 
    });
  }
});

module.exports = router;