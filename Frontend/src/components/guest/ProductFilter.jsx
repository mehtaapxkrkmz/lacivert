import React, { useState } from 'react';
import '/src/scss/productFilter.scss';

const ProductFilter = ({ category }) => {
  const [activeFilters, setActiveFilters] = useState({});

  // Filter options for each category
  const filterOptions = {
    kategori: ['T-shirt', 'Jean', 'Elbise', 'Ceket', 'Gömlek'],
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
    kol: ['Uzun Kol', 'Kısa Kol', 'Kolsuz']
  };

  // Filter dropdowns configuration
  const filterDropdowns = [
    { id: 'kategori', label: 'Kategori' },
    { id: 'tema', label: 'Tema' },
    { id: 'fitKalip', label: 'Fit/Kalıp' },
    { id: 'renk', label: 'Renk' },
    { id: 'beden', label: 'Beden' },
    { id: 'bel', label: 'Bel' },
    { id: 'paça', label: 'Paça' },
    { id: 'boy', label: 'Boy' }
  ];

  const additionalFilters = [
    { id: 'kapüşon', label: 'Kapüşon' },
    { id: 'yaka', label: 'Yaka' },
    { id: 'fiyat', label: 'Fiyat' },
    { id: 'dugme', label: 'Düğme/Fermuar' },
    { id: 'kol', label: 'Kol' }
  ];

  // Toggle dropdown visibility
  const toggleDropdown = (filterId) => {
    setActiveFilters({
      ...activeFilters,
      [filterId]: !activeFilters[filterId]
    });
  };

  return (
    <div className="product-filter">
      <div className="breadcrumbs">
        <a href="/">Anasayfa</a>
        <span> | </span>
        <span>{category}</span>
      </div>

      <h1 className="category-title">{category} Giyim</h1>

      <div className="filter-row">
        {filterDropdowns.map((filter) => (
          <div key={filter.id} className="filter-dropdown">
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
                  <label key={option} className="dropdown-item">
                    <input type="checkbox" /> {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="filter-row">
        {additionalFilters.map((filter) => (
          <div key={filter.id} className="filter-dropdown">
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
                  <label key={option} className="dropdown-item">
                    <input type="checkbox" /> {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="filter-divider"></div>
    </div>
  );
};

export default ProductFilter;