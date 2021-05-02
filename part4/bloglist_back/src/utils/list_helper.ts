import _ from 'lodash';

import {
  BlogType,
  FavoriteBlog,
  MostBlogsAuthor,
  MostLikesAuthor,
} from './types';

const dummy = (_blogs: BlogType[]): number => {
  return 1;
};

const totalLikes = (blogs: BlogType[]): number => {
  return blogs.reduce((sum, blog) => (sum += blog.likes), 0);
};

const favoriteBlog = (blogs: BlogType[]): FavoriteBlog | undefined => {
  const maxLikes =
    blogs.length === 0 ? 0 : Math.max(...blogs.map((blog) => blog.likes));
  const returnBlog = blogs.find((blog) => blog.likes === maxLikes);
  if (returnBlog === undefined) {
    return undefined;
  }
  return {
    title: returnBlog.title,
    author: returnBlog.author,
    likes: returnBlog.likes,
  };
};

const mostBlogs = (blogs: BlogType[]): MostBlogsAuthor | undefined => {
  const blogCountByAuthors = _.countBy(blogs.map((blog) => blog.author));

  const maxBlogs = Math.max(...Object.values(blogCountByAuthors));
  const returnAuthor = _.findKey(
    blogCountByAuthors,
    (count) => count === maxBlogs
  );

  if (returnAuthor === undefined) {
    return undefined;
  }

  return {
    author: returnAuthor,
    blogs: blogCountByAuthors[returnAuthor],
  };
};

const mostLikes = (blogs: BlogType[]): MostLikesAuthor | undefined => {
  const blogGroupByAuthor = _.groupBy(blogs, (blog) => blog.author);
  const authors = Object.keys(blogGroupByAuthor);

  // [ { author: 'hoge', likes: 10 }, { author: 'piyo', likes: 20 }, ... ] のデータを作成
  const likesCountByAuthors = authors.reduce(
    (rtn: MostLikesAuthor[], author) => {
      const total = totalLikes(blogGroupByAuthor[author]);
      return rtn.concat([{ author, likes: total }]);
    },
    []
  );

  const maxLikes = Math.max(
    ...likesCountByAuthors.map((author) => author.likes)
  );

  return likesCountByAuthors.find((author) => author.likes === maxLikes);
};

export const listHelper = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
