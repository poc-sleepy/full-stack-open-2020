import { Types } from 'mongoose';
import { Note } from '../models/note';
import { User } from '../models/user';
import { NoteType } from '../utils/types';

type TestNote = Omit<NoteType, 'id'>;

const initialNotes: TestNote[] = [
  {
    content: 'HTML is easy',
    date: new Date().toISOString(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date().toISOString(),
    important: true,
  },
];

const nonExistingId = async (): Promise<string> => {
  const note = new Note({ content: 'willremovethissoon', date: new Date() });
  await note.save();
  await note.remove();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const id: Types.ObjectId = note._id;
  return id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

export const helper = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
};
