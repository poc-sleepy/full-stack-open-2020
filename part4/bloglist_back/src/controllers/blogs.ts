import express from 'express';

import { Blog } from '../models/blog';

const blogsRouter = express.Router();

blogsRouter.get('/', (_request, response) => {
  void (async () => {
    const blogs = await Blog.find({});
    response.json(blogs);
  })();
});

blogsRouter.post('/', (request, response) => {
  void (async () => {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  })();
});

export const controllers = {
  blogsRouter,
};
