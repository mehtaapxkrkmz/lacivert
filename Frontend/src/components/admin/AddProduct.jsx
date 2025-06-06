import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProduct() {
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_API_URL;

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    score: 1.0,
    isDiscounted: false,
    sizes: {
      S: 0,
      M: 0,
      L: 0,
    },
  });

  const [images, setImages] = useState([null, null, null, null]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      formData.append("stock", product.stock || "0");
      formData.append("category", product.category);
      formData.append("isDiscounted", product.isDiscounted);
      formData.append("score", product.score.toFixed(1)); // "1.0"

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
            <option value="child">Aksesuar</option>
          </select>
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
