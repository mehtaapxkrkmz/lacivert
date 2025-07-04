import React, { useState, useEffect } from "react";
import "../../../scss/index.scss";
import "../../../scss/ProductDetails.scss";
import { useOutletContext } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import AddComment from "../../user/comment/AddComment";
import Rating from "../../user/comment/Rating";
import DeleteComment from "../../user/comment/DeleteComment";
import UpdateComment from "../../user/comment/UpdateComment";
import Select from "react-select";

function ProductDetails() {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { id } = useParams();
  const { refreshCartCount } = useOutletContext();
  const { isAuthenticated, user, token } = useAuth();
  const navigate = useNavigate();

  const backendUrl = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, ''); // Backend adresi

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`${backendUrl}/admin/products/${id}`);
        if (!response.ok) throw new Error("Ürün verisi alınamadı");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [id, backendUrl]);

  const handleAccordion = (idx) => {
    setOpenAccordion(openAccordion === idx ? null : idx);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Sepete eklemek için giriş yapmalısınız!");
      navigate("/login");
      return;
    }

    if (!selectedSize) {
      alert("Lütfen beden seçiniz.");
      return;
    }

    const sizeStock = product.sizes?.[selectedSize.value] || 0;
    if (sizeStock < 1) {
      alert("Seçtiğiniz beden stokta yok.");
      return;
    }

    if (!user || !token) return;
    const res = await fetch(`${backendUrl}/api/cart/add/${user._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: product._id,
        size: selectedSize.value,
        quantity: 1,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Ürün sepete eklendi!");
      refreshCartCount(); // Update cart count in header immediately
    } else {
      alert(data.message || "Hata oluştu.");
    }
  };


  if (!product) return <div>Yükleniyor...</div>;
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: state.isFocused ? "0 0 0 2px #999" : "none",
      borderColor: state.isFocused ? "#999" : provided.borderColor,
      outline: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#999" : "#fff",
      color: state.isFocused ? "#fff" : "#333",
    }),
  };

  const accordionData = [
    {
      title: "Ürün Özellikleri",
      content: <p>{product.description}</p>,
    },
    {
      title: "Yıkama Bilgileri",
      content: (
        <p>
          Kuru temizleme yapılmamalı ve tersten ütülenmelidir. Hassas programda
          yıkayınız. Düşük ısıda ütüleyiniz.
        </p>
      ),
    },
    {
      title: "Ödeme Seçenekleri",
      content: (
        <p>Kredi kartı, banka kartı ve kapıda ödeme seçenekleri mevcuttur.</p>
      ),
    },
  ];

  const options = [
    { value: "S", label: "Small" },
    { value: "M", label: "Medium" },
    { value: "L", label: "Large" },
  ];


  return (
    <div className="productPage">
      <div className="productInfo">
        <div className="productImages">
          {product.images &&
            product.images.map((photo, index) => (
              <img
                key={index}
                src={photo.startsWith('http') ? photo : `${backendUrl}${photo}`}
                alt={`Product Image ${index + 1}`}
              />
            ))}
        </div>

        <div className="productDetails">
          <h2>{product.name}</h2>
          <p className="price">
            <span className="discounted-price">{product.price}TL</span>
          </p>
          <p className="product-code">Ürün Kodu: {product._id}</p>
          {typeof product.averageRating === 'number' && !isNaN(product.averageRating) ? (
            <p className="product-rating">Ortalama Puan: {product.averageRating} / 5</p>
          ) : (
            <p className="product-rating">Henüz puanlanmamış</p>
          )}
          <br />
          <div className="size-quantities">
            <p>small (S): {product.sizes?.S || 0} adet</p>
            <p>medium (M): {product.sizes?.M || 0} adet</p>
            <p>large (L): {product.sizes?.L || 0} adet</p>
          </div>
          <br />
          <div className="product-description">
            <h3>Açıklama</h3>
            <p>{product.description}</p>
          </div>
          <form className="order" action="">
            <Select
              options={options}
              placeholder="Beden Seçiniz"
              styles={customSelectStyles}
              value={selectedSize}
              onChange={setSelectedSize}
            />
            <button type="button" onClick={handleAddToCart}>Sepete Ekle</button>
          </form>
          <br />
          <hr className="line" />

          <div className="accordion">
            {accordionData.map((item, idx) => (
              <div key={idx}>
                <button
                  className="accordion-toggle"
                  onClick={() => handleAccordion(idx)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "#eee",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontWeight: "500",
                    marginBottom: "2px",
                    backgroundColor: "white",
                    transition: "background 0.3s",
                  }}
                >
                  {item.title}
                  <span style={{ float: "right" }}>
                    {openAccordion === idx ? "-" : "+"}
                  </span>
                </button>
                {openAccordion === idx && (
                  <div
                    className="accordion-content"
                    style={{
                      padding: "10px",
                      background: "#ffff",
                      border: "1px solid #eee",
                    }}
                  >
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="comment-section">
        <AddComment productId={product._id} />
      </div>
    </div>
  );
}

export default ProductDetails;
