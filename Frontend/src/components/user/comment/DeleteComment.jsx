import React, { useState } from 'react';
import '/src/scss/comment/deleteComment.scss';

const DeleteComment = ({ comment, index, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleDelete = () => {
    try {
      onDelete(index);
      setFeedbackMessage('Yorumunuz başarıyla silindi.');
    } catch (error) {
      setFeedbackMessage('Yorumunuz silinemedi. Lütfen tekrar deneyin.');
    }
    setShowConfirm(false);
    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setFeedbackMessage('Yorum silme işlemi iptal edildi.');
    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  return (
    <div className="delete-comment">
      <div className="comment-text" onClick={() => setShowConfirm(true)}>
        {comment}
      </div>

      {showConfirm && (
        <div className="confirm-dialog">
          <p>Yorumunuzu silmek istediğinizden emin misiniz?</p>
          <button className="yes" onClick={handleDelete}>Evet</button>
          <button className="no" onClick={cancelDelete}>Hayır</button>
        </div>
      )}

      {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
    </div>
  );
};

export default DeleteComment;