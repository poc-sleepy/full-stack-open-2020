import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import { BlogType } from './utils/types';

const App = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    void (async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    })();
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
