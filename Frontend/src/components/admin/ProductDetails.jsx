import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { products } from './Products';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Find the product with the matching ID
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-details">
        <div className="product-details-header">
          <h1>Product Not Found</h1>
          <p>The requested product could not be found.</p>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/admin/products/${id}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete functionality
    console.log('Deleting product:', product.id);
    navigate('/admin/products');
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="product-details">
      <div className="product-details-header">
        <div className="header-content">
          <div>
            <h1>{product.name}</h1>
            <p>ID: {product.id}</p>
          </div>
          <div className="action-buttons">
            <button className="edit-button" onClick={handleEdit}>
              <FaEdit /> Düzenle
            </button>
            <button className="delete-button" onClick={handleDelete}>
              <FaTrash /> Sil
            </button>
          </div>
        </div>
      </div>

      <div className="product-details-content">
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.images[selectedImage]} alt={product.name} />
          </div>
          <div className="thumbnail-gallery">
            {product.images.map((image, index) => (
              <div 
                key={index} 
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${product.name} - ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="product-info-container">
          <h2 className="product-name">{product.name}</h2>
          <div className="product-meta">
            <span className="product-category">{product.category}</span>
            <span className="product-stock">Stock: {product.stock}</span>
          </div>
          <div className="product-price">₺{product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
          <div className="product-rating">
            <span className="score">{product.score} / 5</span>
          </div>
          <div className="product-description">
            <h3>Açıklama</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirmation-modal">
          <div className="delete-confirmation-content">
            <h3>Ürünü Sil</h3>
            <p>Bu ürünü silmek istediğinizden emin misiniz?</p>
            <p className="warning-text">Bu işlem geri alınamaz!</p>
            <div className="confirmation-buttons">
              <button className="cancel-button" onClick={cancelDelete}>
                İptal
              </button>
              <button className="confirm-delete-button" onClick={confirmDelete}>
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;