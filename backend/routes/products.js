// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Tüm ürünleri getir
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Kategoriye göre ürünleri getir
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Filtrelenmiş ürünleri getir
router.post('/filter', async (req, res) => {
    try {
        const { filters, sortOrder } = req.body;

        // Filtre objesi oluştur
        let filterQuery = {};

        if (filters) {
            // Kategori filtresi
            if (filters.kategori && Object.keys(filters.kategori).length > 0) {
                const selectedCategories = Object.keys(filters.kategori).filter(key => filters.kategori[key]);
                if (selectedCategories.length > 0) {
                    filterQuery.category = { $in: selectedCategories.map(cat => cat.toLowerCase()) };
                }
            }

            // Fiyat filtresi
            if (filters.fiyat && Object.keys(filters.fiyat).length > 0) {
                const selectedPrices = Object.keys(filters.fiyat).filter(key => filters.fiyat[key]);
                if (selectedPrices.length > 0) {
                    const priceRanges = selectedPrices.map(priceRange => {
                        switch (priceRange) {
                            case '0-100 TL':
                                return { $gte: 0, $lte: 100 };
                            case '100-200 TL':
                                return { $gte: 100, $lte: 200 };
                            case '200-500 TL':
                                return { $gte: 200, $lte: 500 };
                            case '500+ TL':
                                return { $gte: 500 };
                            default:
                                return {};
                        }
                    });
                    filterQuery.price = { $or: priceRanges };
                }
            }

            // Tema filtresi
            if (filters.tema && Object.keys(filters.tema).length > 0) {
                const selectedThemes = Object.keys(filters.tema).filter(key => filters.tema[key]);
                if (selectedThemes.length > 0) {
                    filterQuery.theme = { $in: selectedThemes };
                }
            }

            // Fit/Kalıp filtresi
            if (filters.fitKalip && Object.keys(filters.fitKalip).length > 0) {
                const selectedFits = Object.keys(filters.fitKalip).filter(key => filters.fitKalip[key]);
                if (selectedFits.length > 0) {
                    filterQuery.fit = { $in: selectedFits };
                }
            }

            // Renk filtresi
            if (filters.renk && Object.keys(filters.renk).length > 0) {
                const selectedColors = Object.keys(filters.renk).filter(key => filters.renk[key]);
                if (selectedColors.length > 0) {
                    filterQuery.color = { $in: selectedColors };
                }
            }

            // Bel filtresi
            if (filters.bel && Object.keys(filters.bel).length > 0) {
                const selectedWaists = Object.keys(filters.bel).filter(key => filters.bel[key]);
                if (selectedWaists.length > 0) {
                    filterQuery.waist = { $in: selectedWaists };
                }
            }

            // Paça filtresi
            if (filters.paça && Object.keys(filters.paça).length > 0) {
                const selectedLegs = Object.keys(filters.paça).filter(key => filters.paça[key]);
                if (selectedLegs.length > 0) {
                    filterQuery.leg = { $in: selectedLegs };
                }
            }

            // Boy filtresi
            if (filters.boy && Object.keys(filters.boy).length > 0) {
                const selectedLengths = Object.keys(filters.boy).filter(key => filters.boy[key]);
                if (selectedLengths.length > 0) {
                    filterQuery.length = { $in: selectedLengths };
                }
            }

            // Kapüşon filtresi
            if (filters.kapüşon && Object.keys(filters.kapüşon).length > 0) {
                const selectedHoods = Object.keys(filters.kapüşon).filter(key => filters.kapüşon[key]);
                if (selectedHoods.length > 0) {
                    filterQuery.hood = { $in: selectedHoods };
                }
            }

            // Yaka filtresi
            if (filters.yaka && Object.keys(filters.yaka).length > 0) {
                const selectedCollars = Object.keys(filters.yaka).filter(key => filters.yaka[key]);
                if (selectedCollars.length > 0) {
                    filterQuery.collar = { $in: selectedCollars };
                }
            }

            // Düğme/Fermuar filtresi
            if (filters.dugme && Object.keys(filters.dugme).length > 0) {
                const selectedClosures = Object.keys(filters.dugme).filter(key => filters.dugme[key]);
                if (selectedClosures.length > 0) {
                    filterQuery.closure = { $in: selectedClosures };
                }
            }

            // Kol filtresi
            if (filters.kol && Object.keys(filters.kol).length > 0) {
                const selectedSleeves = Object.keys(filters.kol).filter(key => filters.kol[key]);
                if (selectedSleeves.length > 0) {
                    filterQuery.sleeve = { $in: selectedSleeves };
                }
            }

            // Alt kategori (productType) filtresi
            if (filters.productType && Object.keys(filters.productType).length > 0) {
                const selectedTypes = Object.keys(filters.productType).filter(key => filters.productType[key]);
                if (selectedTypes.length > 0) {
                    filterQuery.productType = { $in: selectedTypes };
                }
            }
        }

        // Sıralama
        let sortQuery = {};
        if (sortOrder) {
            switch (sortOrder) {
                case 'Fiyat (Artan)':
                    sortQuery.price = 1;
                    break;
                case 'Fiyat (Azalan)':
                    sortQuery.price = -1;
                    break;
                default:
                    sortQuery.createdAt = -1; // Varsayılan sıralama
            }
        }

        const products = await Product.find(filterQuery).sort(sortQuery);
        res.json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 