import React, { useState, useEffect } from 'react';
import '/src/scss/comment/updateComment.scss';

const UpdateComment = ({ comment, onUpdate }) => {
  const [editedComment, setEditedComment] = useState(comment || '');
  const [editCharCount, setEditCharCount] = useState((comment || '').length);
  const [isEditing, setIsEditing] = useState(false);
  const [initialComment, setInitialComment] = useState(comment || '');

  useEffect(() => {
    setEditedComment(comment || '');
    setEditCharCount((comment || '').length);
    setInitialComment(comment || '');
  }, [comment]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const updatedText = e.target.value;
    setEditedComment(updatedText);
    setEditCharCount(updatedText.length);
  };

  const handleUpdateSubmit = () => {
    if (editedComment.trim() === '') {
      alert("Yorum boş olamaz.");
      return;
    }

    if (editedComment === initialComment) {
      alert("Yorumda herhangi bir değişiklik yapılmamış.");
      return;
    }

    onUpdate(editedComment);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (editedComment !== initialComment) {
      const confirmCancel = window.confirm("Değişiklikler kaybolacak. İptal etmek istediğinizden emin misiniz?");
      if (!confirmCancel) return;
    }
    setEditedComment(initialComment);
    setEditCharCount(initialComment.length);
    setIsEditing(false);
  };

  // Yorum boşsa düzenleme butonunu engelleme
  if (!comment) {
    return null;
  }

  return (
    <div className="update-comment">
      {!isEditing ? (
        <button onClick={handleEditToggle}>Yorumu Düzenle</button>
      ) : (
        <div className="edit-form">
          <textarea
            value={editedComment}
            onChange={handleChange}
            maxLength={200}
            placeholder="Yorumunuzu buraya yazın..."
          />
          <div className="char-counter">
            {editCharCount}/200
          </div>
          <div className="edit-buttons">
            <button onClick={handleUpdateSubmit}>Güncelle</button>
            <button className="cancel" onClick={handleCancel}>İptal</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateComment;
