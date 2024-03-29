import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

interface UserDocument extends mongoose.Document {
  _id: string;
  username: string;
  name: string;
  passwordHash: string;
  notes: string[];
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
});

// HACK: 消したいor増やしたいプロパティなので、option項目とする
type ReturnedObject = {
  _id?: string;
  __v?: string;
  id?: string;
  passwordHash?: string; // TODO: 適切な型を調べてない
};

userSchema.set('toJSON', {
  transform: (_document: unknown, returnedObject: ReturnedObject) => {
    if (returnedObject._id !== undefined) {
      returnedObject.id = returnedObject._id.toString();
    }
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

export const User = mongoose.model<UserDocument>('User', userSchema);
