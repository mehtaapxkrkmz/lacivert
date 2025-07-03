import React, { useState } from 'react';
import '/src/scss/comment/deleteComment.scss';

const DeleteComment = ({ comment, onDelete, setFeedbackMessage, user }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      console.log('Silme isteği gönderiliyor:', `${API_URL}/api/comments/${comment.id || comment._id}`);

      const response = await fetch(`${API_URL}/api/comments/${comment.id || comment._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(user && user.token ? { 'Authorization': 'Bearer ' + user.token } : {})
        },
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log('Backend response:', result);

      if (result.success) {
        setFeedbackMessage('Yorumunuz başarıyla silindi.');
        const deletedId = result.data?.deletedCommentId || comment.id || comment._id;
        onDelete(deletedId);
        alert('Yorumunuz başarıyla silindi!');
      } else {
        throw new Error(result.message || 'Silme işlemi başarısız');
      }

    } catch (error) {
      console.error('Yorum silme hatası:', error);
      setFeedbackMessage(`Yorumunuz silinemedi: ${error.message}`);
      alert('Yorum silinirken hata oluştu!');
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
      setTimeout(() => setFeedbackMessage(''), 3000);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setFeedbackMessage('Yorum silme işlemi iptal edildi.');
    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  if (!user) return null;

  return (
    <div className="delete-comment">
      <button 
        className="delete-button"
        onClick={() => setShowConfirm(true)}
        disabled={isDeleting}
      >
        {isDeleting ? 'Siliniyor...' : 'Yorumu Sil'}
      </button>

      {showConfirm && (
        <div className="confirm-dialog">
          <p>Yorumunuzu silmek istediğinizden emin misiniz?</p>
          <div className="button-group">
            <button 
              className="yes" 
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Siliniyor...' : 'Evet'}
            </button>
            <button 
              className="no" 
              onClick={cancelDelete}
              disabled={isDeleting}
            >
              Hayır
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteComment;
