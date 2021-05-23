import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { middleware } from './utils/middlewares';
import { notesRouter } from './controllers/notes';
import { usersRouter } from './controllers/users';
import { testingRouter } from './controllers/testing';
import { logger } from './utils/logger';
import { config } from './utils/config';
import { loginRouter } from './controllers/login';

const app = express();

const url = config.MONGODB_URI;
if (url === undefined) {
  throw new Error('Environment variable MONGODB_URI is not given.');
}
logger.info('connecting to', url);

void mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((_result) => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.get('/', (_request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export { app };
