import React, { useState, useRef, useEffect } from 'react';
import '/src/scss/productFilter.scss';
import Products from './Layout/Products';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Product from './Layout/Product';

const ProductFilter = ({ category }) => {
    const categoryMap = {
        "Kadın": "woman",
        "Erkek": "man",
        "Çocuk": "child"
    };
    const [activeFilters, setActiveFilters] = useState({});
    const [selectedOptions, setSelectedOptions] = useState(
        category ? { kategori: { [categoryMap[category] || category]: true } } : {}
    );
    const [sortOrder, setSortOrder] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const dropdownRef1 = useRef(null);
    const dropdownRef2 = useRef(null);
    const backendUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, ''); // Backend URL'ini environment variable'dan al
    const navigate = useNavigate();
    const location = useLocation();
    const [resetFlag, setResetFlag] = useState(false);
    const [initialFilterApplied, setInitialFilterApplied] = useState(false);

    // Handle initial filter from navigation
    useEffect(() => {
        if (location.state && location.state.initialFilter && !initialFilterApplied) {
            console.log("Applying initial filter:", location.state.initialFilter);
            setSelectedOptions(location.state.initialFilter);
            setInitialFilterApplied(true);
            // Clear the location state to prevent it from persisting
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate, location.pathname, initialFilterApplied]);

    // Reset initialFilterApplied when pathname changes (new navigation)
    useEffect(() => {
        setInitialFilterApplied(false);
    }, [location.pathname]);

    // Filter options for each category
    const filterOptions = {
        productType: ['T-shirt', 'Jean', 'Elbise', 'Ceket', 'Gömlek'],
        tema: ['Casual', 'Sport', 'Elegant', 'Vintage', 'Trendy'],
        fitKalip: ['Regular', 'Slim', 'Oversize', 'Skinny', 'Loose'],
        renk: ['Siyah', 'Beyaz', 'Mavi', 'Kırmızı', 'Yeşil'],
        beden: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        bel: ['Yüksek Bel', 'Orta Bel', 'Düşük Bel'],
        paça: ['Dar Paça', 'Geniş Paça', 'Straight', 'Bootcut'],
        boy: ['Mini', 'Midi', 'Maxi', 'Standart'],
        kapüşon: ['Kapüşonlu', 'Kapüşonsuz'],
        yaka: ['V Yaka', 'Bisiklet Yaka', 'Polo Yaka', 'Dik Yaka'],
        fiyat: ['0-100 TL', '100-200 TL', '200-500 TL', '500+ TL'],
        dugme: ['Düğmeli', 'Düğmesiz', 'Fermuarlı'],
        kol: ['Uzun Kol', 'Kısa Kol', 'Kolsuz'],
        siralama: ['Fiyat (Artan)', 'Fiyat (Azalan)'], // Sıralama seçenekleri
    };

    // Filter dropdowns configuration
    const filterDropdowns = [
        { id: 'productType', label: 'Kategori' },
        { id: 'tema', label: 'Tema' },
        { id: 'fitKalip', label: 'Fit/Kalıp' },
        { id: 'renk', label: 'Renk' },
        { id: 'beden', label: 'Beden' },
        { id: 'bel', label: 'Bel' },
        { id: 'paça', label: 'Paça' },
        { id: 'boy', label: 'Boy' },
    ];

    const additionalFilters = [
        { id: 'kapüşon', label: 'Kapüşon' },
        { id: 'yaka', label: 'Yaka' },
        { id: 'fiyat', label: 'Fiyat' },
        { id: 'dugme', label: 'Düğme/Fermuar' },
        { id: 'kol', label: 'Kol' },
    ];
    const sortFilter = [{ id: 'siralama', label: 'Sırala' }];

    // Backend'den filtrelenmiş ürünleri getir
    const fetchFilteredProducts = async () => {
        setLoading(true);
        try {
            const filtersToSend = {
                kategori: { [categoryMap[category] || category]: true },
                ...selectedOptions,
            };
            console.log("Fetching products with filters:", filtersToSend);
            const response = await fetch(`${backendUrl}/api/products/filter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    filters: filtersToSend,
                    sortOrder: sortOrder
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("filtersToSend", filtersToSend);
            console.log("filtre data", data);
            setFilteredProducts(data);
        } catch (error) {
            console.error('Filtreleme hatası:', error);
            setFilteredProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Filtreler değiştiğinde ürünleri yeniden getir
    useEffect(() => {
        console.log("selectedOptions changed:", selectedOptions);
        console.log("initialFilterApplied:", initialFilterApplied);
        fetchFilteredProducts();
    }, [selectedOptions, sortOrder, initialFilterApplied]);

    // Kategori değiştiğinde ve selectedOptions.kategori güncellendiğinde ürünleri hemen getir
    useEffect(() => {
        if (
            category &&
            selectedOptions.kategori &&
            selectedOptions.kategori[categoryMap[category] || category]
        ) {
            fetchFilteredProducts();
        }
    }, [category, selectedOptions.kategori]);

    // Kategori değiştiğinde selectedOptions'ı güncelle
    useEffect(() => {
        if (category && !initialFilterApplied) {
            console.log("Category changed, resetting filters for:", category);
            setSelectedOptions({ kategori: { [categoryMap[category] || category]: true } });
            setActiveFilters({});
            setSortOrder(null);
            setResetFlag(true);
        }
    }, [category, initialFilterApplied]);

    useEffect(() => {
        if (resetFlag) {
            fetchFilteredProducts();
            setResetFlag(false);
        }
    }, [selectedOptions, resetFlag]);

    // Toggle dropdown visibility
    const toggleDropdown = (filterId) => {
        setActiveFilters((prevFilters) => ({
            [filterId]: !prevFilters[filterId],
        }));
    };

    const handleCheckboxChange = (filterId, option) => {
        // Ana kategori kaldırılmak istenirse engelle
        if (filterId === 'kategori' && option === categoryMap[category]) {
            return;
        }
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [filterId]: {
                ...prevOptions[filterId],
                [option]: !prevOptions[filterId]?.[option]
            }
        }));
    };

    const handleSortOrder = (order) => {
        setSortOrder(order);
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            siralama: {
                'Fiyat (Artan)': false,
                'Fiyat (Azalan)': false,
                [order]: true
            }
        }));
        setActiveFilters({}); // Sıralama seçildikten sonra tüm filtreleri kapat
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isOutsideDropdown1 = dropdownRef1.current && !dropdownRef1.current.contains(event.target);
            const isOutsideDropdown2 = dropdownRef2.current && !dropdownRef2.current.contains(event.target);

            if (isOutsideDropdown1 && isOutsideDropdown2) {
                setActiveFilters({});
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // Eğer kategori filtresi yoksa veya hiçbiri seçili değilse, anasayfaya yönlendir
        if (
            category &&
            (!selectedOptions.kategori ||
                Object.values(selectedOptions.kategori).every(v => !v))
        ) {
            navigate('/');
        }
    }, [selectedOptions.kategori, category, navigate]);

    return (
        <div className="product-filter">
            <div className="breadcrumbs">
                <a href="/">Anasayfa</a>
                <span> | </span>
                <span>{category}</span>
            </div>

            <h1 className="category-title">{category} Giyim</h1>

            <div className="filter-row" ref={dropdownRef1}>
                {filterDropdowns.map((filter) => (
                    <div key={filter.id} className={`filter-dropdown ${activeFilters[filter.id] ? 'active' : ''}`}>
                        <button
                            className="dropdown-toggle"
                            onClick={() => toggleDropdown(filter.id)}
                        >
                            {filter.label === "Düğme/Fermuar" ? (
                                <>
                                    <span className="ellipsis-label">{filter.label}</span>
                                    <span className="arrow-icon">▼</span>
                                </>
                            ) : (
                                <>
                                    {filter.label}
                                    <span className="arrow-icon">▼</span>
                                </>
                            )}
                        </button>
                        {activeFilters[filter.id] && (
                            <div className="dropdown-menu">
                                {filterOptions[filter.id]?.map((option) => (
                                    <label key={option} className="dropdown-item">
                                        <input
                                            type="checkbox"
                                            checked={selectedOptions[filter.id]?.[option] || false}
                                            onChange={() => handleCheckboxChange(filter.id, option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {sortFilter.map((filter) => (
                    <div key={filter.id} className={`filter-dropdown ${activeFilters[filter.id] ? 'active' : ''}`}
                        style={{ marginLeft: 'auto', marginRight: '70px' }}>
                        <button
                            className="dropdown-toggle"
                            onClick={() => toggleDropdown(filter.id)}
                        >
                            {filter.label}
                            <span className="arrow-icon">▼</span>
                        </button>
                        {activeFilters[filter.id] && (
                            <div className="dropdown-menu">
                                {filterOptions[filter.id]?.map((option) => (
                                    <label
                                        key={option}
                                        className="dropdown-item"
                                        onClick={() => handleSortOrder(option)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedOptions['siralama']?.[option] || false}
                                            readOnly
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="filter-row" ref={dropdownRef2}>
                {additionalFilters.map((filter) => (
                    <div key={filter.id} className={`filter-dropdown ${activeFilters[filter.id] ? 'active' : ''}`}>
                        <button
                            className="dropdown-toggle"
                            onClick={() => toggleDropdown(filter.id)}
                        >
                            {filter.label === "Düğme/Fermuar" ? (
                                <>
                                    <span className="ellipsis-label">{filter.label}</span>
                                    <span className="arrow-icon">▼</span>
                                </>
                            ) : (
                                <>
                                    {filter.label}
                                    <span className="arrow-icon">▼</span>
                                </>
                            )}
                        </button>
                        {activeFilters[filter.id] && (
                            <div className="dropdown-menu">
                                {filterOptions[filter.id]?.map((option) => (
                                    <label key={option} className="dropdown-item">
                                        <input
                                            type="checkbox"
                                            checked={selectedOptions[filter.id]?.[option] || false}
                                            onChange={() => handleCheckboxChange(filter.id, option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="filter-divider"></div>

            {/* Seçili filtreler kutucukları */}
            <div className="selected-filters-row">
                {Object.entries(selectedOptions).map(([filterId, options]) =>
                    Object.entries(options)
                        .filter(([option, isSelected]) =>
                            isSelected && !(filterId === 'kategori' && option === categoryMap[category])
                        )
                        .map(([option]) => (
                            <span className="selected-filter" key={filterId + option}>
                                {option}
                                <button
                                    className="remove-filter-btn"
                                    onClick={() => {
                                        setSelectedOptions(prev => ({
                                            ...prev,
                                            [filterId]: {
                                                ...prev[filterId],
                                                [option]: false
                                            }
                                        }));
                                    }}
                                >
                                    ×
                                </button>
                            </span>
                        ))
                )}
                {Object.entries(selectedOptions).some(([filterId, options]) =>
                    Object.entries(options).some(([option, isSelected]) =>
                        isSelected && !(filterId === 'kategori' && option === categoryMap[category])
                    )
                ) && (
                        <a
                            className="clear-all-filters"
                            href="#"
                            onClick={e => {
                                e.preventDefault();
                                setSelectedOptions({
                                    kategori: { [categoryMap[category]]: true },
                                    productType: {},
                                });
                                setSortOrder(null);
                            }}
                        >
                            Tümünü Sil
                        </a>
                    )}
            </div>

            {/* Filtrelenmiş ürünleri göster */}
            {loading ? (
                <div className="loading">Ürünler yükleniyor...</div>
            ) : (
                <div className="products">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Product key={product._id} product={product} />
                        ))
                    ) : (
                        <p>Filtre kriterlerinize uygun ürün bulunamadı.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductFilter;
