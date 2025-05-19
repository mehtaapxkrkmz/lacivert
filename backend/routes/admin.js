const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// POST /admin/addProduct
router.post('/addProduct', async (req, res) => {
    try {
        const { name, images, description, price, stock, category, sizes, isDiscounted } = req.body;

        const newProduct = new Product({
            name,
            images,
            description,
            price,
            stock,
            category,
            sizes,
            isDiscounted
        });

        await newProduct.save();
        res.status(201).json({ message: 'Ürün başarıyla eklendi!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Bir hata oluştu!' });
    }
});

module.exports = router;
