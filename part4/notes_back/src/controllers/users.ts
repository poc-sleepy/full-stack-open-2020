import express from 'express';
import { User } from '../models/user';
import { toNewUser } from '../utils/functions';

const usersRouter = express.Router();

usersRouter.post('/', (request, response) => {
  void (async () => {
    const newUser = new User(await toNewUser(request.body));
    const savedUser = await newUser.save();

    response.json(savedUser);
  })();
});

export {usersRouter};
