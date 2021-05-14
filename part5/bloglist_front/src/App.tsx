import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    void (async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
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
    } catch (e) {
      console.log('login error');
    }
  };

  const logoutHandler = () => {
    setUser(null);
    window.localStorage.removeItem('blogAppLoginUser');
  };

  const createBlogHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const createdBlog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(createdBlog));
    } catch (e) {
      console.log('create error');
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

  return <div>{user === null ? renderLoginForm() : renderBlogList()}</div>;
};

export default App;
