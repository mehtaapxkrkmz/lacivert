import React, { useState } from 'react';
import '/src/scss/comment/addComment.scss';
import DeleteComment from './DeleteComment';
import UpdateComment from './UpdateComment';

const AddComment = ({ productId }) => {
  const [comments, setComments] = useState([
    { id: 1, text: "Harika bir ürün!", rating: 5 },
    { id: 2, text: "Fiyatı çok uygun.", rating: 4 },
  ]);

  const [newComment, setNewComment] = useState('');
  const [charCount, setCharCount] = useState(0);

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
    if (newComment.trim() === "") {
      alert("Yorum boş olamaz!");
      return;
    }

    const newCommentObj = {
      id: comments.length + 1, // Benzersiz id oluşturuyoruz
      text: newComment,
      rating: 0, // Yorum başlangıçta puansız
    };
    setComments([...comments, newCommentObj]); // Yeni yorumu ekliyoruz
    setNewComment(""); // Formu sıfırlıyoruz
    setCharCount(0); // Karakter sayacını sıfırlıyoruz
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setNewComment(text);
    setCharCount(text.length);
  };

  return (
    <div className="add-comment">
      <h2>Yorumlar</h2>
      
      {/* Yorum ekleme formu */}
      <form onSubmit={handleAddComment}>
        <textarea
          value={newComment}
          onChange={handleTextChange}
          placeholder="Yorumunuzu buraya yazın..."
          maxLength={200} // Karakter sınırını belirledik
        />
        <div className="char-counter">
          {charCount}/200
        </div>
        <button type="submit">Yorum Ekle</button>
      </form>

      {/* Yorumlar listesi */}
      <ul>
        {comments.map((item) => (
          <li key={item.id}>
            <p>{item.text}</p>
            {item.rating > 0 && (
              <p className="rating">Verilen Puan: {item.rating} ★</p>
            )}
            <DeleteComment
              comment={item.text}
              onDelete={() => handleDelete(item.id)} // Silme işlemi için id'yi geçiyoruz
            />
            <UpdateComment
              comment={item.text}
              onUpdate={(updatedText) => handleUpdate(updatedText, item.id)} // Güncelleme işlemi için id'yi geçiyoruz
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddComment;
