import express from 'express';

import { Note } from '../models/note';
import { User } from '../models/user';

const testingRouter = express.Router();

testingRouter.post('/reset', (_request, response) => {
  void (async () => {
    await Note.deleteMany({});
    await User.deleteMany({});

    response.status(204).end();
  })();
});

export { testingRouter };
