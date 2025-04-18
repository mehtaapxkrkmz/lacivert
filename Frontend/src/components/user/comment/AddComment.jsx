import React, { useState } from 'react';
import '/src/scss/comment/addComment.scss';
import DeleteComment from './DeleteComment';
import UpdateComment from './UpdateComment';

const AddComment = () => {
  const CHARACTER_LIMIT = 250;

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setErrorMessage('Yorum içeriği boş bırakılamaz.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    if (comment.length > CHARACTER_LIMIT) {
      setErrorMessage(`Yorum en fazla ${CHARACTER_LIMIT} karakter olabilir.`);
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setComments((prev) => [...prev, comment.trim()]);
    setComment('');
    setSuccessMessage('Yorumunuz başarıyla eklendi!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
    
  const handleDelete = (index) => {
    setComments((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleUpdate = (updatedText, index) => {
    setComments((prev) => {
      const updated = [...prev];
      updated[index] = updatedText;
      return updated;
    });
  };

  return (
    <div className="add-comment">
      <h2>Yorum Yaz</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Yorumunuzu buraya yazın..."
          value={comment}
          onChange={(e) => {
            if (e.target.value.length <= CHARACTER_LIMIT) {
              setComment(e.target.value);
            }
          }}
        />
        <p className="char-counter">
          {CHARACTER_LIMIT - comment.length} karakter kaldı
        </p>
        <button type="submit">Yorum Ekle</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="comment-list">
        <h3>Eklenen Yorumlar</h3>
        {comments.length === 0 ? (
          <p className="no-comment">Henüz yorum yapılmadı.</p>
        ) : (
          <ul>
            {comments.map((item, index) => (
              <li key={index}>
                <DeleteComment
                  comment={item}
                  index={index}
                  onDelete={handleDelete}
                />
                <UpdateComment
                  comment={{ text: item }}
                  index={index}
                  onUpdate={(updatedText) => handleUpdate(updatedText, index)}
                />
                </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddComment;
