const Comment = require('../models/comment');
const mongoose = require('mongoose');
//const redisClient = require('../utils/redisClient'); 

const commentController = {
  // POST /api/comments - Yorum ekleme
  addComment: async (req, res) => {
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
        productId: productId, // Doğrudan string (ObjectId) olarak bırak
        text: text.trim(),
        rating: rating || 0,
        date: new Date(),
        user: req.user.id // Kullanıcı ID'si eklendi (JWT'den id geliyor)
      });

      const savedComment = await newComment.save();
      // userEmail için populate
      const populatedComment = await Comment.findById(savedComment._id).populate('user', 'email');
      
      // Yorum eklendikten sonra cache'i sil
      // await redisClient.del(`product:${productId}:comments`); //
      
      res.status(201).json({
        success: true,
        data: {
          id: populatedComment._id,
          productId: populatedComment.productId,
          text: populatedComment.text,
          rating: populatedComment.rating,
          date: populatedComment.date.toLocaleDateString('tr-TR'),
          user: populatedComment.user?._id,
          userEmail: populatedComment.user?.email
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
  },

  // POST /api/comments/add - Alternative endpoint
  addCommentAlternative: async (req, res) => {
    try {
      const { productId, text, rating } = req.body;
      
      console.log('Gelen veri:', { productId, text, rating });
      
      if (!productId || !text || text.trim() === '') {
        return res.status(400).json({ 
          success: false,
          message: "productId ve text zorunludur" 
        });
      }

      const newComment = new Comment({
        productId: parseInt(productId),
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
  },

  // GET /api/comments/product/:productId - Belirli ürünün yorumlarını getir
  getCommentsByProduct: async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
        return res.status(400).json({ message: 'Geçersiz ürün ID' });
      }
      // const cacheKey = `product:${req.params.productId}:comments`;
      // // Önce Redis'te var mı bak
      // const cached = await redisClient.get(cacheKey);
      // if (cached) {
      //   console.log("Redis cache'den geldi!");
      //   return res.status(200).json({
      //     success: true,
      //     data: JSON.parse(cached)
      //   });
      // }
      // Sadece productId'si geçerli ObjectId olan yorumları getir
      const comments = await Comment.find({
        productId: req.params.productId,
        user: { $exists: true, $ne: null }
      }).sort({ date: -1 }).populate('user', 'email');
      
      const formattedComments = comments.map(comment => ({
        id: comment._id,
        productId: comment.productId,
        text: comment.text,
        rating: comment.rating,
        date: comment.date.toLocaleDateString('tr-TR'),
        user: comment.user?._id,
        userEmail: comment.user?.email
      }));
      // Redis'e yaz (ör: 1 saatlik)
      // await redisClient.set(cacheKey, JSON.stringify(formattedComments), { EX: 3600 });
      res.status(200).json({ success: true, data: formattedComments });
    } catch (error) {
      console.error('Yorumları getirme hatası:', error);
      res.status(500).json({ message: 'Yorumlar getirilirken hata oluştu' });
    }
  },

  // GET /api/comments - Tüm yorumları getir
  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.find().sort({ date: -1 }).populate('user', 'email');
      
      const formattedComments = comments.map(comment => ({
        id: comment._id,
        productId: comment.productId,
        text: comment.text,
        rating: comment.rating,
        date: comment.date.toLocaleDateString('tr-TR'),
        user: comment.user?._id,
        userEmail: comment.user?.email
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
  },

  // DELETE /api/comments/:id - Yorum silme
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      
      console.log('Silinecek yorum ID:', id); // Debug için
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Yorum ID\'si gerekli.'
        });
      }

      // Yorumu veritabanından bul
      const comment = await Comment.findById(id);
      
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: 'Yorum bulunamadı.'
        });
      }

      // Yorumu sil
      if (!comment.user) {
        return res.status(403).json({ success: false, message: 'Bu yorumun sahibi yok, işlem yapılamaz.' });
      }
      if (comment.user.toString() !== req.user.id) {
        return res.status(403).json({ success: false, message: 'Bu yorumu sadece sahibi silebilir.' });
      }
      await Comment.findByIdAndDelete(id);
      
      // Yorum silindikten sonra cache'i sil
      //  if (comment && comment.productId) { //
      //    await redisClient.del(`product:${comment.productId}:comments`); // 
      //  } //
      
      res.status(200).json({
        success: true,
        message: 'Yorum başarıyla silindi.',
        data: {
          deletedCommentId: id
        }
      });
      
    } catch (error) {
      console.error('Yorum silme hatası:', error);
      res.status(500).json({
        success: false,
        message: 'Yorum silinirken hata oluştu',
        error: error.message
      });
    }
  },

  // PUT /api/comments/:id - Yorum güncelleme
  updateComment: async (req, res) => {
    try {
      const { id } = req.params;
      const { text, rating } = req.body;
      
      console.log('Güncellenecek yorum ID:', id, 'Yeni metin:',text, 'Yeni rating:', rating); // Debug için
      
      // Veri doğrulama
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Yorum ID\'si gerekli.'
        });
      }

      if (!text || text.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Yorum metni boş olamaz.'
        });
      }

      // Yorumu veritabanından bul
      const existingComment = await Comment.findById(id);
      
      if (!existingComment) {
        return res.status(404).json({
          success: false,
          message: 'Yorum bulunamadı.'
        });
      }

      // Yorumu güncelle
      if (!existingComment.user) {
        return res.status(403).json({ success: false, message: 'Bu yorumun sahibi yok, işlem yapılamaz.' });
      }
      if (existingComment.user.toString() !== req.user.id) {
        return res.status(403).json({ success: false, message: 'Bu yorumu sadece sahibi güncelleyebilir.' });
      }
      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { text, rating },
        { new: true }
      );

      // userEmail için populate
      const populatedComment = await Comment.findById(updatedComment._id).populate('user', 'email');

      // Yorum güncellendikten sonra cache'i sil 
      //if (existingComment && existingComment.productId) { //
      //  await redisClient.del(`product:${existingComment.productId}:comments`); //
      //}

      res.status(200).json({
        success: true,
        message: 'Yorum başarıyla güncellendi.',
        data: {
          id: populatedComment._id,
          productId: populatedComment.productId,
          text: populatedComment.text,
          rating: populatedComment.rating,
          date: populatedComment.date.toLocaleDateString('tr-TR'),
          user: populatedComment.user?._id,
          userEmail: populatedComment.user?.email
        }
      });
      
    } catch (error) {
      console.error('Yorum güncelleme hatası:', error);
      res.status(500).json({
        success: false,
        message: 'Yorum güncellenirken hata oluştu',
        error: error.message
      });
    }
  }
};

module.exports = commentController;