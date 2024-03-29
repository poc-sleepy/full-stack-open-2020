import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { UserDocument } from '../utils/types';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minlength: 3,
    unique: true,
  },
  name: {
    type: String,
  },
  passwordHash: {
    type: String,
    require: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

// HACK: 消したいor増やしたいプロパティなので、option項目とする
type ReturnedObject = {
  _id?: mongoose.Types.ObjectId;
  __v?: string;
  id?: string;
  passwordHash?: string;
};

userSchema.set('toJSON', {
  transform: (_document: unknown, returnedObject: ReturnedObject) => {
    if (returnedObject._id !== undefined) {
      returnedObject.id = returnedObject._id.toString();
    }
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

export const User = mongoose.model<UserDocument>('User', userSchema);
