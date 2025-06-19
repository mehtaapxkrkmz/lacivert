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
    productType: '',
    theme: '',
    fit: '',
    color: '',
    waist: '',
    leg: '',
    length: '',
    hood: '',
    collar: '',
    closure: '',
    sleeve: '',
    stock: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [originalPrice, setOriginalPrice] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`${backendURL}/admin/products/${id}`);
        setProduct(data);
        setOriginalPrice(data.price);
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

    if (["S", "M", "L"].includes(name)) {
      setProduct((prev) => ({
        ...prev,
        sizes: {
          ...prev.sizes,
          [name]: parseInt(value) || 0,
        },
      }));
    } else if (name === "productType") {
      setProduct((prev) => {
        const newProduct = { ...prev, [name]: value };
        switch (value) {
          case 'T-shirt':
            newProduct.sleeve = 'Kısa Kol';
            newProduct.collar = 'Dik Yaka';
            break;
          case 'Jean':
            newProduct.waist = 'Orta Bel';
            newProduct.leg = 'Straight';
            break;
          case 'Elbise':
            newProduct.length = 'Midi';
            newProduct.waist = 'Orta Bel';
            newProduct.sleeve = 'Kolsuz';
            break;
          case 'Ceket':
            newProduct.hood = 'Kapüşonsuz';
            newProduct.sleeve = 'Uzun Kol';
            break;
          case 'Gömlek':
            newProduct.sleeve = 'Uzun Kol';
            newProduct.closure = 'Düğmeli';
            break;
        }
        return newProduct;
      });
    } else if (name === 'score') {
      const numValue = Math.min(Math.max(Number(value), 0), 5);
      setProduct(prev => ({ ...prev, score: numValue }));
    } else if (name === 'price') {
      const newPrice = parseFloat(value);
      setProduct((prev) => ({
        ...prev,
        price: value,
        isDiscounted:
          originalPrice !== null && newPrice < originalPrice
            ? true
            : originalPrice !== null && newPrice > originalPrice
            ? false
            : prev.isDiscounted,
      }));
    } else if (name === 'isDiscounted') {
      
      setProduct(prev => ({
        ...prev,
        isDiscounted: checked
      }));
    } else {
      setProduct(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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

  const getFilterFieldsForProductType = (productType) => {
    const baseFields = ['theme', 'fit', 'color'];
    switch (productType) {
      case 'T-shirt':
        return [...baseFields, 'collar', 'sleeve'];
      case 'Jean':
        return [...baseFields, 'waist', 'leg'];
      case 'Elbise':
        return [...baseFields, 'waist', 'length', 'collar', 'sleeve', 'closure'];
      case 'Ceket':
        return [...baseFields, 'hood', 'collar', 'closure', 'sleeve'];
      case 'Gömlek':
        return [...baseFields, 'collar', 'closure', 'sleeve'];
      default:
        return baseFields;
    }
  };

  const filterFieldConfig = {
    theme: {
      label: 'Tema',
      options: ['Casual', 'Sport', 'Elegant', 'Vintage', 'Trendy']
    },
    fit: {
      label: 'Fit/Kalıp',
      options: ['Regular', 'Slim', 'Oversize', 'Skinny', 'Loose']
    },
    color: {
      label: 'Renk',
      options: ['Siyah', 'Beyaz', 'Mavi', 'Kırmızı', 'Yeşil']
    },
    waist: {
      label: 'Bel',
      options: ['Yüksek Bel', 'Orta Bel', 'Düşük Bel']
    },
    leg: {
      label: 'Paça',
      options: ['Dar Paça', 'Geniş Paça', 'Straight', 'Bootcut']
    },
    length: {
      label: 'Boy',
      options: ['Mini', 'Midi', 'Maxi', 'Standart']
    },
    hood: {
      label: 'Kapüşon',
      options: ['Kapüşonlu', 'Kapüşonsuz']
    },
    collar: {
      label: 'Yaka',
      options: ['V Yaka', 'Bisiklet Yaka', 'Polo Yaka', 'Dik Yaka']
    },
    closure: {
      label: 'Düğme/Fermuar',
      options: ['Düğmeli', 'Düğmesiz', 'Fermuarlı']
    },
    sleeve: {
      label: 'Kol',
      options: ['Uzun Kol', 'Kısa Kol', 'Kolsuz']
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

        <div className="form-group">
          <label htmlFor="stock">Stok</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock || 0}
            onChange={handleInputChange}
            min="0"
            step="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productType">Ürün Tipi</label>
          <select
            id="productType"
            name="productType"
            value={product.productType || ''}
            onChange={handleInputChange}
            required
          >
            <option value="T-shirt">T-shirt</option>
            <option value="Jean">Jean</option>
            <option value="Elbise">Elbise</option>
            <option value="Ceket">Ceket</option>
            <option value="Gömlek">Gömlek</option>
          </select>
        </div>

        <div className="filter-section">
          <h3>{product.productType} Özellikleri</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="theme">Tema</label>
              <select
                id="theme"
                name="theme"
                value={product.theme || ''}
                onChange={handleInputChange}
              >
                {filterFieldConfig.theme.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="fit">Fit/Kalıp</label>
              <select
                id="fit"
                name="fit"
                value={product.fit || ''}
                onChange={handleInputChange}
              >
                {filterFieldConfig.fit.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="color">Renk</label>
              <select
                id="color"
                name="color"
                value={product.color || ''}
                onChange={handleInputChange}
              >
                {filterFieldConfig.color.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          {getFilterFieldsForProductType(product.productType || '').includes('waist') && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="waist">Bel</label>
                <select
                  id="waist"
                  name="waist"
                  value={product.waist || ''}
                  onChange={handleInputChange}
                >
                  {filterFieldConfig.waist.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {getFilterFieldsForProductType(product.productType || '').includes('leg') && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="leg">Paça</label>
                <select
                  id="leg"
                  name="leg"
                  value={product.leg || ''}
                  onChange={handleInputChange}
                >
                  {filterFieldConfig.leg.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {getFilterFieldsForProductType(product.productType || '').includes('length') && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="length">Boy</label>
                <select
                  id="length"
                  name="length"
                  value={product.length || ''}
                  onChange={handleInputChange}
                >
                  {filterFieldConfig.length.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {getFilterFieldsForProductType(product.productType || '').includes('hood') && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="hood">Kapüşon</label>
                <select
                  id="hood"
                  name="hood"
                  value={product.hood || ''}
                  onChange={handleInputChange}
                >
                  {filterFieldConfig.hood.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {getFilterFieldsForProductType(product.productType || '').includes('collar') && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="collar">Yaka</label>
                <select
                  id="collar"
                  name="collar"
                  value={product.collar || ''}
                  onChange={handleInputChange}
                >
                  {filterFieldConfig.collar.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {getFilterFieldsForProductType(product.productType || '').includes('closure') && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="closure">Düğme/Fermuar</label>
                <select
                  id="closure"
                  name="closure"
                  value={product.closure || ''}
                  onChange={handleInputChange}
                >
                  {filterFieldConfig.closure.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {getFilterFieldsForProductType(product.productType || '').includes('sleeve') && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sleeve">Kol</label>
                <select
                  id="sleeve"
                  name="sleeve"
                  value={product.sleeve || ''}
                  onChange={handleInputChange}
                >
                  {filterFieldConfig.sleeve.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
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
