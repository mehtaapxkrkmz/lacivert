import React, { useState, useRef, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import Product from './Product';
import "../../../scss/SearchPage.scss";

const genderOptions = [
    { id: 'woman', label: 'Kadın' },
    { id: 'man', label: 'Erkek' },
    { id: 'child', label: 'Çocuk' }
];

const genderLabelMap = {
    woman: 'Kadın',
    man: 'Erkek',
    child: 'Çocuk'
};

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedGender, setSelectedGender] = useState(null);
    const [activeFilters, setActiveFilters] = useState({});
    const [selectedOptions, setSelectedOptions] = useState({});
    const [loading, setLoading] = useState(false);
    const dropdownRef1 = useRef(null);
    const backendUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

    // Filter options (copied from ProductFilter.jsx)
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
    };

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

    // Update search input when gender or filters change
    useEffect(() => {
        let terms = [];
        if (selectedGender) terms.push(genderLabelMap[selectedGender]);
        Object.entries(selectedOptions).forEach(([filterId, options]) => {
            Object.entries(options).forEach(([option, isSelected]) => {
                if (isSelected) terms.push(option);
            });
        });
        setSearchTerm(terms.join(', '));
    }, [selectedGender, selectedOptions]);

    // Fetch search results from backend
    const fetchSearchResults = async () => {
        setIsSearching(true);
        setLoading(true);
        try {
            // Build filters object, include gender if selected
            let filtersToSend = { ...selectedOptions };
            if (selectedGender) {
                filtersToSend.kategori = { [selectedGender]: true };
            }
            const response = await fetch(`${backendUrl}/api/products/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    searchTerm: searchTerm,
                    filters: filtersToSend
                }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            setSearchResults([]);
        } finally {
            setIsSearching(false);
            setLoading(false);
        }
    };

    // Handle filter dropdowns
    const toggleDropdown = (filterId) => {
        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            [filterId]: !prevFilters[filterId],
        }));
    };

    const handleCheckboxChange = (filterId, option) => {
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [filterId]: {
                ...prevOptions[filterId],
                [option]: !prevOptions[filterId]?.[option]
            }
        }));
        // Close the dropdown after selection
        setActiveFilters(prevFilters => ({ ...prevFilters, [filterId]: false }));
    };

    // Search on Enter or filter change
    useEffect(() => {
        if (searchTerm.trim() !== '' || Object.keys(selectedOptions).length > 0) {
            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
        // eslint-disable-next-line
    }, [searchTerm, selectedOptions]);

    // UI
    return (
        <div className='search-page'>
            {/* Gender Buttons */}
            <div className="gender-buttons-row" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: 18 }}>
                {genderOptions.map(gender => (
                    <button
                        key={gender.id}
                        className={`gender-btn${selectedGender === gender.id ? ' active' : ''}`}
                        style={{
                            padding: '7px 18px',
                            fontSize: '15px',
                            borderRadius: '16px',
                            border: selectedGender === gender.id ? '2px solid #1a3a5d' : '1px solid #bbb',
                            background: selectedGender === gender.id ? '#e6f0fa' : '#f7f7f7',
                            color: selectedGender === gender.id ? '#1a3a5d' : '#222',
                            cursor: 'pointer',
                            minWidth: 70,
                            transition: 'all 0.15s',
                            fontWeight: selectedGender === gender.id ? 600 : 400,
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 400,
                            fontStyle: "normal",
                        }}
                        onClick={() => setSelectedGender(selectedGender === gender.id ? null : gender.id)}
                    >
                        {gender.label}
                    </button>
                ))}
            </div>
            <div className="search-container">
                <span onClick={fetchSearchResults} className="search-icon"><CiSearch /></span>
                <input
                    type="text"
                    placeholder="Ne arıyorsun?"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            fetchSearchResults();
                        }
                    }}
                />
            </div>
            {/* Filter UI: Only show if gender is selected */}
            {selectedGender && <>
                <div className="filter-row" ref={dropdownRef1} style={{ zIndex: 20 }}>
                    {filterDropdowns.map((filter) => (
                        <div key={filter.id} className={`filter-dropdown ${activeFilters[filter.id] ? 'active' : ''}`} style={{ zIndex: 30 }}>
                            <button
                                className="dropdown-toggle"
                                onClick={() => toggleDropdown(filter.id)}
                                style={{ zIndex: 40 }}
                            >
                                {filter.label}
                                <span className="arrow-icon">▼</span>
                            </button>
                            {activeFilters[filter.id] && (
                                <div className="dropdown-menu" style={{ zIndex: 100 }}>
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
                    {additionalFilters.map((filter) => (
                        <div key={filter.id} className={`filter-dropdown ${activeFilters[filter.id] ? 'active' : ''}`} style={{ zIndex: 30 }}>
                            <button
                                className="dropdown-toggle"
                                onClick={() => toggleDropdown(filter.id)}
                                style={{ zIndex: 40 }}
                            >
                                {filter.label}
                                <span className="arrow-icon">▼</span>
                            </button>
                            {activeFilters[filter.id] && (
                                <div className="dropdown-menu" style={{ zIndex: 100 }}>
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
                {/* Selected filters row */}
                <div className="selected-filters-row">
                    {Object.entries(selectedOptions).map(([filterId, options]) =>
                        Object.entries(options)
                            .filter(([option, isSelected]) => isSelected)
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
                        Object.entries(options).some(([option, isSelected]) => isSelected)
                    ) && (
                            <a
                                className="clear-all-filters"
                                href="#"
                                onClick={e => {
                                    e.preventDefault();
                                    setSelectedOptions({});
                                }}
                            >
                                Tümünü Sil
                            </a>
                        )}
                </div>
            </>}
            {/* Search results */}
            <div className='search-results'>
                {loading ? (
                    <div className="loading-state">
                        <h2>Arama yapılıyor...</h2>
                    </div>
                ) : (
                    <>
                        {searchResults.length > 0 ? (
                            <div className="search-products-row">
                                <div className="products">
                                    {searchResults.map(product => (
                                        <Product key={product._id} product={product} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            searchTerm.trim() !== '' && (
                                <div className="no-results">
                                    <h2>Sonuç bulunamadı</h2>
                                    <p>Farklı anahtar kelimeler deneyebilir veya kategorilere göz atabilirsiniz.</p>
                                </div>
                            )
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Search;