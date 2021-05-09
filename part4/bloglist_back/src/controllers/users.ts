import express from 'express';

import { User } from '../models/user';
import { toNewUser } from '../utils/functions';
import { logger } from '../utils/logger';

const usersRouter = express.Router();

usersRouter.get('/', (_request, response) => {
  void (async () => {
    const users = await User.find({});
    response.json(users);
  })();
});

usersRouter.post('/', (request, response, next) => {
  void (async () => {
    try {
      logger.info('request:', request.body);
      const user = new User(await toNewUser(request.body));
      logger.info('user:', user);
      const result = await user.save();
      response.status(201).json(result);
    } catch (e) {
      next(e);
    }
  })();
});

export { usersRouter };
