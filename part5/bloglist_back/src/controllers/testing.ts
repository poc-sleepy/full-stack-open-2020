import express from 'express';

import { Blog } from '../models/blog';
import { User } from '../models/user';

const testingRouter = express.Router();

testingRouter.post('/reset', (_request, response, next) => {
  void (async () => {
    try {
      await User.deleteMany({});
      await Blog.deleteMany({});
      response.status(204);
    } catch (e) {
      next(e);
    }
  })();
});

export { testingRouter };
