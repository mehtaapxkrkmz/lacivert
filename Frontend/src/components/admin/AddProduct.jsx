import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProduct() {
  const navigate = useNavigate();
  const backendURL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    score: 1.0,
    isDiscounted: false,
    sizes: {
      S: 0,
      M: 0,
      L: 0,
    },
    // Filtreleme alanları
    productType: "T-shirt",
    theme: "Casual",
    fit: "Regular",
    color: "Siyah",
    waist: "Orta Bel",
    leg: "Straight",
    length: "Standart",
    hood: "Kapüşonsuz",
    collar: "Dik Yaka",
    closure: "Düğmesiz",
    sleeve: "Uzun Kol"
  });

  const [images, setImages] = useState([null, null, null, null]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Ürün tipine göre gösterilecek filtreleme alanları
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

  // Filtreleme alanları konfigürasyonu
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === "S" || name === "M" || name === "L") {
      setProduct((prev) => ({
        ...prev,
        sizes: {
          ...prev.sizes,
          [name]: parseInt(value) || 0,
        },
      }));
    } else if (name === "productType") {
      // Ürün tipi değiştiğinde, o ürüne özgü varsayılan değerleri ayarla
      setProduct((prev) => {
        const newProduct = { ...prev, [name]: value };
        
        // Ürün tipine göre varsayılan değerleri ayarla
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
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => {
        const newImages = [...prev];
        newImages[index] = file;
        return newImages;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate required fields
      if (
        !product.name ||
        !product.description ||
        !product.price ||
        !product.category
      ) {
        throw new Error("Lütfen tüm zorunlu alanları doldurun.");
      }

      // Validate images
      if (images.some((img) => !img)) {
        throw new Error("Lütfen tüm ürün görsellerini yükleyin.");
      }

      // Validate sizes
      if (Object.values(product.sizes).some((size) => size < 0)) {
        throw new Error("Beden stokları negatif olamaz.");
      }

      // FormData oluştur
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("isDiscounted", product.isDiscounted);
      formData.append("score", product.score.toFixed(1));

      // Filtreleme alanları
      formData.append("productType", product.productType);
      formData.append("theme", product.theme);
      formData.append("fit", product.fit);
      formData.append("color", product.color);
      formData.append("waist", product.waist);
      formData.append("leg", product.leg);
      formData.append("length", product.length);
      formData.append("hood", product.hood);
      formData.append("collar", product.collar);
      formData.append("closure", product.closure);
      formData.append("sleeve", product.sleeve);

      formData.append("sizes", JSON.stringify(product.sizes));

      // Resimleri ekle
      images.forEach((image, index) => {
        formData.append("images", image);
      });

      const response = await axios.post(
        `${backendURL}/admin/addProduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Ürün başarıyla eklendi!");
        navigate("/admin/products");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  };

  // Mevcut ürün tipi için gösterilecek alanları al
  const currentFilterFields = getFilterFieldsForProductType(product.productType);

  return (
    <div className="add-product">
      <div className="add-product-header">
        <h1>Yeni Ürün Ekle</h1>
        <p>Yeni bir ürün eklemek için aşağıdaki formu doldurun</p>
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
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ürün Görselleri (4 adet)</label>
          {images.map((image, index) => (
            <div key={index} className="image-upload-group">
              <input
                type="file"
                accept="image/*"
                id={`imageInput-${index}`}
                style={{ display: "none" }}
                onChange={(e) => handleImageChange(e, index)}
                required={!image}
              />
              <label
                htmlFor={`imageInput-${index}`}
                className="custom-file-upload"
              >
                {image ? `Seçildi: ${image.name}` : `Görsel ${index + 1} seç`}
              </label>

              {image && (
                <div className="image-preview">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                  />
                </div>
              )}
            </div>
          ))}
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
          <label htmlFor="category">Kategori Seçin</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Seçiniz</option>
            <option value="woman">Kadın</option>
            <option value="man">Erkek</option>
            <option value="child">Çocuk</option>
          </select>
        </div>

        {/* Ürün Tipi Seçimi */}
        <div className="form-group">
          <label htmlFor="productType">Ürün Tipi</label>
          <select
            id="productType"
            name="productType"
            value={product.productType}
            onChange={handleChange}
            required
          >
            <option value="T-shirt">T-shirt</option>
            <option value="Jean">Jean</option>
            <option value="Elbise">Elbise</option>
            <option value="Ceket">Ceket</option>
            <option value="Gömlek">Gömlek</option>
          </select>
        </div>

        {/* Dinamik Filtreleme Alanları */}
        <div className="filter-section">
          <h3>{product.productType} Özellikleri</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="theme">Tema</label>
              <select
                id="theme"
                name="theme"
                value={product.theme}
                onChange={handleChange}
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
                value={product.fit}
                onChange={handleChange}
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
                value={product.color}
                onChange={handleChange}
              >
                {filterFieldConfig.color.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ürün tipine özgü alanlar */}
          {currentFilterFields.includes('waist') && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="waist">Bel</label>
                <select
                  id="waist"
                  name="waist"
                  value={product.waist}
                  onChange={handleChange}
                >
                  {filterFieldConfig.waist.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {currentFilterFields.includes('leg') && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="leg">Paça</label>
                <select
                  id="leg"
                  name="leg"
                  value={product.leg}
                  onChange={handleChange}
                >
                  {filterFieldConfig.leg.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {currentFilterFields.includes('length') && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="length">Boy</label>
                <select
                  id="length"
                  name="length"
                  value={product.length}
                  onChange={handleChange}
                >
                  {filterFieldConfig.length.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {currentFilterFields.includes('hood') && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="hood">Kapüşon</label>
                <select
                  id="hood"
                  name="hood"
                  value={product.hood}
                  onChange={handleChange}
                >
                  {filterFieldConfig.hood.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {currentFilterFields.includes('collar') && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="collar">Yaka</label>
                <select
                  id="collar"
                  name="collar"
                  value={product.collar}
                  onChange={handleChange}
                >
                  {filterFieldConfig.collar.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {currentFilterFields.includes('closure') && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="closure">Düğme/Fermuar</label>
                <select
                  id="closure"
                  name="closure"
                  value={product.closure}
                  onChange={handleChange}
                >
                  {filterFieldConfig.closure.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {currentFilterFields.includes('sleeve') && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sleeve">Kol</label>
                <select
                  id="sleeve"
                  name="sleeve"
                  value={product.sleeve}
                  onChange={handleChange}
                >
                  {filterFieldConfig.sleeve.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="form-group">
          <div className="sizes">
            <div className="size">
              <span className="tag">S</span>
              <input
                type="number"
                min="0"
                step="1"
                name="S"
                value={product.sizes.S}
                onChange={handleChange}
                className="input-size"
                required
              />
            </div>
            <div className="size">
              <span className="tag">M</span>
              <input
                type="number"
                min="0"
                step="1"
                name="M"
                value={product.sizes.M}
                onChange={handleChange}
                className="input-size"
                required
              />
            </div>
            <div className="size">
              <span className="tag">L</span>
              <input
                type="number"
                min="0"
                step="1"
                name="L"
                value={product.sizes.L}
                onChange={handleChange}
                className="input-size"
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
              onChange={handleChange}
            />
            <span>İndirimli Ürün</span>
          </label>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/admin/products")}
          >
            İptal
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? "Ekleniyor..." : "Ürün Ekle"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;


