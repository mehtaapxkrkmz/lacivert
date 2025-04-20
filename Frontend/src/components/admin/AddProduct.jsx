import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    images: [],
    description: '',
    price: '',
    stock: '',
    category: '',
    score: 0,
    isDiscounted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct(prev => {
          const newImages = [...prev.images];
          newImages[index] = reader.result;
          return { ...prev, images: newImages };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addImageField = () => {
    setProduct(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product data:', product);
    navigate('/admin/products');
  };

  return (
    <div className="add-product">
      <div className="add-product-header">
        <h1>Yeni Ürün Ekle</h1>
        <p>Yeni bir ürün eklemek için aşağıdaki formu doldurun</p>
      </div>

      <form className="add-product-form" onSubmit={handleSubmit}>
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
          {product.images.map((image, index) => (
            <div key={index} className="image-upload-group">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                required
              />
              {image && (
                <div className="image-preview">
                  <img src={image} alt={`Preview ${index + 1}`} />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => removeImageField(index)}
                  >
                    Kaldır
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-image-button"
            onClick={addImageField}
          >
            + Görsel Ekle
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="description">Ürün Açıklaması</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
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
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>

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
          <div className="sizes">
            <div className="size">
              <span className='tag'>S</span>
              <input type="number" min="0" step="1" className='input-size' required/>
            </div>
            <div className="size">
              <span className='tag'>M</span>
              <input type="number" min="0" step="1" className='input-size' required/>
            </div>
            <div className="size">
              <span className='tag'>L</span>
              <input type="number" min="0" step="1" className='input-size' required/>
            </div>
           
          </div>
          
           
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
          <button type="button" className="cancel-button" onClick={() => navigate('/admin/products')}>
            İptal
          </button>
          <button type="submit" className="submit-button">
            Ürün Ekle
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;