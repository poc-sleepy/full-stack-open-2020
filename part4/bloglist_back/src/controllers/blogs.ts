import express from 'express';

import { Blog } from '../models/blog';

const blogsRouter = express.Router();

blogsRouter.get('/', (_request, response) => {
  void Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  void blog.save().then((result) => {
    response.status(201).json(result);
  });
});

export const controllers = {
  blogsRouter,
};
