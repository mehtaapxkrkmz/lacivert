import React, { useState, useEffect, } from 'react';
import CartSummary from './CartSummary';
import CartTable from './CartTable';
import ProductList from '../../../data/ProductList';
import '../../../scss/Cart.scss';

const CartPage = () => {
    const [cart, setCart] = useState([]); // Sepetin içeriğini tutan state

    // Sayfa yüklendiğinde sepete bazı ürünleri varsayılan olarak ekle
    useEffect(() => {
        const initialCart = ProductList
            .filter(p => p.inCart) // inCart true olanları sepet gibi alıyoruz
            .map(p => ({ ...p, quantity: 1 })); // Her ürün varsayılan olarak 1 adet olsun
        setCart(initialCart);
    }, []);

    const removeItem = (id) => setCart(cart.filter(item => item.id !== id));
    const removeAllItems = () => setCart([]);

    const updateQuantity = (id, quantity) => {
        setCart(cart.map(item =>
            item.id === id ? { ...item, quantity: Number(quantity) } : item
        ));
    };

    const total = cart.reduce((sum, item) => sum + (item.newPrice * item.quantity), 0);

    return (
        <div className="cart-page"> {/*sayfa kapsayıcı*/}
            {cart.length > 0 ? (
                <div className="cart-container"> {/*ürün varsa sayfa içeriği*/}
                    <div className="left"> {/*ürün bilgileri*/}
                        <h1>Sepet</h1>
                        <h3>Toplam {cart.length} ürün</h3>
                        <CartTable
                            items={cart}
                            removeItem={removeItem}
                            updateQuantity={updateQuantity}
                        />
                        <button className="remove-all-button" onClick={removeAllItems}>Tümünü Sil</button>
                    </div>
                    <div className="right"> {/*fiyat bilgileri*/}
                        <CartSummary total={total} />
                    </div>
                </div>
            ) : (
                <div className="cart-empty-warning"> {/*sepet boşsa*/}
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