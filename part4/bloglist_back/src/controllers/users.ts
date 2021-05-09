import express from 'express';

import { User } from '../models/user';
import { toNewUser } from '../utils/functions';

const usersRouter = express.Router();

usersRouter.get('/', (_request, response) => {
  void (async () => {
    const users = await User.find({}).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
    });
    response.json(users);
  })();
});

usersRouter.post('/', (request, response, next) => {
  void (async () => {
    try {
      const user = new User(await toNewUser(request.body));
      const result = await user.save();
      response.status(201).json(result);
    } catch (e) {
      next(e);
    }
  })();
});

export { usersRouter };
