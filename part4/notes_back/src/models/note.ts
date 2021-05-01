import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { logger } from '../utils/logger';

void dotenv.config();
const url = process.env.MONGODB_URI;

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
    logger.info('error connecting to MongoDB:', error.message);
  });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
});

// [HACK]消したいor増やしたいプロパティなので、option項目とする
type ReturnedObject = {
  _id?: string;
  __v?: string;
  id?: string;
};

noteSchema.set('toJSON', {
  transform: (_document: unknown, returnedObject: ReturnedObject) => {
    if (returnedObject._id !== undefined) {
      returnedObject.id = returnedObject._id.toString();
    }
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Note = mongoose.model('Note', noteSchema);
