import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
        likes: 17,
      });
      setBlogs(blogs.concat(newBlog));
      setSuccessMessage(`A new blog ${title} By ${author} has been addded `);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 1000);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      console.log(error);
    }
  };

  const blogsList = () =>
    blogs.map((blog) => <Blog key={blog.id} blog={blog} />);

  return (
    <div className="App">
      <h2>blogs</h2>
      {errorMessage && <div className="danger">{errorMessage}</div>}
      {user === null && (
        <LoginForm
          handleLogin={handleLogin}
          handleUsername={(e) => setUsername(e.target.value)}
          handlePassword={(e) => setPassword(e.target.value)}
        />
      )}
      {user !== null && (
        <div>
          {successMessage && <div className="success">{successMessage}</div>}
          <p>
            {user.name} is logged in{' '}
            <button onClick={() => setUser(null)}>Logout</button>
          </p>
          <CreateBlogForm
            handleSubmit={handleCreateBlog}
            title={title}
            author={author}
            url={url}
            handleAuthor={(e) => setAuthor(e.target.value)}
            handleTitle={(e) => setTitle(e.target.value)}
            handleUrl={(e) => setUrl(e.target.value)}
          />
          {blogsList()}
        </div>
      )}
    </div>
  );
};

export default App;
