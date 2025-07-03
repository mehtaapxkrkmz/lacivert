import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  const backendURL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendURL}/admin/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Ürün verisi alınamadı:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, backendURL]);

  const handleEdit = () => {
    navigate(`/admin/products/${id}/edit`);
    window.location.reload();
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
    
  };

  const confirmDelete = async () => {
    try {
      setLoading(true); // Silme sırasında "Yükleniyor..." gösterebiliriz
      await axios.delete(`${backendURL}/admin/products/${id}`);
      alert('Ürün başarıyla silindi.');
      navigate('/admin/products');
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Ürün silinirken bir hata oluştu.');
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false); // Modal'ı kapat
    }
  };

  const cancelDelete = () => setShowDeleteConfirm(false);

  if (loading) {
    return <div className="product-details"><p>Yükleniyor...</p></div>;
  }

  if (!product) {
    return (
      <div className="product-details">
        <h1>Ürün Bulunamadı</h1>
        <p>Belirtilen ürün mevcut değil.</p>
      </div>
    );
  }

  return (
    <div className="product-details">
      <div className="product-details-header">
        <div className="header-content">
          <div>
            <h1>{product.name}</h1>
            <p>ID: {product._id}</p>
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
            <img src={product.images[selectedImage]?.startsWith('http') ? product.images[selectedImage] : `${backendURL}${product.images[selectedImage]}`} alt={product.name} />
          </div>
          <div className="thumbnail-gallery">
            {product.images.map((img, idx) => (
              <div 
                key={idx}
                className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                onClick={() => setSelectedImage(idx)}
              >
                <img src={img.startsWith('http') ? img : `${backendURL}${img}`} alt={`thumb-${idx}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info-container">
          <h2 className="product-name">{product.name}</h2>
          <div className="product-meta">
            <span className="product-category">{product.category}</span>
            <span className="product-stock">
              Stok:
              <span className="stock-item">S: {product.sizes?.S || 0}</span>
              <span className="stock-item">M: {product.sizes?.M || 0}</span>
              <span className="stock-item">L: {product.sizes?.L || 0}</span>
            </span>
          </div>
          <div className="product-price">₺{product.price?.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
          <div className="product-rating">
            {typeof product.averageRating === 'number' && !isNaN(product.averageRating) ? (
              <span className="score">Ortalama Puan: {product.averageRating} / 5</span>
            ) : (
              <span className="score">Puan: {product.score} / 5</span>
            )}
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
            <p>Bu ürünü silmek istediğinize emin misiniz?</p>
            <p className="warning-text">Bu işlem geri alınamaz!</p>
            <div className="confirmation-buttons">
              <button className="cancel-button" onClick={cancelDelete}>İptal</button>
              <button className="confirm-delete-button" onClick={confirmDelete}>Sil</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
