import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import '../../../scss/Layout.scss';
import { useAuth } from '../../../context/AuthContext';

const Layout = () => {
    const backendURL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cartItemCount, setCartItemCount] = useState(0);
    const { user } = useAuth();

    const fetchCart = async () => {
        if (!user || !user._id) {
            setCart([]);
            setCartItemCount(0);
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${backendURL}/api/cart/${user._id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`, // token varsa
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            const items = data.cart?.items || [];
            setCart(data.cart?.items || []);
            setError(null);
        } catch (err) {
            setError(err.message);
            setCart([]);
        } finally {
            setLoading(false);
        }
    };

    /** refreshCartCount: çocuk bileşenler çağırınca cart'ı tazeleyen API */
    const refreshCartCount = () => fetchCart();

    useEffect(() => {
        fetchCart();
    }, [user && user._id]);

    useEffect(() => {
        setCartItemCount(cart.length);
      }, [cart]);
      

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