const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/product');

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

// Multer upload configuration
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file.originalname);
        if (!isImage) {
            return cb(new Error('Sadece resim dosyaları yüklenebilir!'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

// POST /admin/addProduct
router.post('/addProduct', upload.array('images', 4), async (req, res) => {
    try {
        const { name, description, price, stock, category, sizes, isDiscounted, score } = req.body;

        // Zorunlu alan kontrolü
        if (!name || !description || !price || !category || !sizes) {
            return res.status(400).json({ message: 'Tüm zorunlu alanları doldurun.' });
        }

        // Resim kontrolü
        if (!req.files || req.files.length < 1) {
            return res.status(400).json({ message: 'En az 1 adet resim yüklenmeli.' });
        }

        // Resim URL'lerini oluştur
        const images = req.files.map(file => `/uploads/${file.filename}`);

        // sizes verisi string olarak geldiyse JSON parse et
        let parsedSizes;
        try {
            parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
        } catch (err) {
            console.error('Sizes parse hatası:', err);
            return res.status(400).json({ message: 'Geçersiz beden verisi formatı.' });
        }

        const newProduct = new Product({
            name,
            images,
            description,
            price: parseFloat(price),
            stock: parseInt(stock) || 0,
            category,
            sizes: parsedSizes,
            isDiscounted: isDiscounted === 'true' || isDiscounted === true,
            score: parseFloat(score) || 0
        });

        await newProduct.save();
        res.status(201).json({ message: 'Ürün başarıyla eklendi!', product: newProduct });
    } catch (err) {
        console.error('Ürün ekleme hatası:', err);
        // Detaylı hata bilgisi
        res.status(500).json({ 
            message: 'Ürün eklenirken bir hata oluştu.', 
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});

module.exports = router;
