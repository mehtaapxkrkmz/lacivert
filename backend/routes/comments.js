const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// POST /api/comments - Yorum ekleme (Ana endpoint)
router.post('/', commentController.addComment);

// POST /api/comments/add - Yorum ekleme (Alternative endpoint)
router.post('/add', commentController.addCommentAlternative);

// GET /api/comments/product/:productId - Belirli ürünün yorumlarını getir
router.get('/product/:productId', commentController.getCommentsByProduct);

// GET /api/comments - Tüm yorumları getir
router.get('/', commentController.getAllComments);

// DELETE /api/comments/:id - Yorum silme
router.delete('/:id', commentController.deleteComment);

// PUT /api/comments/:id - Yorum  güncelleme

router.put('/:id', commentController.updateComment);


module.exports = router;