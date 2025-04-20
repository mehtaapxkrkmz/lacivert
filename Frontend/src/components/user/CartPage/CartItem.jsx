import React from 'react';
import {useNavigate} from 'react-router-dom';

const CartItem = ({ product, onRemove, onQuantityChange }) => {

    const totalPrice = product.newPrice * product.quantity;
    const navigate = useNavigate();

    return (
        <tr className="cart-item">
            <td onClick={() => navigate(`/product/${product.id}`)}>
                <img src={product.photos[0]} alt={product.name} />
            </td>
            <td className="name" onClick={() => navigate(`/product/${product.id}`)}>{product.name}</td>
            <td>{product.newPrice.toFixed(2)} TL</td>
            <td>
                <input className="quantity"
                    type="number"
                    min="1"
                    value={product.quantity}
                    onChange={(e) => onQuantityChange(product.id, e.target.value)}
                />
            </td>
            <td>{totalPrice.toFixed(2)} TL</td>
            <td>
                <button onClick={() => onRemove(product.id)}>Sil</button>
            </td>
        </tr>
    )
}

export default CartItem;
