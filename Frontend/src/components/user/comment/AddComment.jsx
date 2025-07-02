import React, { useState, useEffect } from 'react';
import '/src/scss/comment/addComment.scss';
import DeleteComment from './DeleteComment';
import UpdateComment from './UpdateComment';
import Rating from './Rating';
import { useAuth } from '../../../context/AuthContext';

const AddComment = ({ productId }) => {
  const { user } = useAuth(); 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [newRating, setNewRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(!user);

  const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
  
  useEffect(() => {
    fetchComments();
  }, [productId]);

  useEffect(() => {
    if (!user) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [user]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/comments/product/${productId}`);
      const result = await response.json();

      if (result.success) {
        setComments(result.data);
      } else {
        console.error('Yorumlar getirilemedi:', result.message);
        setComments([
          { id: 1, text: "Harika bir ürün!", rating: 5 },
          { id: 2, text: "Fiyatı çok uygun.", rating: 4 }
        ]);
      }
    } catch (error) {
      console.error('API hatası:', error);
      setComments([
        { id: 1, text: "Harika bir ürün!", rating: 5 },
        { id: 2, text: "Fiyatı çok uygun.", rating: 4 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const handleUpdate = (updatedText, commentId, updatedRating) => {
    setComments(
      comments.map(comment =>
        comment.id === commentId
          ? { ...comment, text: updatedText, rating: updatedRating }
          : comment
      )
    );
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!user) {
      setErrorMessage('Yorum yapmak için giriş yapmalısınız!');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    if (newComment.trim() === '') {
      setErrorMessage('Yorum alanı boş olamaz!');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: productId,
          text: newComment,
          rating: newRating
        })
      });

      const result = await response.json();

      if (result.success) {
        const newCommentObj = {
          id: result.data.id,
          text: result.data.text,
          rating: result.data.rating,
          date: result.data.date
        };

        setComments([newCommentObj, ...comments]);
        setNewComment("");
        setCharCount(0);
        setNewRating(0);
        setFeedbackMessage('Yorum başarıyla eklendi!');
        setTimeout(() => setFeedbackMessage(''), 3000);
      } else {
        setErrorMessage(result.message || 'Yorum eklenirken hata oluştu');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (error) {
      console.error('Yorum ekleme hatası:', error);
      setErrorMessage('Sunucu ile bağlantı kurulamadı');
      setTimeout(() => setErrorMessage(''), 3000);

      // Yerel fallback
      const newCommentObj = {
        id: Date.now(),
        text: newComment,
        rating: newRating,
        date: new Date().toLocaleDateString('tr-TR')
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
      setCharCount(0);
      setNewRating(0);
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setNewComment(text);
    setCharCount(text.length);
  };

  
  const handleRatingSubmit = (rating) => {
    setNewRating(rating);
  };

  // Animasyon için stil
  const topBarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 9999,
    background: '#ffe0e0',
    color: '#b00',
    padding: '16px',
    textAlign: 'center',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transform: 'translateY(-100%)',
    animation: 'slideDown 0.5s forwards',
  };

  // Animasyon keyframes'i ekle
  const styleSheet = document.createElement('style');
  styleSheet.innerText = `@keyframes slideDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }`;
  if (!document.getElementById('slideDownAnim')) {
    styleSheet.id = 'slideDownAnim';
    document.head.appendChild(styleSheet);
  }

  return (
    <div className="add-comment">
      {!user && (
        <div className="top-warning" style={{background:'#ffe0e0',color:'#b00',padding:'10px',borderRadius:'6px',marginBottom:'16px',textAlign:'center',fontWeight:'bold'}}>
          Yorum yapmak için giriş yapmalısınız.
        </div>
      )}

      {user && (
        <form onSubmit={handleAddComment} className="comment-form">
          <Rating currentRating={newRating} onStarClick={handleRatingSubmit} user={user} />
          <textarea
            value={newComment}
            onChange={handleTextChange}
            placeholder="Yorumunuzu buraya yazın..."
            maxLength={200}
            className="comment-textarea"
            disabled={loading}
          />
          <div className="form-footer">
            <div className="char-counter">{charCount}/200</div>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Ekleniyor...' : 'Yorum Ekle'}
            </button>
          </div>
        </form>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
      {loading && <p className="loading-message">Yükleniyor...</p>}

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
                {item.date && <p className="comment-date">{item.date}</p>}
              </div>
              <div className="comment-actions">
                <UpdateComment
                  comment={item}
                  user={user}
                  onUpdate={(updatedText, updatedRating) => handleUpdate(updatedText, item.id, updatedRating)}
                  setFeedbackMessage={setFeedbackMessage}
                />
                <DeleteComment
                  comment={item}
                  user={user}
                  onDelete={() => handleDelete(item.id)}
                  setFeedbackMessage={setFeedbackMessage}
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
