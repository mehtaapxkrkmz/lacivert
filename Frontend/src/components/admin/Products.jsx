import React from 'react'
import Product from './Product'
import { useNavigate } from 'react-router-dom'
import ProductList from '../../../public/ProductList'

// ProductList'i products olarak export et
export const products = ProductList;

function Products() {
  const navigate = useNavigate()

  const handleProductClick = (productId) => {
    navigate(`/admin/products/${productId}`);
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Ürünleriniz</h1>
        <p>Ürünlerinizi yönetebilirsiniz</p>
      </div>
      
      <div className="products-grid">
        {ProductList.map(product => (
          <div 
            key={product.id} 
            onClick={() => handleProductClick(product.id)}
            className="product-card-wrapper"
          >
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products;