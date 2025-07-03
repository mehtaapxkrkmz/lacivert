const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/Auth');

// POST /api/comments - Yorum ekleme (Ana endpoint)
router.post('/', auth, commentController.addComment);

// POST /api/comments/add - Yorum ekleme (Alternative endpoint)
router.post('/add', auth, commentController.addCommentAlternative);

// GET /api/comments/product/:productId - Belirli ürünün yorumlarını getir
router.get('/product/:productId', commentController.getCommentsByProduct);

// GET /api/comments - Tüm yorumları getir
router.get('/', commentController.getAllComments);

// DELETE /api/comments/:id - Yorum silme
router.delete('/:id', auth, commentController.deleteComment);

// PUT /api/comments/:id - Yorum  güncelleme
router.put('/:id', auth, commentController.updateComment);

module.exports = router;