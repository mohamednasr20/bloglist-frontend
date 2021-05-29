import React from 'react';

const CreateBlogForm = ({
  handleSubmit,
  title,
  author,
  url,
  handleAuthor,
  handleTitle,
  handleUrl,
}) => {
  return (
    <div>
      <h3>Create Blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleAuthor}
          />
        </div>
        <div>
          url:
          <input type="text" name="url" value={url} onChange={handleUrl} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
