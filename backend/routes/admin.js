const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const adminController = require('../controllers/admin');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file.originalname);
        if (!isImage) {
            return cb(new Error('Sadece resim dosyaları yüklenebilir!'), false);
        }
        cb(null, true);
    },
    limits: { fileSize: 10 * 1024 * 1024 }
});

// Routes

router.post('/addProduct', upload.array('images', 4), adminController.addProduct);
router.get('/products', adminController.getProducts);
router.get('/products/:id', adminController.getProductById);
router.delete('/products/:id', adminController.deleteProduct);
router.put('/products/:id/image/:imageIndex', upload.single('image'), adminController.updateProductImage);
router.put('/products/:id', adminController.updateProduct);

module.exports = router;
