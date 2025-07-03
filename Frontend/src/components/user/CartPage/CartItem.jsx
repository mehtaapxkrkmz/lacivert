import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item, onRemove, onQuantityChange, backendURL }) => {
    const navigate = useNavigate();

    console.log("CartItem item:", item); // item yapısını kontrol et
    console.log("cart.item.product:", item.product);

    if (!item.product) {
        return null;
    }

    const totalPrice = item.product.price * item.quantity;

    const handleQuantityChange = (id, size, newQuantity) => {
        if (newQuantity < 1) return;
        onQuantityChange(id, size, parseInt(newQuantity));
    };

    const handleRemove = () => {
        onRemove(item.id, item.size);
    };

    const handleProductClick = () => {
        navigate(`/product/${item.id}`);
    };

    return (
        <tr className="cart-item">
            <td onClick={handleProductClick} style={{ cursor: 'pointer' }}>
                {item.product?.images?.[0] && (
                    <img
                        src={
                            item.product.images[0].startsWith('http')
                                ? item.product.images[0]
                                : `${backendURL}${item.product.images[0]}`
                        }
                        alt={item.product.name}
                        style={{ width: '90px', height: '134.58px', objectFit: 'cover' }}
                    />
                )}
            </td>
            <td
                className="name"
                onClick={handleProductClick}
                style={{ cursor: 'pointer', textAlign: 'left' }}
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
                <select
                    value={item.quantity}
                    onChange={e => handleQuantityChange(item._id, item.size, parseInt(e.target.value))}
                >
                    {item.product.stock > 0 ? (
                        [...Array(item.product.stock).keys()].map(num => (
                            <option key={num} value={num + 1}>
                                {num + 1} Adet
                            </option>
                        ))
                    ) : (
                        <option disabled>Stokta yok</option>
                    )}
                </select>
            </td>
            <td>{(item.product.price * item.quantity).toFixed(2)} TL</td>
            <td>
                <button onClick={handleRemove}>Sil</button>
            </td>
            <td>
                
            </td>
        </tr>
    );
};

export default CartItem;