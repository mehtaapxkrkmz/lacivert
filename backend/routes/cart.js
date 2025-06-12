// routes/cart.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController'); // Sepet kontrolcüsü
//const { getCart, addToCart, removeFromCart, updateCartItem } = require('../controllers/cartController');
//const { protect } = require('../middleware/authMiddleware');  //giriş yapılmamışsa istek reddedilir.

//router.get('/', protect, getCart);
router.post('/add/:userId', cartController.addToCart); //  /add
//router.put('/update', protect, updateCartItem);
//router.delete('/remove/:productId/:size', protect, removeFromCart);

module.exports = router;
