import React, { useState } from 'react';
import '/src/scss/products.scss'; // SCSS dosyasının doğru yolunu kontrol et
const products = [
  { id: 1, name: "Ürün 1", img: "https://sky-static.mavi.com/mnresize/820/1162/1110177-89165_image_2.jpg" },
  { id: 2, name: "Ürün 2", img: "https://sky-static.mavi.com/mnresize/820/1162/1710658-82318_image_1.jpg" },
  { id: 3, name: "Ürün 3", img: "https://sky-static.mavi.com/mnresize/820/1162/1010757-82625_image_2.jpg" },
  { id: 4, name: "Ürün 4", img: "https://sky-static.mavi.com/mnresize/820/1162/1110462-87011_image_1.jpg" },
  { id: 5, name: "Ürün 5", img: "https://sky-static.mavi.com/mnresize/820/1162/1110585-86415_image_1.jpg" },
  { id: 6, name: "Ürün 6", img: "https://sky-static.mavi.com/mnresize/820/1162/1310618-89426_image_1.jpg" },
  { id: 7, name: "Ürün 7", img: "https://sky-static.mavi.com/mnresize/820/1162/1210819-89252_image_1.jpg" },
  { id: 8, name: "Ürün 8", img: "https://sky-static.mavi.com/mnresize/820/1162/0010421-70057_image_1.jpg" },
  { id: 9, name: "Ürün 9", img: "https://sky-static.mavi.com/mnresize/820/1162/0110535-89103_image_2.jpg" },
  { id: 10, name: "Ürün 10", img: "https://sky-static.mavi.com/mnresize/820/1162/0S10303-89353_image_1.jpg" },
  { id: 11, name: "Ürün 11", img: "https://sky-static.mavi.com/mnresize/820/1162/0S10319-70497_image_1.jpg" },
  { id: 12, name: "Ürün 12", img: "https://sky-static.mavi.com/mnresize/820/1162/0210818-70497_image_1.jpg" },
  { id: 13, name: "Ürün 13", img: "https://sky-static.mavi.com/mnresize/820/1162/7910000-71033_image_1.jpg" },
  { id: 14, name: "Ürün 14", img: "https://sky-static.mavi.com/mnresize/820/1162/6010684479_image_2.jpg "},
  { id: 15, name: "Ürün 15", img: "https://sky-static.mavi.com/mnresize/820/1162/6610320-70057_image_1.jpg" },
];

const Products2 = () => {
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
      <h2 style={{ textAlign: "center" }}>Ürünler</h2>
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

export default Products2;

 


