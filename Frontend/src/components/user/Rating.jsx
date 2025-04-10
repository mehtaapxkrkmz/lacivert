import React, { useState } from 'react';
import '../../scss/rating.scss'; 

const Rating = ({ initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating); // Kullanıcının verdiği puan
  const [hoverRating, setHoverRating] = useState(0); // Üzerine gelindiğinde gösterilecek puan
  const [successMessage, setSuccessMessage] = useState('');
  const [comment, setComment] = useState('');

  const handleRatingClick = (value) => {
    setRating(value);
    setSuccessMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      setSuccessMessage('Lütfen en az bir yıldız verin.');
      return;
    }

    setSuccessMessage('Yorum ve puan başarıyla eklendi!');
    // Burada backend’e gönderilecek kod gelecek, ama frontend için sadece başarı mesajı.
    setComment('');
  };

  return (
    <div className="rating-component">
      <h3>Ürünü Puanla ve Yorum Yap</h3>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={value <= (hoverRating || rating) ? 'star filled' : 'star'}
            onClick={() => handleRatingClick(value)}
            onMouseEnter={() => setHoverRating(value)}
            onMouseLeave={() => setHoverRating(0)}
          >
            ★
          </span>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Yorumunuzu buraya yazın (isteğe bağlı)..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          rows={4}
        />
        <button type="submit">Yorum Ekle</button>
      </form>

      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default Rating;
