import React, { useState } from 'react';
const Blog = ({ blog, handleDelete }) => {
  const blogStyle = {
    marginTop: 10,
    padding: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [hide, setHide] = useState(true);

  const buttonText = hide ? 'view' : 'hide';

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={() => setHide(!hide)}>{buttonText}</button>
      {!hide && (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div>Likes {blog.likes} </div>
          <div>{blog.author}</div>
          <button onClick={handleDelete}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
