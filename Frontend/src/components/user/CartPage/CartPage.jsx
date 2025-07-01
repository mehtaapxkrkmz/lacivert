import React, { useState, useEffect } from 'react';
import CartSummary from './CartSummary';
import CartTable from './CartTable';
import '../../../scss/Cart.scss';
import { useOutletContext } from 'react-router-dom';

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const backendURL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    const userId = "686139539cfeaf8e64211422";

    const { refreshCartCount } = useOutletContext();

    // Fetch cart on mount
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${backendURL}/api/cart/${userId}`);
            const data = await response.json();
            const formattedCart = data.cart?.items?.map(item => ({
                ...item,
                id: item.product.id,
                name: item.product.name,
                price: item.product.price,
                photos: item.product.images,
                stock: item.product.stock,
                product: item.product
            })) || [];
            setCart(formattedCart);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Update quantity (optimistic update)
    const updateQuantity = async (id, size, quantity) => {
        try {
            const itemToUpdate = cart.find(item => item._id === id && item.size === size);
            if (!itemToUpdate) return;

            const response = await fetch(`${backendURL}/api/cart/update/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    productId: itemToUpdate.id,
                    size: itemToUpdate.size,
                    quantity: Number(quantity)
                })
            });

            if (response.ok) {
                // Optimistically update the cart state
                setCart(prevCart =>
                    prevCart.map(item =>
                        item._id === id && item.size === size
                            ? { ...item, quantity: Number(quantity) }
                            : item
                    )
                );
                refreshCartCount();
            } else {
                // Optionally, re-fetch cart if error
                fetchCart();
            }
        } catch (error) {
            fetchCart();
        }
    };

    // Remove single item (optimistic update)
    const removeItem = async (id, size) => {
        try {
            const response = await fetch(`${backendURL}/api/cart/remove/${userId}/${id}/${size}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                setCart(prevCart => prevCart.filter(item => !(item.id === id && item.size === size)));
                refreshCartCount();
            } else {
                fetchCart();
            }
        } catch (error) {
            fetchCart();
        }
    };

    // Remove all items (optimistic update)
    const removeAllItems = async () => {
        try {
            const response = await fetch(`${backendURL}/api/cart/clear/${userId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                setCart([]);
                refreshCartCount();
            } else {
                fetchCart();
            }
        } catch (error) {
            fetchCart();
        }
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (loading) return <div className="cart-page"><div className="cart-loading">Sepet yükleniyor...</div></div>;
    if (error) return <div className="cart-page"><div className="cart-error">{error}</div></div>;

    return (
        <div className="cart-page">
            {cart.length > 0 ? (
                <div className="cart-container">
                    <div className="left">
                        <h1>Sepet</h1>
                        <h3>Toplam {cart.length} ürün</h3>
                        <CartTable
                            items={cart}
                            removeItem={removeItem}
                            updateQuantity={updateQuantity}
                            backendURL={backendURL}
                        />
                        <button className="remove-all-button" onClick={removeAllItems}>
                            Tümünü Sil
                        </button>
                    </div>
                    <div className="right">
                        <CartSummary total={total} />
                    </div>
                </div>
            ) : (
                <div className="cart-empty-warning">
                    <div className="content">
                        <div className="message">
                            <h2>Alışveriş sepetiniz boş.</h2>
                            <h3>Öneriler</h3>
                            <p>Üst menüden bir kategori seçerek ürünleri görüntüleyebilirsiniz.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;