import React, { useState } from 'react';
import '/src/scss/comment/addComment.scss';
import DeleteComment from './DeleteComment';
import UpdateComment from './UpdateComment';
import Rating from './Rating';

const AddComment = ({ productId }) => {
  const [comments, setComments] = useState([
    { id: 1, text: "Harika bir ürün!", rating: 5 },
    { id: 2, text: "Fiyatı çok uygun.", rating: 4 }
  ]);

  const [newComment, setNewComment] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [newRating, setNewRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState(''); // Hata mesajı için state

  const handleDelete = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const handleUpdate = (updatedText, commentId) => {
    setComments(
      comments.map(comment =>
        comment.id === commentId ? { ...comment, text: updatedText } : comment
      )
    );
  };

  const handleAddComment = (e) => {
    e.preventDefault();

    if (newComment.trim() === '') {
      setErrorMessage('Yorum alanı boş olamaz!'); // Hata mesajını ayarla
      setTimeout(() => setErrorMessage(''), 3000); // 3 saniye sonra mesajı temizle
      return; // Fonksiyonu durdur
    }

    const newCommentObj = {
      id: comments.length + 1,
      text: newComment,
      rating: newRating,
      date: new Date().toLocaleDateString('tr-TR')
    };
    setComments([newCommentObj, ...comments]);
    setNewComment("");
    setCharCount(0);
    setNewRating(0);
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setNewComment(text);
    setCharCount(text.length);
  };

  const handleRatingSubmit = (rating) => {
    setNewRating(rating);
  };

  return (
    <div className="add-comment">
      <h2 className="comment-title">Yorumlar</h2>

      {/* Yorum ekleme formu */}
      <form onSubmit={handleAddComment} className="comment-form">
        <Rating productId={productId} onRatingSubmit={handleRatingSubmit} />
        <textarea
          value={newComment}
          onChange={handleTextChange}
          placeholder="Yorumunuzu buraya yazın..."
          maxLength={200}
          className="comment-textarea"
        />
        <div className="form-footer">
          <div className="char-counter">
            {charCount}/200
          </div>
          <button type="submit" className="submit-button">Yorum Ekle</button>
        </div>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Hata mesajını göster */}

      {/* Yorumlar listesi */}
      {comments.length > 0 ? (
        <ul className="comments-list">
          {comments.map((item) => (
            <li key={item.id} className="comment-item">
              <div className="comment-content">
                <p className="comment-text">{item.text}</p>
                {item.rating > 0 && (
                  <div className="rating-box">
                    <span className="rating">
                      <strong>Verilen Puan: {item.rating} ★</strong>
                    </span>
                  </div>
                )}
                {item.date && (
                  <p className="comment-date">{item.date}</p>
                )}
              </div>
              <div className="comment-actions">
                <UpdateComment
                  onUpdate={(updatedText) => handleUpdate(updatedText, item.id)}
                />
                <DeleteComment
                  onDelete={() => handleDelete(item.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-comments">Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
      )}
    </div>
  );
};

export default AddComment;
