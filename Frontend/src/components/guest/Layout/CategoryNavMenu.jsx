import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '/src/scss/categoryNavMenu.scss';

const CategoryNavMenu = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const navigate = useNavigate();

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

    const handleMouseEnter = (categoryId) => {
        setActiveMenu(categoryId);
    };

    const handleMouseLeave = () => {
        setActiveMenu(null);
    };

    const handleSubcategoryClick = (mainCategory, subcategory) => {
        navigate(`/${mainCategory.toLowerCase()}`, {
            state: {
                gender: mainCategory,
                category: subcategory
            }
        });
    };

    return (
        <div className="category-nav-menu">
            <div className="main-categories">
                {categories.main.map((category) => (
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
                                    {Object.values(categories.subcategories).map((section, index) => (
                                        <div key={index} className="subcategory-column">
                                            <h3>{section.title}</h3>
                                            <ul>
                                                {section.items.map((item, itemIndex) => (
                                                    <li
                                                        key={itemIndex}
                                                        onClick={() => handleSubcategoryClick(category.label, item)}
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
