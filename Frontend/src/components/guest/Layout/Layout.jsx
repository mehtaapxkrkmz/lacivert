import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import ProductList from '../../../data/ProductList';

import '../../../scss/Layout.scss';

const Layout = () => {
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        // Get cart items count from ProductList
        const cartItems = ProductList.filter(item => item.inCart);
        setCartItemCount(cartItems.length);
    }, []);

    return (
        <div className='layout'>
            <Header cartItemCount={cartItemCount} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;