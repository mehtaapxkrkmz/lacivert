import React, { useEffect } from 'react';
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

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleProductClick = (productId) => {
    navigate(`/admin/products/${productId}`);
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Ürünleriniz</h1>
        <p>Ürünlerinizi yönetebilirsiniz</p>
      </div>

      {status === 'loading' && <p>Yükleniyor...</p>}
      {status === 'failed' && <p>Hata: {error}</p>}

      <div className="products-grid">
        {status === 'succeeded' && products.map(product => (
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
