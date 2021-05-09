import express from 'express';
import jwt from 'jsonwebtoken';

import { Blog } from '../models/blog';
import { User } from '../models/user';
import { config } from '../utils/config';
import { UserToken } from '../utils/types';

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

const getTokenFrom = (request: express.Request): string | null => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.post('/', (request, response, next) => {
  void (async () => {
    try {
      const secret = config.SECRET;
      if (secret === undefined) {
        throw new Error('Environment variable SECRET is not given.');
      }

      const token = getTokenFrom(request);
      if (token === null) {
        response.status(401).json({ error: 'token missing or invalid' });
        return;
      }

      const decodedTokenNever = jwt.verify(token, secret);
      if (typeof decodedTokenNever !== 'object') {
        response.status(401).json({ error: 'token missing or invalid' });
        return;
      }
      const decodedToken = decodedTokenNever as UserToken;

      if (!token || !decodedToken.id) {
        response.status(401).json({ error: 'token missing or invalid' });
        return;
      }

      if (!request.body.title && !request.body.url) {
        const error = new Error('Either title or url is required.');
        error.name = 'ValidationError';
        throw error;
      }

      const user = await User.findById(decodedToken.id);
      if (user === null) {
        const error = new Error(
          `Invalid userId: ${decodedToken.id}, not found the user.`
        );
        error.name = 'ValidationError';
        throw error;
      }

      const blog = new Blog({ ...request.body, createdBy: decodedToken.id });
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

blogsRouter.delete('/:id', (request, response, next) => {
  void (async () => {
    try {
      const result = await Blog.findByIdAndRemove(request.params.id);

      if (result === null) {
        response.status(404).end();
        return;
      }

      response.status(204).end();
    } catch (e) {
      next(e);
    }
  })();
});

export { blogsRouter };
