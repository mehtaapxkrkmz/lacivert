import React, { useState } from "react";
import '/src/scss/comment/rating.scss';

const Rating = ({ productId, onRatingSubmit }) => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  // Handle star click (to select the rating)
  const handleStarClick = (star) => {
    setSelectedStars(star);
    if (onRatingSubmit) {
      onRatingSubmit(star, productId); // Send the rating and productId to parent
    }
  };

  // Handle mouse hover on stars
  const handleMouseEnter = (star) => {
    setHoveredStar(star);
  };

  const handleMouseLeave = () => {
    setHoveredStar(0);
  };

  return (
    <div className="rating">
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= (hoveredStar || selectedStars) ? "star filled" : "star"}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default Rating;
