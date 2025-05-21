import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { IoStarOutline } from 'react-icons/io5';

function Product({ product }) {
  const defaultProduct = {
    id: 9999999999999,
    name: 'Örnek Ürün',
    images: [
      'https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1',
      'https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1',
      'https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1',
      'https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1'
    ],
    score: 4.5
  };

  const { id, name, images, score } = product || defaultProduct;

  //Yıldızları render etme
const renderStars = (score) => {
  const stars = [];                                                   // Tüm yıldız ikonlarını tutacak dizi
  const fullStars = Math.floor(score);                                // Tam sayı olan yıldız sayısı (örneğin 4.5 ise 4 tam yıldız)
  const hasHalfStar = score % 1 !== 0;                                // Yarım yıldız olup olmadığını kontrol et (örneğin 4.5 gibi)

  // Tam yıldızları ekle (örneğin score = 4.5 ise buradan 4 tane yıldız döner)
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar key={`star-${i}`} className="star filled" />            // Dolmuş yıldız ikonu (renkli yıldız)
    );
  }

  // Eğer puan küsuratlıysa, bir yarım yıldız ekle (örneğin 4.5 için)
  if (hasHalfStar) {
    stars.push(
      <FaStarHalfAlt key="half-star" className="star half" /> // Yarım yıldız ikonu
    );
  }

  // Toplam 5 yıldız olacak şekilde boş yıldızları ekle
  // Örneğin score = 4.5 ise yukarıda 4 dolu + 1 yarım eklendi, burada 0 boş yıldız eklenir
  // Örneğin score = 3.2 ise 3 dolu + 1 yarım + 1 boş yıldız olur
  const emptyStars = 5 - Math.ceil(score); // Eksik kalan yıldız sayısı
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <IoStarOutline key={`empty-star-${i}`} className="star empty" /> // Boş yıldız ikonu
    );
  }

  return stars; // Oluşturulan yıldız ikonlarını döndür
};


  const [hoveredImageIndex, setHoveredImageIndex] = useState(0);

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
    setHoveredImageIndex(0); // ya da default resim indeksini sıfırla
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const imageUrl = images?.[hoveredImageIndex]?.startsWith('/uploads')
    ? `${backendUrl}${images[hoveredImageIndex]}`
    : images?.[hoveredImageIndex] || '';
  

  return (
    <div className="product-card">
      <div
        className="product-image"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer' }}
      >
        <img src={imageUrl} alt={`Product ${hoveredImageIndex + 1}`} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <div className="product-rating">
          {renderStars(score)}
          <span className="score-text">{score} / 5</span>
        </div>
      </div>
    </div>
  );
}

export default Product;
