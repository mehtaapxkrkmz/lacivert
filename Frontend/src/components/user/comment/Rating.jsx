import React, { useState, useEffect } from "react";
import "/src/scss/comment/rating.scss";

const Rating = ({ currentRating = 0, onStarClick }) => {
  const [selectedRating, setSelectedRating] = useState(currentRating);
  const [hoveredStar, setHoveredStar] = useState(0);

  useEffect(() => {
    setSelectedRating(currentRating);
  }, [currentRating]);

  const handleStarClick = (star) => {
    setSelectedRating(star);
    if (onStarClick) {
      onStarClick(star); // dışarıdan gelen callback'i çağır
    }
  };

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
            className={star <= (hoveredStar || selectedRating) ? "star filled" : "star"}
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
