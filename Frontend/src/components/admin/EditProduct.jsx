import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_API_URL;

  const [product, setProduct] = useState({
    name: '',
    images: [],
    description: '',
    price: '',
    category: '',
    score: 0,
    isDiscounted: false,
    sizes: { S: 0, M: 0, L: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`${backendURL}/admin/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError('Ürün yüklenirken hata oluştu.');
        setTimeout(() => navigate('/admin/products'), 3000);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, navigate, backendURL]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (['S', 'M', 'L'].includes(name)) {
      setProduct(prev => ({
        ...prev,
        sizes: { ...prev.sizes, [name]: Number(value) }
      }));
    } else if (name === 'score') {
      const numValue = Math.min(Math.max(Number(value), 0), 5);
      setProduct(prev => ({ ...prev, score: numValue }));
    } else if (name === 'price') {
      setProduct(prev => ({ ...prev, price: value }));
    } else if (name === 'isDiscounted') {
      
      setProduct(prev => ({
        ...prev,
        isDiscounted: checked
      }));
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    document.getElementById('imageInput').click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.put(
        `${backendURL}/admin/products/${id}/image/${selectedImageIndex}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setProduct(prev => ({
        ...prev,
        images: response.data.images
      }));

      setSelectedImageIndex(null);
    } catch (err) {
      alert('Resim güncellenirken hata oluştu.');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verileri hazırla
      const productData = {
        ...product,
        sizes: JSON.stringify(product.sizes),
        price: parseFloat(product.price),
        score: parseFloat(product.score),
        isDiscounted: product.isDiscounted === true ? true : false
      };

     

      const response = await axios.put(`${backendURL}/admin/products/${id}`, productData);
      
      alert('Ürün başarıyla güncellendi.');
      navigate('/admin/products');
    } catch (err) {
      console.error('Güncelleme hatası:', err);
      alert(err.response?.data?.message || 'Ürün güncellenirken hata oluştu.');
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error} Yönlendiriliyorsunuz...</div>;

  return (
    <div className="add-product">
      <div className="add-product-header">
        <h1>Ürünü Düzenle</h1>
        <p>Ürün bilgilerini güncellemek için aşağıdaki formu doldurun</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Ürün Adı</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ürün Görselleri</label>
          <div className="image-preview-container">
            {product.images.map((img, idx) => (
              <div 
                key={idx} 
                className="image-preview"
                onClick={() => handleImageClick(idx)}
                style={{ cursor: 'pointer' }}
              >
                <img src={`${backendURL}${img}`} alt={`Görsel ${idx + 1}`} />
                <div className="image-overlay">
                  <span>Değiştir</span>
                </div>
              </div>
            ))}
          </div>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Ürün Açıklaması</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Fiyat</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Kategori Seçin</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Seçiniz</option>
            <option value="woman">Kadın</option>
            <option value="man">Erkek</option>
            <option value="child">Aksesuar</option>
          </select>
        </div>

        <div className="form-group">
          <div className="sizes">
            <div className="size">
              <span className='tag'>S</span>
              <input 
                type="number" 
                min="0" 
                step="1" 
                name="S"
                value={product.sizes.S}
                onChange={handleInputChange}
                className='input-size' 
                required 
              />
            </div>
            <div className="size">
              <span className='tag'>M</span>
              <input 
                type="number" 
                min="0" 
                step="1" 
                name="M"
                value={product.sizes.M}
                onChange={handleInputChange}
                className='input-size' 
                required 
              />
            </div>
            <div className="size">
              <span className='tag'>L</span>
              <input 
                type="number" 
                min="0" 
                step="1" 
                name="L"
                value={product.sizes.L}
                onChange={handleInputChange}
                className='input-size' 
                required 
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isDiscounted"
              checked={product.isDiscounted}
              onChange={handleInputChange}
            />
            <span>İndirimli Ürün</span>
          </label>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate('/admin/products')}
          >
            İptal
          </button>
          <button type="submit" className="submit-button">
            Ürünü Güncelle
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
