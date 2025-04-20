import React, { useState } from 'react';
import '/src/scss/favori.scss'; // SCSS dosyasının doğru yolunu kontrol et

const products = [
  { id: 1, name: "Kahverengi TShirt", img: "https://sky-static.mavi.com/mnresize/820/1162/0612473-88067_image_1.jpg" },
  { id: 2, name: "Polo Yaka Mavi Patch Logo Lacivert",img: "https://sky-static.mavi.com/mnresize/820/1162/0S10303-89353_image_1.jpg" },
  { id: 3, name: "Yaka Detaylı Haki Cekete", img: "https://sky-static.mavi.com/mnresize/820/1162/1110621-70204_image_1.jpg" },
  { id: 4, name: "Domates Desenli TShirt", img: "https://sky-static.mavi.com/mnresize/820/1162/1613056-70057_image_1.jpg" },
];

const Favori = () => {
  const [favorites, setFavorites] = useState([1,2, 3,4]); // Örnek: Başlangıçta 1 ve 3 favori

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

  // Sadece favori ürünleri filtrele
  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Favori Ürünler</h2>
      {favoriteProducts.length === 0 ? (
        <p style={{ textAlign: "center" }}>Henüz favori ürününüz yok.</p>
      ) : (
        <div className="product-grid">
          {favoriteProducts.map((product) => (
          <div key={product.id} className="product">
          <span
            className={`heart-icon ${favorites.includes(product.id) ? 'favorited' : ''}`}
            onClick={() => toggleFavorite(product.id)}
          >
            &#9829;
          </span>
          <img src={product.img} alt={product.name} />
          <h3>{product.name}</h3>
                
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favori;


