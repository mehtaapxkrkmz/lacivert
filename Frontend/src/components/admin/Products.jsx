import React, { useEffect, useState } from 'react';
import Product from './Product';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/adminSlice';

function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector(state => state.admin.products);
  const status = useSelector(state => state.admin.status);
  const error = useSelector(state => state.admin.error);
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
   
    
    if (status === 'idle') {
     
      dispatch(fetchProducts());
    }
  }, [dispatch, status, products, error]);

  const handleProductClick = (productId) => {
    navigate(`/admin/products/${productId}`);
  };

  // Filtrelenmiş ürünler
  const filteredProducts = Array.isArray(products)
    ? products.filter(product => {
        const name = product.name?.toLowerCase() || '';
        const desc = product.description?.toLowerCase() || '';
        const term = searchTerm.toLowerCase();
        return name.includes(term) || desc.includes(term);
      })
    : [];

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Ürünleriniz</h1>
        <p>Ürünlerinizi yönetebilirsiniz</p>
        {/* Arama çubuğu */}
        <input
          type="text"
          placeholder="Ürünlerde ara..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='admin-search-input'
        />
      </div>

      {status === 'loading' && <p>Yükleniyor...</p>}
      {status === 'failed' && <p>Hata: {error}</p>}

      <div className="products-grid">
        {status === 'succeeded' && filteredProducts.map(product => (
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
