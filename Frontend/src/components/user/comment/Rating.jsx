import React, { useState } from "react";
import '/src/scss/comment/rating.scss';

const Rating = ({ productId, onRatingSubmit }) => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [averageRating, setAverageRating] = useState(null);
  const [allRatings, setAllRatings] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle star click (to select the rating)
  const handleStarClick = (star) => {
    setSelectedStars(star);
  };

  // Handle mouse hover on stars
  const handleMouseEnter = (star) => {
    setHoveredStar(star);
  };

  const handleMouseLeave = () => {
    setHoveredStar(0);
  };

  // Submit the rating and update the average
  const handleSubmit = () => {
    if (selectedStars === 0) return; // Prevent submitting if no rating is selected

    // Add the new rating
    const newRatings = [...allRatings, selectedStars];
    setAllRatings(newRatings);
    setSuccessMessage("Puanınız başarıyla kaydedildi.");
    setSelectedStars(0); // Reset selected stars after submitting

    // Update the average rating
    const average = (
      newRatings.reduce((acc, val) => acc + val, 0) / newRatings.length
    ).toFixed(1);
    setAverageRating(average);

    // Notify parent component of the rating
    if (onRatingSubmit) {
      onRatingSubmit(selectedStars, productId); // Send the rating and productId to parent
    }

    // Hide the success message after 2 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
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

      <button className="submit-rating" onClick={handleSubmit}>
        Puanı Gönder
      </button>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {averageRating && (
        <p className="average-rating">Ortalama Puan: {averageRating}</p>
      )}
    </div>
  );
};

export default Rating;
