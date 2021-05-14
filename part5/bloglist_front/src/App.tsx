import React, { useState, useEffect } from 'react';
import { Alert } from '@material-ui/lab';

import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import { BlogType, UserTokenType } from './utils/types';

const App = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<UserTokenType | null>(null);
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    void (async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (e) {
        setErrorMessage(e.response.data.error);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    })();
  }, []);

  useEffect(() => {
    const storedUserStr = window.localStorage.getItem('blogAppLoginUser');
    if (storedUserStr !== null) {
      setUser(JSON.parse(storedUserStr));
      blogService.setToken(JSON.parse(storedUserStr).token);
    }
  }, []);

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loggedInUser = await loginService.login({ username, password });
      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
      window.localStorage.setItem(
        'blogAppLoginUser',
        JSON.stringify(loggedInUser)
      );
      setSuccessMessage(`Successful Login. Hello ${loggedInUser?.name}.`);
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (e) {
      setErrorMessage(e.response.data.error);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const logoutHandler = () => {
    setUser(null);
    window.localStorage.removeItem('blogAppLoginUser');
    setSuccessMessage('Successful Logout.');
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  const createBlogHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const createdBlog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(createdBlog));
      setSuccessMessage(
        `A new blog "${createdBlog.title}" by ${createdBlog.author} added.`
      );
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (e) {
      setErrorMessage(e.response.data.error);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const renderLoginForm = () => (
    <>
      <h2>log in to application</h2>
      <LoginForm
        loginHandler={loginHandler}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    </>
  );

  const renderBlogList = () => (
    <>
      <h2>blogs</h2>
      <p>
        {user?.name} logged in.
        <button onClick={logoutHandler}>logout</button>
      </p>

      <h2>create new</h2>
      <BlogForm
        createBlogHandler={createBlogHandler}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
      />

      <BlogList blogs={blogs} />
    </>
  );

  const renderErrorMessage = () => (
    <Alert severity="error">{errorMessage}</Alert>
  );

  const renderSuccessMessage = () => (
    <Alert severity="success">{successMessage}</Alert>
  );

  return (
    <>
      {errorMessage !== '' && renderErrorMessage()}
      {successMessage !== '' && renderSuccessMessage()}

      <div>{user === null ? renderLoginForm() : renderBlogList()}</div>
    </>
  );
};

export default App;
