import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

// [HACK]消したいor増やしたいプロパティなので、option項目とする
type ReturnedObject = {
  _id?: string;
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

export const Blog = mongoose.model('Blog', blogSchema);
