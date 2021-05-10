import express from 'express';

import { Blog } from '../models/blog';
import { middleware } from '../utils/middlewares';
import { UserDocument } from '../utils/types';

const blogsRouter = express.Router();

blogsRouter.get('/', (_request, response) => {
  void (async () => {
    const blogs = await Blog.find({}).populate('createdBy', {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  })();
});

blogsRouter.post('/', middleware.requireLogin, (request, response, next) => {
  void (async () => {
    try {
      const user = request.user as UserDocument;

      if (!request.body.title && !request.body.url) {
        const error = new Error('Either title or url is required.');
        error.name = 'ValidationError';
        throw error;
      }

      const blog = new Blog({ ...request.body, createdBy: user._id });
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.status(201).json(savedBlog);
    } catch (e) {
      next(e);
    }
  })();
});

blogsRouter.put('/:id', (request, response, next) => {
  void (async () => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
      );

      if (updatedBlog === null) {
        response.status(404).end();
        return;
      }
      response.json(updatedBlog);
    } catch (e) {
      next(e);
    }
  })();
});

blogsRouter.delete(
  '/:id',
  middleware.requireLogin,
  (request, response, next) => {
    void (async () => {
      try {
        const user = request.user as UserDocument;
        const blog = await Blog.findById(request.params.id);

        if (blog === null) {
          response.status(404).end();
          return;
        } else if (blog.createdBy.toString() !== user._id.toString()) {
          console.log(typeof blog.createdBy, blog.createdBy);
          console.log(typeof user._id, user._id);

          response.status(401).end();
          return;
        }

        await blog.delete();
        response.status(204).end();
      } catch (e) {
        next(e);
      }
    })();
  }
);

export { blogsRouter };
