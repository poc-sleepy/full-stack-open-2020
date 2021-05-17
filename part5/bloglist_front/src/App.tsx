import React, { useState, useEffect, useRef } from 'react';
import { Alert } from '@material-ui/lab';

import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import {
  BlogType,
  NewBlogType,
  UpdatingBlogType,
  UserTokenType,
} from './utils/types';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [user, setUser] = useState<UserTokenType | null>(null);
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

  type PropsLoginHandler = {
    username: string;
    password: string;
  };

  const loginHandler = async (user: PropsLoginHandler) => {
    try {
      const loggedInUser = await loginService.login(user);
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

  const createBlogHandler = async (newBlog: NewBlogType) => {
    try {
      const createdBlog = await blogService.create(newBlog);
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

  const likesBlogHandler = async (targetBlog: UpdatingBlogType) => {
    try {
      const updatedBlog = await blogService.update(targetBlog);
      setBlogs(
        blogs.map((blog) => (blog.id !== targetBlog.id ? blog : updatedBlog))
      );
      blogFormRef.current.toggleVisibility();
      setSuccessMessage(
        `"${updatedBlog.title}" by ${updatedBlog.author} is liked.`
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
      <LoginForm loginHandler={loginHandler} />
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
        <BlogForm createBlogHandler={createBlogHandler} />
      </Togglable>
      <h2>create new</h2>

      <BlogList blogs={blogs} likesBlogHandler={likesBlogHandler} />
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
