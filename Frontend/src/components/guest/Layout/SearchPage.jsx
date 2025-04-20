import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import CategoryLinks from './CategoryLinks';
import ProductList from '../../../data/ProductList';
import "../../../scss/SearchPage.scss";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Arama fonksiyonu
    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        
        const results = ProductList.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        setSearchResults(results);
    };

    // Input değişikliklerini yakala
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className='search-page'>
            <div className="search-container">
                <span onClick={handleSearch} className="search-icon"><CiSearch /></span>
                <input type="text" placeholder="Ne arıyorsun?" onChange={handleChange}
                value={searchTerm}/>
            </div>
            <div className='categories'>
                <CategoryLinks />
            </div>
            
        </div>
    );
};

export default Search;