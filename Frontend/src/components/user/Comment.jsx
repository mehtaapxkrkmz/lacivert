import React from 'react';
import '/src/scss/comment/comment.scss'; 

const Comment = ({ text }) => {
  return (
    <div className="comment-box">
      <p>{text}</p>
    </div>
  );
};

export default Comment;
