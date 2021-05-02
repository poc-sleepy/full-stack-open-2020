import { BlogType } from './types';

const dummy = (_blogs: BlogType[]): number => {
  return 1;
};

const totalLikes = (blogs: BlogType[]): number => {
  return blogs.reduce((sum, blog) => (sum += blog.likes), 0);
};

export const listHelper = { dummy, totalLikes };
