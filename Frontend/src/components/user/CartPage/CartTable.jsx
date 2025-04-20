import React from 'react';
import CartItem from './CartItem';

const CartTable = ({ items, removeItem, updateQuantity }) => {
    return (
        <table className="cart-table">
            <thead>
                <tr>
                    <th colSpan="2">Ürün</th>
                    <th>Birim Fiyat</th>
                    <th>Adet</th>
                    <th>Toplamı</th>
                    <th> </th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <CartItem
                        key={item.id}
                        product={item}
                        onRemove={removeItem}
                        onQuantityChange={updateQuantity}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default CartTable;