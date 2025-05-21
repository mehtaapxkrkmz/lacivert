import React, { useEffect, useState } from 'react';
import Product from './Product';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import datas from './../../data/ProductList'

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const handleProductClick = (productId) => {
    navigate(`/admin/products/${productId}`);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/admin/products') // Portunu backend'e göre değiştir
      .then(response => {
        console.log('Ürünler:', response.data);
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Ürünleri alırken hata oluştu:', error);
      });
  }, []);

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Ürünleriniz</h1>
        <p>Ürünlerinizi yönetebilirsiniz</p>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div 
            key={product._id} 
            onClick={() => handleProductClick(product._id)}
            className="product-card-wrapper"
          >
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
