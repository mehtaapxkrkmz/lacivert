import React, { useState, useEffect } from 'react';
import '/src/scss/comment/updateComment.scss';
import Rating from './Rating';

const UpdateComment = ({ onUpdate, comment, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [rating, setRating] = useState(comment?.rating || 0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

  // comment prop'u değiştiğinde rating state'ini güncelle
  useEffect(() => {
    setRating(comment?.rating || 0);
  }, [comment]);

  const handleStartEdit = () => {
    if (!comment || !comment.text) {
      console.warn('Yorum verisi eksik!');
      return;
    }
    setEditedText(comment.text);
    setCharCount(comment.text.length);
    setRating(comment.rating || 0);
    setIsEditing(true);
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setEditedText(text);
    setCharCount(text.length);
  };

  const handleStarClick = (newRating) => {
    setRating(newRating);
    // yıldızın guncellenmesi için feedback mesajı göster
    setFeedbackMessage(`Puanınız ${newRating} olarak güncellendi.`);
  };

  const handleUpdate = async () => {
    if (editedText.trim() === '') {
      setFeedbackMessage('Yorum boş olamaz!');
      setTimeout(() => setFeedbackMessage(''), 3000);
      return;
    }

    try {
      setLoading(true);
      // API çağrısı yapmadan önce feedback mesajını temizle
      setFeedbackMessage('');
      const response = await fetch(`${API_URL}/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: editedText.trim(),
          rating: Number(rating),
        }),
      });

      const result = await response.json();

      if (result.success) {
        onUpdate(editedText.trim(),Number(rating));
        setIsEditing(false);
        setFeedbackMessage('Yorumunuz başarıyla güncellendi.');
        setTimeout(() => setFeedbackMessage(''), 3000);
      } else {
        setFeedbackMessage(result.message || 'Yorumunuz güncellenemedi. Lütfen tekrar deneyin.');
        setTimeout(() => setFeedbackMessage(''), 3000);
      }
    } catch (error) {
      console.error('Yorum güncelleme hatası:', error);
      setFeedbackMessage('Sunucu ile bağlantı kurulamadı. Yorum yerel olarak güncellendi.');

      // Yerel fallback
      onUpdate(editedText.trim(), comment.id, Number(rating));
      setIsEditing(false);
      setTimeout(() => setFeedbackMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText('');
    setCharCount(0);
    setFeedbackMessage('');
  };

  if (!user) return null;

  return (
    <div className="update-comment">
      <button
        className="update-button"
        onClick={handleStartEdit}
        disabled={loading}
      >
        Yorumu Düzenle
      </button>

      {isEditing && (
        <>
          <div className="update-overlay" onClick={handleCancel}></div>
          <div className="edit-dialog">
            <h3>Yorumu Düzenle</h3>
            <textarea
              value={editedText}
              onChange={handleTextChange}
              className="edit-textarea"
              maxLength={200}
              placeholder="Yorumunuzu düzenleyin..."
              disabled={loading}
            />

            {/* ⭐ Yıldız Puanı */}
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= rating ? 'star filled' : 'star'}
                  onClick={() => handleStarClick(star)}
                >
                  ★
                </span>
              ))}
            </div>

            <div className="dialog-footer">
              <div className="char-counter">{charCount}/200</div>
              <div className="button-group">
                <button
                  className="save"
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
                <button
                  className="cancel"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
    </div>
  );
};

export default UpdateComment;
