import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { middleware } from './utils/middlewares';
import { notesRouter } from './controllers/notes';
import { usersRouter } from './controllers/users';
import { logger } from './utils/logger';
import { config } from './utils/config';

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

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export { app };
