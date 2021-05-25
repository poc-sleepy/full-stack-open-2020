import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { config } from './utils/config';
import { blogsRouter } from './controllers/blogs';
import { usersRouter } from './controllers/users';
import { middleware } from './utils/middlewares';
import { loginRouter } from './controllers/login';
import { testingRouter } from './controllers/testing';

const app = express();

const mongoUrl = config.MONGODB_URI;
if (mongoUrl === undefined) {
  throw new Error('Environment variable MONGODB_URI is not given.');
}
void mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

export { app };
