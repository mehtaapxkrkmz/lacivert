import React, { useState } from 'react';
import '/src/scss/rating.scss';

const Rating = () => {
  const CHARACTER_LIMIT = 250;

  const [selectedStars, setSelectedStars] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState('');
  const [ratings, setRatings] = useState([]);
  const [starSuccessMessage, setStarSuccessMessage] = useState('');
  const [commentSuccessMessage, setCommentSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const calculateAverageRating = () => {
    return ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length).toFixed(1)
      : 0;
  };

  const handleStarClick = (star) => {
    setSelectedStars(star);
    setError('');
    setStarSuccessMessage('Puanınız başarıyla verildi!');

    setRatings((prev) => [...prev, { stars: star, comment: '' }]);

    setTimeout(() => setStarSuccessMessage(''), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedStars === 0) {
      setError('Yorum yapmadan önce puan vermelisiniz!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (!comment.trim()) {
      setError('Yorum kutusu boş bırakılamaz.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const newRating = {
      stars: selectedStars,
      comment: comment.trim(),
    };

    setRatings((prev) => [...prev, newRating]);

    setComment('');
    setSelectedStars(0);
    setCommentSuccessMessage('Yorumunuz başarıyla eklendi!');
    setTimeout(() => setCommentSuccessMessage(''), 3000);
  };

  const averageRating = calculateAverageRating();

  return (
    <div className="rating">
      <h2>Ürünü Puanla</h2>

      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= (hoveredStar || selectedStars) ? 'active' : ''}`}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
          >
            ★
          </span>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Yorumunuzu yazın..."
          value={comment}
          onChange={(e) => {
            if (e.target.value.length <= CHARACTER_LIMIT) {
              setComment(e.target.value);
            }
          }}
        />
        <p className="char-counter">
          {CHARACTER_LIMIT - comment.length} karakter kaldı
        </p>
        <button type="submit">Yorum Ekle</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {starSuccessMessage && <p className="success-message">{starSuccessMessage}</p>}
      {commentSuccessMessage && <p className="success-message">{commentSuccessMessage}</p>}

      {averageRating > 0 && (
        <p className="average">Ortalama Puan: {averageRating} / 5</p>
      )}
    </div>
  );
};

export default Rating;
