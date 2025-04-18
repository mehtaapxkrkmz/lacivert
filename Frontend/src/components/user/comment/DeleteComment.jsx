import React, { useState } from 'react';
import '/src/scss/comment/deleteComment.scss'; // SCSS dosyasını eklemeyi unutma

const DeleteComment = ({ comment, index, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleDelete = () => {
    try {
      onDelete(index); // Silme işlemi, üst bileşenden gelen onDelete fonksiyonu çağrılır
      setFeedbackMessage('Yorumunuz başarıyla silindi.');
    } catch (error) {
      setFeedbackMessage('Yorumunuz silinemedi. Lütfen tekrar deneyin.');
    }
    setShowConfirm(false); // Onay penceresini kapat
    setTimeout(() => setFeedbackMessage(''), 3000); // Mesajı 3 saniye sonra sil
  };

  const cancelDelete = () => {
    setShowConfirm(false); // Onay penceresini kapat
    setFeedbackMessage('Yorum silme işlemi iptal edildi.');
    setTimeout(() => setFeedbackMessage(''), 3000); // Mesajı 3 saniye sonra sil
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

      {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>} {/* Kullanıcıya geri bildirim mesajı */}
    </div>
  );
};

export default DeleteComment;
