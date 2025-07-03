const express = require('express');
const router = express.Router();
const Product = require('../models/product');

function collectFilterArray(filters, field) {
    return filters && filters[field] && Object.keys(filters[field]).length > 0
        ? Object.keys(filters[field]).filter(key => filters[field][key])
        : [];
}

// Ürün arama (searchTerm + filtreler)
router.post('/products/search', async (req, res) => {
    try {
        const { searchTerm, filters, sortOrder } = req.body;
        let filterQuery = {};

        // Split by comma, trim, and filter out empty strings
        const searchWords = searchTerm
            .split(',')
            .map(word => word.trim())
            .filter(word => word.length > 0);

        // If searchTerm is empty or only whitespace, or does not contain any letters (including Turkish), return empty array
        if (!searchWords.length || !searchWords.some(word => /[a-zA-ZğüşöçıİĞÜŞÖÇ]/i.test(word))) {
            return res.json([]);
        }

        let searchTermCategories = [];
        let orQueries = [];

        const categoryMap = {
            man: 'man', woman: 'woman', child: 'child',
            erkek: 'man', kadın: 'woman', cocuk: 'child', çocuk: 'child'
        };

        searchWords.forEach(word => {
            const normalized = word.toLowerCase();
            if (categoryMap[normalized]) {
                searchTermCategories.push(categoryMap[normalized]);
            } else {
                // Map synonyms and build regex for this word
                let mappedWord = word
                    .replace(/\bmale\b/gi, 'man')
                    .replace(/\bfemale\b/gi, 'woman')
                    .replace(/\bgirl\b/gi, 'woman')
                    .replace(/\bboy\b/gi, 'man')
                    .replace(/\bkid\b/gi, 'child')
                    .replace(/\bchildren\b/gi, 'child')
                    .replace(/\berkek\b/gi, 'man')
                    .replace(/\bkad[ıi]n\b/gi, 'woman')
                    .replace(/\bcocuk\b/gi, 'child')
                    .replace(/\bçocuk\b/gi, 'child');
                const regex = new RegExp(mappedWord, "i");
                orQueries.push(
                    { name: regex },
                    { description: regex },
                    { productType: regex },
                    { theme: regex },
                    { color: regex },
                    { fit: regex },
                    { category: regex }
                );
            }
        });

        // --- Collect category from searchTerm ---
        let searchTermCategory = null;
        if (searchTermCategories.length > 0) {
            searchTermCategory = searchTermCategories[0];
            if (searchTermCategories.length > 1) {
                filterQuery.category = { $in: searchTermCategories };
            }
        }

        // --- Collect category from filters ---
        let filterCategories = [];
        if (filters && filters.kategori && Object.keys(filters.kategori).length > 0) {
            filterCategories = Object.keys(filters.kategori)
                .filter(key => filters.kategori[key])
                .map(cat => cat.toLowerCase());
        }

        // --- Merge both sources ---
        let allCategories = [];
        if (searchTermCategory) allCategories.push(searchTermCategory);
        if (filterCategories.length > 0) allCategories.push(...filterCategories);

        // Remove duplicates
        allCategories = [...new Set(allCategories)];

        // Set filterQuery.category if any category is present
        if (allCategories.length === 1) {
            filterQuery.category = allCategories[0];
        } else if (allCategories.length > 1) {
            filterQuery.category = { $in: allCategories };
        }

        // Filtreler (ProductFilter ile aynı mantık)
        if (filters) {
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
            const selectedThemes = collectFilterArray(filters, 'tema');
            if (selectedThemes.length > 0) {
                filterQuery.theme = { $in: selectedThemes };
            }
            if (filters.fitKalip && Object.keys(filters.fitKalip).length > 0) {
                const selectedFits = Object.keys(filters.fitKalip).filter(key => filters.fitKalip[key]);
                if (selectedFits.length > 0) {
                    filterQuery.fit = { $in: selectedFits };
                }
            }
            if (filters.renk && Object.keys(filters.renk).length > 0) {
                const selectedColors = Object.keys(filters.renk).filter(key => filters.renk[key]);
                if (selectedColors.length > 0) {
                    filterQuery.color = { $in: selectedColors };
                }
            }
            if (filters.bel && Object.keys(filters.bel).length > 0) {
                const selectedWaists = Object.keys(filters.bel).filter(key => filters.bel[key]);
                if (selectedWaists.length > 0) {
                    filterQuery.waist = { $in: selectedWaists };
                }
            }
            if (filters.paça && Object.keys(filters.paça).length > 0) {
                const selectedLegs = Object.keys(filters.paça).filter(key => filters.paça[key]);
                if (selectedLegs.length > 0) {
                    filterQuery.leg = { $in: selectedLegs };
                }
            }
            if (filters.boy && Object.keys(filters.boy).length > 0) {
                const selectedLengths = Object.keys(filters.boy).filter(key => filters.boy[key]);
                if (selectedLengths.length > 0) {
                    filterQuery.length = { $in: selectedLengths };
                }
            }
            if (filters.kapüşon && Object.keys(filters.kapüşon).length > 0) {
                const selectedHoods = Object.keys(filters.kapüşon).filter(key => filters.kapüşon[key]);
                if (selectedHoods.length > 0) {
                    filterQuery.hood = { $in: selectedHoods };
                }
            }
            if (filters.yaka && Object.keys(filters.yaka).length > 0) {
                const selectedCollars = Object.keys(filters.yaka).filter(key => filters.yaka[key]);
                if (selectedCollars.length > 0) {
                    filterQuery.collar = { $in: selectedCollars };
                }
            }
            if (filters.dugme && Object.keys(filters.dugme).length > 0) {
                const selectedClosures = Object.keys(filters.dugme).filter(key => filters.dugme[key]);
                if (selectedClosures.length > 0) {
                    filterQuery.closure = { $in: selectedClosures };
                }
            }
            if (filters.kol && Object.keys(filters.kol).length > 0) {
                const selectedSleeves = Object.keys(filters.kol).filter(key => filters.kol[key]);
                if (selectedSleeves.length > 0) {
                    filterQuery.sleeve = { $in: selectedSleeves };
                }
            }
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
                    sortQuery.createdAt = -1;
            }
        }

        if (orQueries.length > 0) {
            filterQuery.$or = orQueries;
        }

        const products = await Product.find(filterQuery).sort(sortQuery);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 