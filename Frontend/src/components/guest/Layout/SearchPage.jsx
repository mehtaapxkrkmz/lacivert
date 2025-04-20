import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import ProductList from '../../../data/ProductList';
import "../../../scss/SearchPage.scss";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Define categories separately for the search page
    const categories = {
        main: [
            { id: 'kadin', label: 'KADIN' },
            { id: 'erkek', label: 'ERKEK' },
            { id: 'cocuk', label: 'ÇOCUK' }
        ],
        subcategories: {
            ustGiyim: {
                title: 'Üst Giyim',
                items: ['T-shirt', 'Gömlek', 'Bluz', 'Sweatshirt', 'Ceket']
            },
            altGiyim: {
                title: 'Alt Giyim',
                items: ['Pantolon', 'Jean', 'Etek', 'Şort']
            },
            disGiyim: {
                title: 'Dış Giyim',
                items: ['Mont', 'Kaban', 'Trençkot']
            },
            elbise: {
                title: 'Elbise',
                items: ['Mini Elbise', 'Midi Elbise', 'Maxi Elbise']
            }
        }
    };

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);

        setTimeout(() => {
            const results = ProductList.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
            );

            setSearchResults(results);
            setIsSearching(false);
        }, 500);
    };

    const handleCategoryClick = (mainCategory) => {
        setSelectedCategory(selectedCategory === mainCategory ? null : mainCategory);
    };

    const handleSubcategoryClick = (subcategory) => {
        setSearchTerm(subcategory);
        handleSearch();
        handleCategoryClick(null);
    };

    return (
        <div className='search-page'>
            <div className="search-container">
                <span onClick={handleSearch} className="search-icon"><CiSearch /></span>
                <input
                    type="text"
                    placeholder="Ne arıyorsun?"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
            </div>

            <div className="categories-section">
                {/* Main category buttons */}
                <div className="main-category-buttons">
                    {categories.main.map((category) => (
                        <button
                            key={category.id}
                            className={`main-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(category.id)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleCategoryClick(category.id);
                                }
                            }}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                <div className="search-subcategories">
                    {/* Subcategory buttons */}
                    {selectedCategory && (
                        <div className="subcategory-sections">
                            {Object.entries(categories.subcategories).map(([key, section]) => (
                                <div key={key} className="subcategory-group">
                                    <h4>{section.title}</h4>
                                    <div className="subcategory-buttons">
                                        {section.items.map((item) => (
                                            <button
                                                key={item}
                                                className="subcategory-btn"
                                                onClick={() => handleSubcategoryClick(item)}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className='search-results'>
                    {isSearching ? (
                        <div className="loading-state">
                            <h2>Arama yapılıyor...</h2>
                        </div>
                    ) : (
                        <>
                            {searchResults.length > 0 ? (
                                <div className="products-grid">
                                    {searchResults.map(product => (
                                        <div key={product.id} className="product-card">
                                            <img src={product.photos[0]} alt={product.name} />
                                            <h3>{product.name}</h3>
                                            <div className="price">
                                                {product.isDiscounted ? (
                                                    <>
                                                        <span className="old-price">{product.oldPrice} TL</span>
                                                        <span className="new-price">{product.newPrice} TL</span>
                                                    </>
                                                ) : (
                                                    <span className="price">{product.newPrice} TL</span>
                                                )}
                                            </div>
                                            <div className="category">{product.category}</div>
                                        </div>
                                    ))}
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
        </div>
    );
};

            export default Search;