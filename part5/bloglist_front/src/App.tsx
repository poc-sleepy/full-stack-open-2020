import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    void (async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    })();
  }, []);

  useEffect(() => {
    const storedUser = window.localStorage.getItem('blogAppLoginUser');
    if (storedUser !== null) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loggedInUser = await loginService.login({ username, password });
      setUser(loggedInUser);
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
      <BlogList blogs={blogs} />
    </>
  );

  return <div>{user === null ? renderLoginForm() : renderBlogList()}</div>;
};

export default App;
