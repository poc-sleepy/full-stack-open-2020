import express from 'express';
import { User } from '../models/user';
import { toNewUser } from '../utils/functions';

const usersRouter = express.Router();

usersRouter.get('/', (_request, response, next) => {
  void (async () => {
    try {
      const users = await User.find({});
      response.json(users);
    } catch (e) {
      next(e);
    }
  })();
});

usersRouter.post('/', (request, response, next) => {
  void (async () => {
    try {
      const newUser = new User(await toNewUser(request.body));
      const savedUser = await newUser.save();
      response.status(201).json(savedUser);
    } catch (e) {
      console.log('error!!!!!');
      next(e);
    }
  })();
});

export { usersRouter };
