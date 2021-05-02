import { BlogType, FavoriteBlog } from './types';

const dummy = (_blogs: BlogType[]): number => {
  return 1;
};

const totalLikes = (blogs: BlogType[]): number => {
  return blogs.reduce((sum, blog) => (sum += blog.likes), 0);
};

const favoriteBlog = (blogs: BlogType[]): FavoriteBlog | null => {
  const maxLikes =
    blogs.length === 0 ? 0 : Math.max(...blogs.map((blog) => blog.likes));
  const returnBlog = blogs.find((blog) => blog.likes === maxLikes);
  if (returnBlog === undefined) {
    return null;
  }
  return {
    title: returnBlog.title,
    author: returnBlog.author,
    likes: returnBlog.likes,
  };
};

export const listHelper = {
  dummy,
  totalLikes,
  favoriteBlog,
};
