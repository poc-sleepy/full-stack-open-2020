import mongoose from 'mongoose';
import supertest from 'supertest';
import { app } from '../app';
import { Note } from '../models/note';
import { NoteType } from '../utils/types';

const api = supertest(app);

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

beforeEach(async () => {
  void (await Note.deleteMany({}));
  let noteObject = new Note(initialNotes[0]);
  void (await noteObject.save());
  noteObject = new Note(initialNotes[1]);
  void (await noteObject.save());
});

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all notes are returned', async () => {
  const response = await api.get('/api/notes');

  expect(response.body).toHaveLength(initialNotes.length);
});

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const notes: NoteType[] = response.body;
  const contents = notes.map((r) => r.content);
  expect(contents).toContain('Browser can execute only Javascript');
});

afterAll(() => {
  void mongoose.connection.close();
});
