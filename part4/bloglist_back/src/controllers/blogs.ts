import express from 'express';

import { Blog } from '../models/blog';

const blogsRouter = express.Router();

blogsRouter.get('/', (_request, response) => {
  void (async () => {
    const blogs = await Blog.find({});
    response.json(blogs);
  })();
});

blogsRouter.post('/', (request, response, next) => {
  void (async () => {
    try {
      if (!request.body.title && !request.body.url) {
        const error = new Error('Either title or url is required.');
        error.name = 'ValidationError';
        throw error;
      }
      const blog = new Blog(request.body);
      const result = await blog.save();
      response.status(201).json(result);
    } catch (e) {
      next(e);
    }
  })();
});

export const controllers = {
  blogsRouter,
};
