import React, { useState } from 'react';
import '/src/scss/comment/updateComment.scss';
const UpdateComment = ({ comment, onUpdate }) => {
    const [updatedComment, setUpdatedComment] = useState(comment.text);
    const [message, setMessage] = useState('');
  
    const handleUpdate = (e) => {
      e.preventDefault(); // Sayfa yenilenmesini engeller
  
      // Eğer yorumda bir değişiklik yapılmamışsa, kullanıcıyı bilgilendirin
      if (updatedComment.trim() === comment.text.trim()) {
        setMessage('Yorumda değişiklik yapılmadı.');
        return;
      }
  
      // Güncellenen yorumu gönder
      onUpdate(updatedComment);
  
      // Başarı mesajını göster
      setMessage('Yorum başarıyla güncellendi!');
    };
  
    const handleCancel = () => {
      setUpdatedComment(comment.text); // İptal edildiğinde, eski yorumu geri getir
      setMessage('Yorum güncellenmedi.');
    };
  
    return (
      <div className="update-comment">
        <h4>Yorumunuzu Güncelleyin</h4>
        <form onSubmit={handleUpdate}>
          <textarea
            value={updatedComment}
            onChange={(e) => setUpdatedComment(e.target.value)}
          />
          <div className="char-counter">
            {updatedComment.length} / 300
          </div>
          <button type="submit">Kaydet</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>İptal</button>
        </form>
        {message && <div className="update-message">{message}</div>}
      </div>
    );
  };
  
  export default UpdateComment;