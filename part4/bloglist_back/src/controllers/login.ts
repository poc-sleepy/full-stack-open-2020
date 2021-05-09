import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import { User } from '../models/user';
import { config } from '../utils/config';

const loginRouter = express.Router();

loginRouter.post('/', (request, response) => {
  async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await User.findOne({ username: request.body.username });
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(request.body.password, user.passwordHash);

    if (user === null || !passwordCorrect) {
      response.status(401).json({
        error: 'invalid username or password',
      });
      return;
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const secret = config.SECRET;
    if (secret === undefined) {
      throw new Error('Environment variable SECRET is not given.');
    }

    const token = jwt.sign(userForToken, secret);

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  };
});

export { loginRouter };
