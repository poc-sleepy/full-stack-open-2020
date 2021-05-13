import mongoose from 'mongoose';
import { BlogDocument } from '../utils/types';

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// [HACK]消したいor増やしたいプロパティなので、option項目とする
type ReturnedObject = {
  _id?: mongoose.Types.ObjectId;
  __v?: string;
  id?: string;
};

blogSchema.set('toJSON', {
  transform: (_document: unknown, returnedObject: ReturnedObject) => {
    if (returnedObject._id !== undefined) {
      returnedObject.id = returnedObject._id.toString();
    }
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Blog = mongoose.model<BlogDocument>('Blog', blogSchema);
