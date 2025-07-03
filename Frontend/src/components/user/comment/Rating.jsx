import React, { useState, useEffect } from "react";
import "/src/scss/comment/rating.scss";

const Rating = ({ currentRating = 0, onStarClick, user }) => {
  const [selectedRating, setSelectedRating] = useState(currentRating);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [showSystemMsg, setShowSystemMsg] = useState(false);
  const [systemMsg, setSystemMsg] = useState('');

  useEffect(() => {
    setSelectedRating(currentRating);
  }, [currentRating]);

  const handleStarClick = (star) => {
    setSelectedRating(star);
    if (onStarClick) {
      onStarClick(star); // dışarıdan gelen callback'i çağır
    }
    setSystemMsg('Puanınız kaydedildi!');
    setShowSystemMsg(true);
    alert('Puanınız başarıyla güncellendi!');
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
            onClick={user ? () => handleStarClick(star) : undefined}
            onMouseEnter={user ? () => handleMouseEnter(star) : undefined}
            onMouseLeave={user ? handleMouseLeave : undefined}
            style={!user ? { cursor: 'not-allowed', opacity: 0.5 } : {}}
          >
            ★
          </span>
        ))}
      </div>
      {!user && <div className="rating-warning">Puan vermek için giriş yapmalısınız.</div>}
    </div>
  );
};

export default Rating;
