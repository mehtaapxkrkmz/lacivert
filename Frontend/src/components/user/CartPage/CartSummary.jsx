import React from 'react';

const CartSummary = ({ total }) => {
    return (
        <div className="cart-summary">
            <h1>Sepet Toplamı</h1>
            <div className="table">
                <table>
                    <tbody>
                        <tr>
                            <td>Sipariş Toplamı</td>
                            <td>{total.toFixed(2)} TL</td>
                        </tr>              
                        <tr>
                            <td colSpan={2}><button>Satın Al</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default CartSummary;