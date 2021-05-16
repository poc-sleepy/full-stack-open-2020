import React, { useState, useEffect, useRef } from 'react';
import { Alert } from '@material-ui/lab';

import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import { BlogType, UserTokenType } from './utils/types';
import Togglable from './components/Togglable';

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
  const blogFormRef = useRef({} as { toggleVisibility: () => void });

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

      blogFormRef.current.toggleVisibility();
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
    <Togglable buttonLabel="login">
      <h2>log in to application</h2>
      <LoginForm
        loginHandler={loginHandler}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    </Togglable>
  );

  const renderBlogList = () => (
    <>
      <h2>blogs</h2>
      <p>
        {user?.name} logged in.
        <button onClick={logoutHandler}>logout</button>
      </p>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          createBlogHandler={createBlogHandler}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
        />
      </Togglable>
      <h2>create new</h2>

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
