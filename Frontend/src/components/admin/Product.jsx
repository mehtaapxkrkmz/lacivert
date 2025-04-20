import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { IoStarOutline } from 'react-icons/io5';

function Product({ product }) {
  // Default product data if none is provided
  const defaultProduct = {
    id: 1,
    name: 'Sample Product',
    images: ['https://via.placeholder.com/150'],
    score: 4.5
  };

  // Use provided product data or default
  const { id, name, photos, score } = product || defaultProduct;

  // Function to render stars based on score
  const renderStars = (score) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="star filled" />);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="star half" />);
    }

    // Add empty stars to complete 5
    const emptyStars = 5 - Math.ceil(score);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<IoStarOutline key={`empty-star-${i}`} className="star empty" />);
    }

    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={photos[0]} alt={name} />
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