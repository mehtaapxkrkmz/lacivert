import React, { useState } from 'react';
import '/src/scss/comment/updateComment.scss';

const UpdateComment = ({ onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleStartEdit = (text) => {
    setOriginalText(text);
    setEditedText(text);
    setCharCount(text.length);
    setIsEditing(true);
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setEditedText(text);
    setCharCount(text.length);
  };

  const handleUpdate = () => {
    if (editedText.trim() === '') {
      setFeedbackMessage('Yorum boş olamaz!');
      setTimeout(() => setFeedbackMessage(''), 3000);
      return;
    }

    try {
      onUpdate(editedText);
      setIsEditing(false);
      setFeedbackMessage('Yorumunuz başarıyla güncellendi.');
    } catch (error) {
      setFeedbackMessage('Yorumunuz güncellenemedi. Lütfen tekrar deneyin.');
    }
    
    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFeedbackMessage('Yorum güncelleme işlemi iptal edildi.');
    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  return (
    <div className="update-comment">
      <button
        className="update-button"
        onClick={() => handleStartEdit(originalText)}
      >
        Yorumu Düzenle
      </button>

      {isEditing && (
        <>
          <div className="update-overlay" onClick={handleCancel}></div>
          <div className="edit-dialog">
            <textarea
              value={editedText}
              onChange={handleTextChange}
              className="edit-textarea"
              maxLength={200}
            />
            <div className="dialog-footer">
              <div className="char-counter">{charCount}/200</div>
              <div className="button-group">
                <button className="save" onClick={handleUpdate}>Kaydet</button>
                <button className="cancel" onClick={handleCancel}>İptal</button>
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