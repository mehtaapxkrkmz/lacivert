import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import '../../../scss/Layout.scss';

const Layout = () => {
    const backendURL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    const userId = "686139539cfeaf8e64211422";
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cartItemCount, setCartItemCount] = useState(0);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${backendURL}/api/cart/${userId}`);
            const data = await response.json();

            const items = data.cart?.items || []; // diziyi doğrudan al
            setCart(items); // state'e direk item'ları atarsan cart.length direkt olur
            setError(null);
        } catch (err) {
            setError(err.message);
            setCart([]); // Hata durumunda cart boş olmalı ki length güvenli olsun
        } finally {
            setLoading(false);
        }
    };

     /** refreshCartCount: çocuk bileşenler çağırınca cart’ı tazeleyen API */
    const refreshCartCount = () => fetchCart();

    useEffect(() => {
        if (userId) fetchCart();
    }, [userId]);

    useEffect(() => {
        setCartItemCount(cart.length);
    }, [cart]);             // cart güncellendikçe sayaç da güncellenir

    return (
        <div className='layout'>
            <Header cartItemCount={cartItemCount} />
            <main>
                <Outlet context={{ refreshCartCount }} />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;