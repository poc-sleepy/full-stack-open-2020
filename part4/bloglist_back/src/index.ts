import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { config } from './utils/config';
import { controllers } from './controllers/blogs';

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

app.use('/api/blogs', controllers.blogsRouter);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
