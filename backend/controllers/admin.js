const Product = require('../models/product');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

// Controller fonksiyonları:

exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category, sizes, isDiscounted, score,
            productType, theme, fit, color, waist, leg, length, hood, collar, closure, sleeve
        } = req.body;

        if (!name || !description || !price || !category || !sizes) {
            return res.status(400).json({ message: 'Tüm zorunlu alanları doldurun.' });
        }
        if (!req.files || req.files.length < 1) {
            return res.status(400).json({ message: 'En az 1 adet resim yüklenmeli.' });
        }
        const images = req.files.map(file => file.path);

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
            stock: stock ? parseInt(stock) : 0,
            category,
            sizes: parsedSizes,
            isDiscounted: isDiscounted === 'true' || isDiscounted === true,
            score: parseFloat(score) || 0,
            productType,
            theme,
            fit,
            color,
            waist,
            leg,
            length,
            hood,
            collar,
            closure,
            sleeve
        });

        await newProduct.save();
        res.status(201).json({ message: 'Ürün başarıyla eklendi!', product: newProduct });
    } catch (err) {
        console.error('addProduct HATASI:', err);
        return res.status(500).json({ message: 'Bir hata oluştu.', error: err.message, stack: err.stack });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error('Ürünleri alma hatası:', err);
        res.status(500).json({ message: 'Ürünler getirilirken bir hata oluştu.', error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Ürün bulunamadı.' });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error('Ürün getirme hatası:', err);
        res.status(500).json({ message: 'Ürün getirilirken bir hata oluştu.', error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Ürün bulunamadı.' });
        }
        for (const imagePath of product.images) {
            const fullPath = path.join(__dirname, '..', imagePath);
            try {
                await unlinkAsync(fullPath);
            } catch (err) {
                console.warn(`Resim silinemedi: ${fullPath}`, err.message);
            }
        }
        await Product.findByIdAndDelete(productId);
        res.status(200).json({ message: 'Ürün ve resimleri başarıyla silindi.' });
    } catch (err) {
        console.error('Ürün silme hatası:', err);
        res.status(500).json({ message: 'Ürün silinirken bir hata oluştu.', error: err.message });
    }
};

exports.updateProductImage = async (req, res) => {
    try {
        const productId = req.params.id;
        const imageIndex = parseInt(req.params.imageIndex);

        if (!req.file) {
            return res.status(400).json({ message: 'Resim dosyası yüklenmedi.' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Ürün bulunamadı.' });
        }

        if (product.images[imageIndex]) {
            const oldImagePath = path.join(__dirname, '..', product.images[imageIndex]);
            try {
                await unlinkAsync(oldImagePath);
            } catch (err) {
                console.warn(`Eski resim silinemedi: ${oldImagePath}`, err.message);
            }
        }

        const newImagePath = `/uploads/${req.file.filename}`;
        product.images[imageIndex] = newImagePath;

        await product.save();
        res.status(200).json({ message: 'Resim başarıyla güncellendi.', images: product.images });
    } catch (err) {
        console.error('Resim güncelleme hatası:', err);
        res.status(500).json({ message: 'Resim güncellenirken bir hata oluştu.', error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, description, price, stock, category, sizes, score, isDiscounted,
            productType, theme, fit, color, waist, leg, length, hood, collar, closure, sleeve
        } = req.body;

        if (!name || !description || !price || !category || !sizes) {
            return res.status(400).json({ message: 'Tüm zorunlu alanları doldurun.' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Ürün bulunamadı.' });
        }

        let parsedSizes;
        try {
            parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
        } catch (err) {
            console.error('Sizes parse hatası:', err);
            return res.status(400).json({ message: 'Geçersiz beden verisi formatı.' });
        }

        product.name = name;
        product.description = description;
        product.price = parseFloat(price);
        product.stock = stock ? parseInt(stock) : 0;
        product.category = category;
        product.sizes = parsedSizes;
        product.score = parseFloat(score) || 0;
        product.isDiscounted = isDiscounted === 'true' || isDiscounted === true;
        product.productType = productType;
        product.theme = theme;
        product.fit = fit;
        product.color = color;
        product.waist = waist;
        product.leg = leg;
        product.length = length;
        product.hood = hood;
        product.collar = collar;
        product.closure = closure;
        product.sleeve = sleeve;

        await product.save();
        res.status(200).json({ message: 'Ürün başarıyla güncellendi.', product });
    } catch (err) {
        console.error('Ürün güncelleme hatası:', err);
        res.status(500).json({ message: 'Ürün güncellenirken bir hata oluştu.', error: err.message });
    }
};
