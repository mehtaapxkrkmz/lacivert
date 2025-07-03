import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function Product({ product, toggleFavorite }) {
  const navigate = useNavigate();
  const backendUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
  const { isAuthenticated } = useAuth();

  const [hoveredImageIndex, setHoveredImageIndex] = useState(0);

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleMouseMove = (e) => {
    const boundingBox = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - boundingBox.left;
    const width = boundingBox.width;
    const quarter = width / 4;

    let index = Math.floor(x / quarter);
    if (index < 0) index = 0;
    if (index > 3) index = 3;

    setHoveredImageIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredImageIndex(0);
  };

  const imageUrl = product.images?.[hoveredImageIndex]?.startsWith("/uploads")
    ? `${backendUrl}${product.images[hoveredImageIndex]}`
    : product.images?.[hoveredImageIndex] || "";

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert("Favori eklemek için lütfen giriş yapınız!");
      navigate("/login");
      return;
    }
    toggleFavorite(product._id);
  };

  // Cloudinary URL kontrolü
  const displayImageUrl = product.images?.[hoveredImageIndex]?.startsWith('http')
    ? product.images[hoveredImageIndex]
    : imageUrl;
  return (
    <div
      className="product"
      key={product._id}
      onClick={handleProductClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img src={displayImageUrl} alt={product.name} />

      {product.isDiscounted && (
        <div className="etiket11">
          <span id="etiket">İndirimli Ürün</span>
        </div>
      )}

      <span
        className={`heart-icon ${product.isFavorite ? "favorited" : ""}`}
        onClick={handleFavoriteClick}
      >
        &#9829;
      </span>

      <div className="name">{product.name}</div>
      <div className="price">
        <span className="new-price">{product.price} TL</span>
      </div>
    </div>
  );
}

export default Product;
