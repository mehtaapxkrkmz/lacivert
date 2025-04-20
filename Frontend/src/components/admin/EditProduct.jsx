// src/components/admin/EditProduct.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductList from '../../../public/ProductList';

function EditProduct() {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    photos: [''],
    productFeatures: '',
    oldPrice: '',
    newPrice: '',
    isDiscounted: false,
    category: '',
    sizes: { S: '', M: '', L: '' }, // Bedenler burada
  });

  useEffect(() => {
    const prod = ProductList.find(p => p.id === parseInt(id, 10));
    if (!prod) {
      navigate('/admin/products');
      return;
    }
    setProduct({
      name: prod.name || '',
      photos: prod.photos.length ? [...prod.photos] : [''],
      productFeatures: prod.productFeatures || '',
      oldPrice: prod.oldPrice?.toString() || '',
      newPrice: prod.newPrice?.toString() || '',
      isDiscounted: prod.isDiscounted || false,
      category: prod.category || '',
      sizes: prod.sizes || { S: '', M: '', L: '' },
    });
  }, [id, navigate]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (['S', 'M', 'L'].includes(name)) {
      setProduct(prev => ({
        ...prev,
        sizes: {
          ...prev.sizes,
          [name]: value,
        },
      }));
    } else {
      setProduct(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleImageChange = (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct(prev => {
        const photos = [...prev.photos];
        photos[idx] = reader.result;
        return { ...prev, photos };
      });
    };
    reader.readAsDataURL(file);
  };

  const addImageField = () =>
    setProduct(prev => ({ ...prev, photos: [...prev.photos, ''] }));

  const removeImageField = idx =>
    setProduct(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== idx),
    }));

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Güncellenmiş ürün:', product);
    navigate('/admin/products');
  };

  return (
    <div className="edit-product">
      <h1>Ürün Düzenle</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Ürün Adı</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ürün Görselleri</label>
          {product.photos.map((src, idx) => (
            <div key={idx} className="image-upload-group">
              <input
                type="file"
                accept="image/*"
                onChange={e => handleImageChange(e, idx)}
                required={!src}
              />
              {src && (
                <div className="image-preview">
                  <img src={src} alt={`Preview ${idx + 1}`} />
                  <button
                    type="button"
                    onClick={() => removeImageField(idx)}
                    className="remove-image"
                  >
                    Kaldır
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="add-image-button"
          >
            + Görsel Ekle
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="productFeatures">Ürün Özellikleri</label>
          <textarea
            id="productFeatures"
            name="productFeatures"
            value={product.productFeatures}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <div className="category">
            <label htmlFor="category">Kategori Seçin</label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              
              <option value="woman">Kadın</option>
              <option value="man">Erkek</option>
              <option value="child">Aksesuar</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Beden Stokları</label>
          <div className="sizes">
            {['S', 'M', 'L'].map(size => (
              <div className="size" key={size}>
                <span className="tag">{size}</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  name={size}
                  value={product.sizes[size]}
                  onChange={handleChange}
                  className="input-size"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="oldPrice">Eski Fiyat</label>
          <input
            type="number"
            id="oldPrice"
            name="oldPrice"
            value={product.oldPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
          />

          <label htmlFor="newPrice">Yeni Fiyat</label>
          <input
            type="number"
            id="newPrice"
            name="newPrice"
            value={product.newPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isDiscounted"
              checked={product.isDiscounted}
              onChange={handleChange}
            />
            <span>İndirimli Ürün</span>
          </label>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin/products')}>
            İptal
          </button>
          <button type="submit">Değişiklikleri Kaydet</button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
