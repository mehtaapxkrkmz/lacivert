// import React, { useState, useEffect, } from 'react';
// import CartSummary from './CartSummary';
// import CartTable from './CartTable';
// import ProductList from '../../../data/ProductList';
// import '../../../scss/Cart.scss';

// const CartPage = () => {
//     const [cart, setCart] = useState([]); // Sepetin içeriğini tutan state

//     // Sayfa yüklendiğinde sepete bazı ürünleri varsayılan olarak ekle
//     useEffect(() => {
//         const initialCart = ProductList
//             .filter(p => p.inCart) // inCart true olanları sepet gibi alıyoruz
//             .map(p => ({ ...p, quantity: 1 })); // Her ürün varsayılan olarak 1 adet olsun
//         setCart(initialCart);
//     }, []);

//     const removeItem = (id) => setCart(cart.filter(item => item.id !== id));
//     const removeAllItems = () => setCart([]);

//     const updateQuantity = (id, quantity) => {
//         setCart(cart.map(item =>
//             item.id === id ? { ...item, quantity: Number(quantity) } : item
//         ));
//     };

//     const total = cart.reduce((sum, item) => sum + (item.newPrice * item.quantity), 0);

//     return (
//         <div className="cart-page"> {/*sayfa kapsayıcı*/}
//             {cart.length > 0 ? (
//                 <div className="cart-container"> {/*ürün varsa sayfa içeriği*/}
//                     <div className="left"> {/*ürün bilgileri*/}
//                         <h1>Sepet</h1>
//                         <h3>Toplam {cart.length} ürün</h3>
//                         <CartTable
//                             items={cart}
//                             removeItem={removeItem}
//                             updateQuantity={updateQuantity}
//                         />
//                         <button className="remove-all-button" onClick={removeAllItems}>Tümünü Sil</button>
//                     </div>
//                     <div className="right"> {/*fiyat bilgileri*/}
//                         <CartSummary total={total} />
//                     </div>
//                 </div>
//             ) : (
//                 <div className="cart-empty-warning"> {/*sepet boşsa*/}
//                     <div className="content">
//                         <div className="message">
//                             <h2>Alışveriş sepetiniz boş.</h2>
//                             <h3>Öneriler</h3>
//                             <p>Üst menüden bir kategori seçerek ürünleri görüntüleyebilirsiniz.</p>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CartPage;






// import React, { useState, useEffect } from 'react';
// import CartItem from './CartItem';

// const CartPage = () => {
//     const [cartData, setCartData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
    
//     // Backend URL'inizi buraya ekleyin
//     const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    
//     // Geçici olarak userId - normalde authentication'dan gelecek
//     const userId = "USER_ID_BURAYA"; // Bu değeri gerçek user ID ile değiştirin

//     // Sepet verilerini API'den çek
//     const fetchCart = async () => {
//         try {
//             setLoading(true);
//             const response = await fetch(`${backendURL}/api/cart/${userId}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // Authentication header'ı gerekirse buraya ekleyin
//                     // 'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             setCartData(data.cart);
//         } catch (err) {
//             console.error('Sepet yükleme hatası:', err);
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Component mount olduğunda sepeti yükle
//     useEffect(() => {
//         fetchCart();
//     }, []);

//     // Ürün adetini güncelle
//     const handleQuantityChange = async (productId, size, newQuantity) => {
//         try {
//             const response = await fetch(`${backendURL}/api/cart/update`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     userId,
//                     productId,
//                     size,
//                     quantity: newQuantity
//                 })
//             });

//             if (response.ok) {
//                 // Başarılı güncelleme sonrası sepeti yeniden yükle
//                 fetchCart();
//             } else {
//                 console.error('Adet güncelleme hatası');
//             }
//         } catch (error) {
//             console.error('Adet güncelleme hatası:', error);
//         }
//     };

//     // Ürünü sepetten kaldır
//     const handleRemove = async (productId, size) => {
//         try {
//             const response = await fetch(`${backendURL}/api/cart/remove/${productId}/${size}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ userId })
//             });

//             if (response.ok) {
//                 // Başarılı silme sonrası sepeti yeniden yükle
//                 fetchCart();
//             } else {
//                 console.error('Ürün silme hatası');
//             }
//         } catch (error) {
//             console.error('Ürün silme hatası:', error);
//         }
//     };

//     // Toplam tutarı hesapla
//     const calculateTotal = () => {
//         if (!cartData || !cartData.items) return 0;
        
//         return cartData.items.reduce((total, item) => {
//             if (item.product && item.product.newPrice) {
//                 return total + (item.product.newPrice * item.quantity);
//             }
//             return total;
//         }, 0);
//     };

//     if (loading) {
//         return <div className="cart-loading">Sepet yükleniyor...</div>;
//     }

//     if (error) {
//         return (
//             <div className="cart-error">
//                 Sepet yüklenirken hata oluştu: {error}
//                 <button onClick={fetchCart}>Tekrar Dene</button>
//             </div>
//         );
//     }

//     if (!cartData || !cartData.items || cartData.items.length === 0) {
//         return (
//             <div className="empty-cart">
//                 <h2>Sepetiniz Boş</h2>
//                 <p>Henüz sepetinize ürün eklememişsiniz.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="cart-page">
//             <h1>Sepetim</h1>
            
//             <div className="cart-content">
//                 <table className="cart-table">
//                     <thead>
//                         <tr>
//                             <th>Ürün</th>
//                             <th>Adı</th>
//                             <th>Fiyat</th>
//                             <th>Adet</th>
//                             <th>Toplam</th>
//                             <th>İşlem</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {cartData.items.map((item, index) => (
//                             <CartItem
//                                 key={`${item.product._id}-${item.size}-${index}`}
//                                 item={item}
//                                 onRemove={handleRemove}
//                                 onQuantityChange={handleQuantityChange}
//                                 backendURL={backendURL}
//                             />
//                         ))}
//                     </tbody>
//                 </table>

//                 <div className="cart-summary">
//                     <div className="total-price">
//                         <h3>Toplam: {calculateTotal().toFixed(2)} TL</h3>
//                     </div>
                    
//                     <div className="cart-actions">
//                         <button className="checkout-btn">
//                             Ödemeye Geç
//                         </button>
//                         <button className="continue-shopping-btn" onClick={() => window.history.back()}>
//                             Alışverişe Devam Et
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CartPage;




import React, { useState, useEffect } from 'react';
import CartSummary from './CartSummary';
import CartTable from './CartTable';
import '../../../scss/Cart.scss';

const CartPage = () => {
    const [cart, setCart] = useState([]); // Sepet items dizisi
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Backend URL
    //const backendURL = process.env.VITE_API_URL || 'http://localhost:5000';
    const backendURL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    
    // Geçici userId - authentication sisteminden gelecek
    const userId = "686139539cfeaf8e64211422"; // Gerçek user ID ile değiştirin
    
    // Sepet verilerini API'den çek
    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${backendURL}/api/cart/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // Gerekirse ekleyin
                }
            });

            console.log("Sepet verisi:", response); // API yanıtını kontrol et

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Backend'den gelen cart.items'ı mevcut yapınıza uygun formata çevir
            const formattedCart = data.cart?.items?.map(item => ({
                // Mevcut CartItem component'inizin beklediği format
                id: item.product._id,
                name: item.product.name,
                price: item.product.price,
                photos: item.product.images,
                quantity: item.quantity,
                size: item.size,
                // Backend'den gelen tüm product bilgilerini de koruyalım
                product: item.product
            })) || [];
            
            setCart(formattedCart);
        } catch (err) {
            console.error('Sepet yükleme hatası:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Component mount olduğunda sepeti yükle
    useEffect(() => {
        fetchCart();
    }, []);

    // Ürünü sepetten kaldır
    const removeItem = async (id) => {
        try {
            // Silinecek item'ı bul (size bilgisi için)
            const itemToRemove = cart.find(item => item.id === id);
            if (!itemToRemove) return;

            const response = await fetch(`${backendURL}/api/cart/remove/${id}/${itemToRemove.size}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId })
            });

            if (response.ok) {
                // Local state'i güncelle (hızlı UI response için)
                setCart(cart.filter(item => item.id !== id));
                // Sonra server'dan güncel veriyi çek
                fetchCart();
            } else {
                console.error('Ürün silme hatası');
            }
        } catch (error) {
            console.error('Ürün silme hatası:', error);
        }
    };

    // Tüm ürünleri sepetten kaldır
    const removeAllItems = async () => {
        try {
            // Her item için ayrı ayrı silme isteği (bulk delete endpoint'iniz yoksa)
            const deletePromises = cart.map(item =>
                fetch(`${backendURL}/api/cart/remove/${item.id}/${item.size}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId })
                })
            );

            await Promise.all(deletePromises);
            setCart([]);
        } catch (error) {
            console.error('Tümünü silme hatası:', error);
        }
    };

    // Ürün adetini güncelle
    const updateQuantity = async (id, quantity) => {
        try {
            // Güncellenecek item'ı bul
            const itemToUpdate = cart.find(item => item.id === id);
            if (!itemToUpdate) return;

            const response = await fetch(`${backendURL}/api/cart/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    productId: id,
                    size: itemToUpdate.size,
                    quantity: Number(quantity)
                })
            });

            if (response.ok) {
                // Local state'i güncelle (hızlı UI response için)
                setCart(cart.map(item =>
                    item.id === id ? { ...item, quantity: Number(quantity) } : item
                ));
            } else {
                console.error('Adet güncelleme hatası');
            }
        } catch (error) {
            console.error('Adet güncelleme hatası:', error);
        }
    };

    // Toplam tutarı hesapla
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Loading durumu
    if (loading) {
        return (
            <div className="cart-page">
                <div className="cart-loading">Sepet yükleniyor...</div>
            </div>
        );
    }

    // Error durumu
    if (error) {
        return (
            <div className="cart-page">
                <div className="cart-error">
                    <h2>Sepet yüklenirken hata oluştu</h2>
                    <p>{error}</p>
                    <button onClick={fetchCart}>Tekrar Dene</button>
                </div>
            </div>
        );
    }

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
                            backendURL={backendURL} // CartTable'a backend URL'ini geç
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