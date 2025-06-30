// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const CartItem = ({ product, onRemove, onQuantityChange }) => {

//     const totalPrice = product.newPrice * product.quantity;
//     const navigate = useNavigate();

//     return (
//         <tr className="cart-item">
//             <td onClick={() => navigate(`/product/${product.id}`)}>
//                 <img src={product.photos[0]} alt={product.name} />
//             </td>
//             <td className="name" onClick={() => navigate(`/product/${product.id}`)}>{product.name}</td>
//             <td>{product.newPrice.toFixed(2)} TL</td>
//             <td>
//                 <input className="quantity"
//                     type="number"
//                     min="1"
//                     value={product.quantity}
//                     onChange={(e) => onQuantityChange(product.id, e.target.value)}
//                 />
//             </td>
//             <td>{totalPrice.toFixed(2)} TL</td>
//             <td>
//                 <button onClick={() => onRemove(product.id)}>Sil</button>
//             </td>
//         </tr>
//     )
// }

// export default CartItem;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const CartItem = ({ item, onRemove, onQuantityChange, backendURL }) => {
//     const navigate = useNavigate();

//     // item.product populate edilmiş Product objesi
//     // item.size sepetteki beden bilgisi (S, M, L)
//     // item.quantity sepetteki adet bilgisi
//     const product = item.product;

//     if (!product) {
//         return null; // Eğer product populate edilmemişse component'i render etme
//     }

//     const totalPrice = product.newPrice * item.quantity;

//     // Görsel URL'ini düzenle - Cloudinary veya lokal dosya kontrolü
//     const getImageUrl = (imageUrl) => {
//         if (!imageUrl) return '/placeholder-image.jpg'; // Varsayılan görsel
//         return imageUrl.startsWith('http') ? imageUrl : `${backendURL}${imageUrl}`;
//     };

//     const handleQuantityChange = (newQuantity) => {
//         // Adet 0 veya negatif olamaz
//         if (newQuantity < 1) return;

//         // Parent component'e product id, size ve yeni adet bilgisini gönder
//         onQuantityChange(product._id, item.size, parseInt(newQuantity));
//     };

//     const handleRemove = () => {
//         // Parent component'e product id ve size bilgisini gönder
//         onRemove(product._id, item.size);
//     };

//     const handleProductClick = () => {
//         navigate(`/product/${product._id}`);
//     };

//     return (
//         <tr className="cart-item">
//             <td onClick={handleProductClick} style={{ cursor: 'pointer' }}>
//                 <img 
//                     src={getImageUrl(product.photos && product.photos[0])} 
//                     alt={product.name || 'Ürün'}
//                     style={{ width: '80px', height: '80px', objectFit: 'cover' }}
//                 />
//             </td>
//             <td 
//                 className="name" 
//                 onClick={handleProductClick}
//                 style={{ cursor: 'pointer' }}
//             >
//                 {product.name}
//                 <div style={{ fontSize: '0.8em', color: '#666' }}>
//                     Beden: {item.size}
//                 </div>
//             </td>
//             <td>{product.newPrice ? product.newPrice.toFixed(2) : '0.00'} TL</td>
//             <td>
//                 <input 
//                     className="quantity"
//                     type="number"
//                     min="1"
//                     value={item.quantity}
//                     onChange={(e) => handleQuantityChange(e.target.value)}
//                 />
//             </td>
//             <td>{totalPrice.toFixed(2)} TL</td>
//             <td>
//                 <button onClick={handleRemove}>Sil</button>
//             </td>
//         </tr>
//     );
// }

// export default CartItem;







import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item, onRemove, onQuantityChange, backendURL }) => {
    const navigate = useNavigate();

    // Mevcut yapınıza uygun - product direkt gelecek

console.log("CartItem item:", item); // item yapısını kontrol et

    if (!item.product) {
        return null;
    }

    const totalPrice = item.product.price * item.quantity;

    // // Görsel URL'ini düzenle - Cloudinary veya lokal dosya kontrolü
    // const getImageUrl = (imageUrl) => {
    //     if (!imageUrl) return '/placeholder-image.jpg'; // Varsayılan görsel
    //     return imageUrl.startsWith('http') ? imageUrl : `${backendURL}${imageUrl}`;
    // };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) return;
        onQuantityChange(product.id, parseInt(newQuantity));
    };

    const handleRemove = () => {
        onRemove(product.id);
    };

    const handleProductClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <tr className="cart-item">
            <td>
                {item.product?.images?.[0] && (
                    <img
                        src={
                            item.product.images[0].startsWith('http')
                                ? item.product.images[0]
                                : `${backendURL}${item.product.images[0]}`
                        }
                        alt={item.product.name}
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                )}
            </td>

            <td
                className="name"
                onClick={handleProductClick}
                style={{ cursor: 'pointer' }}
            >
                {item.product.name}
                {item.size && (
                    <div style={{ fontSize: '0.8em', color: '#666' }}>
                        Beden: {item.size}
                    </div>
                )}
            </td>
            <td>{item.product.price ? item.product.price.toFixed(2) : '0.00'} TL</td>
            <td>
                <input
                    className="quantity"
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                />
            </td>
            <td>{totalPrice.toFixed(2)} TL</td>
            <td>
                <button onClick={handleRemove}>Sil</button>
            </td>
        </tr>
    );
};

export default CartItem;