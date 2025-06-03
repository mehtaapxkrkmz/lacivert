const Comment = require('../models/comment');

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
  },

  // GET /api/comments - Tüm yorumları getir
  getAllComments: async (req, res) => {
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
      await Comment.findByIdAndDelete(id);
      
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
  }
};

module.exports = commentController;