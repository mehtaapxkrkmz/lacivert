import React, { useState } from 'react';
import '/src/scss/favori.scss'; // SCSS dosyasının doğru yolunu kontrol et
const products = [
  { id: 1, name: "Ürün 1", img: "https://sky-static.mavi.com/mnresize/820/1162/1110177-89165_image_2.jpg" },
  { id: 2, name: "Ürün 2", img: "https://sky-static.mavi.com/mnresize/820/1162/1710658-82318_image_1.jpg" },
  { id: 3, name: "Ürün 3", img: "https://sky-static.mavi.com/mnresize/820/1162/1010757-82625_image_2.jpg" },
 
];

const Favori = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (productId) => {
    const isFavorite = favorites.includes(productId);
    const updatedFavorites = isFavorite
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];

    setFavorites(updatedFavorites);

    alert(isFavorite
      ? "Bu ürünü favorilerden çıkardınız."
      : "Bu ürünü favorilere eklediniz.");
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Favori Ürünler</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product" id={`product-${product.id}`}>
          <img src={product.img} alt={product.name} />
          <span
            className={`heart-icon ${favorites.includes(product.id) ? "favorited" : ""}`}
            onClick={() => toggleFavorite(product.id)}
          >
            &#9829;
          </span>
          <h3>{product.name}</h3>
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default Favori;