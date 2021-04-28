import mongoose from 'mongoose';
import dotenv from 'dotenv';
import uniqueValidator from 'mongoose-unique-validator';

void dotenv.config();
const url = process.env.MONGODB_URI;

if (url === undefined) {
  throw new Error('Environment variable MONGODB_URI is not given.');
}

void mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  number: {
    type: String,
    require: true,
  },
});

// [HACK]消したいor増やしたいプロパティなので、option項目とする
type ReturnedObject = {
  _id?: string;
  __v?: string;
  id?: string;
};

personSchema.set('toJSON', {
  transform: (_document: unknown, returnedObject: ReturnedObject) => {
    if (returnedObject._id !== undefined) {
      returnedObject.id = returnedObject._id.toString();
    }
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

personSchema.plugin(uniqueValidator);

export const Person = mongoose.model('Person', personSchema);
