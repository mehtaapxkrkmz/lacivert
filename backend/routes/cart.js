// routes/cart.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController'); // Sepet kontrolcüsü
//const { getCart, addToCart, removeFromCart, updateCartItem } = require('../controllers/cartController');
//const { protect } = require('../middleware/authMiddleware');  //giriş yapılmamışsa istek reddedilir.np

router.get('/:userId', cartController.getCart);
//router.get('/:userId', protect, cartController.getCart);
router.post('/add/:userId', cartController.addToCart); //  /add
router.put('/update/:userId', cartController.updateCartItem);
//router.put('/update', protect, cartController.updateCartItem);
router.delete('/remove/:userId/:productId/:size', cartController.removeFromCart);
//router.delete('/remove/:productId/:size', protect, cartController.removeFromCart);
router.delete('/clear/:userId', cartController.clearCart);

module.exports = router;
