import React, { useState } from 'react';
import '/src/scss/addComment.scss';

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
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddComment;
