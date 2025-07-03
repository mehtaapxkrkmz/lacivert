import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import '/src/scss/categoryNavMenu.scss';

const CategoryNavMenu = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const filterOptions = {
        productType: ['T-shirt', 'Jean', 'Elbise', 'Ceket', 'Gömlek'],
        tema: ['Casual', 'Sport', 'Elegant', 'Vintage', 'Trendy'],
        fitKalip: ['Regular', 'Slim', 'Oversize', 'Skinny', 'Loose'],
        renk: ['Siyah', 'Beyaz', 'Mavi', 'Kırmızı', 'Yeşil'],
        // ...add more if you want
    };

    const subcategorySections = [
        { key: 'productType', title: 'Kategori', items: filterOptions.productType },
        { key: 'tema', title: 'Tema', items: filterOptions.tema },
        { key: 'fitKalip', title: 'Fit/Kalıp', items: filterOptions.fitKalip },
        { key: 'renk', title: 'Renk', items: filterOptions.renk },
        // ...add more if you want
    ];

    const mainCategories = [
        { id: 'kadin', label: 'KADIN' },
        { id: 'erkek', label: 'ERKEK' },
        { id: 'cocuk', label: 'ÇOCUK' }
    ];

    const handleMouseEnter = (categoryId) => {
        setActiveMenu(categoryId);
    };

    const handleMouseLeave = () => {
        setActiveMenu(null);
    };

    const handleSubcategoryClick = (filterKey, value) => {
        // Determine main category from activeMenu
        let mainCategory = null;
        let mainCategoryPath = '/';
        if (activeMenu === 'kadin') {
            mainCategory = { kategori: { woman: true } };
            mainCategoryPath = '/kadin';
        } else if (activeMenu === 'erkek') {
            mainCategory = { kategori: { man: true } };
            mainCategoryPath = '/erkek';
        } else if (activeMenu === 'cocuk') {
            mainCategory = { kategori: { child: true } };
            mainCategoryPath = '/cocuk';
        }

        // Build filter object
        const filterObj = {
            ...(mainCategory || {}),
            [filterKey]: { [value]: true }
        };
        navigate(mainCategoryPath, {
            state: {
                initialFilter: filterObj 
            }
        });
    };


    return (
        <div className="category-nav-menu">
            <div className="main-categories">
                {mainCategories.map((category) => (
                    <div
                        key={category.id}
                        className="category-container"
                        onMouseEnter={() => handleMouseEnter(category.id)}
                        onMouseLeave={handleMouseLeave}
                    >

                        <NavLink to={`/${category.id}`}>
                            {category.label}
                        </NavLink>

                        {activeMenu === category.id && (
                            <div className="subcategory-menu">
                                <div className="subcategory-columns">
                                    {subcategorySections.map((section, index) => (
                                        <div key={index} className="subcategory-column">
                                            <h3>{section.title}</h3>
                                            <ul>
                                                {section.items.map((item, itemIndex) => (
                                                    <li
                                                        key={itemIndex}
                                                        onClick={() => handleSubcategoryClick(section.key, item)}
                                                    >
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryNavMenu;
