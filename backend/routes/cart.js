// routes/cart.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController'); // Sepet kontrolcüsü
const authMiddleware = require('../middleware/Auth');
//const { getCart, addToCart, removeFromCart, updateCartItem } = require('../controllers/cartController');
//const { protect } = require('../middleware/authMiddleware');  //giriş yapılmamışsa istek reddedilir.np

router.get('/:userId', authMiddleware, cartController.getCart);
//router.get('/:userId', protect, cartController.getCart);
router.post('/add/:userId', authMiddleware, cartController.addToCart); //  /add
router.put('/update/:userId', authMiddleware, cartController.updateCartItem);
//router.put('/update', protect, cartController.updateCartItem);
router.delete('/remove/:userId/:productId/:size', authMiddleware, cartController.removeFromCart);
//router.delete('/remove/:productId/:size', protect, cartController.removeFromCart);
router.delete('/clear/:userId', authMiddleware, cartController.clearCart);

module.exports = router;
