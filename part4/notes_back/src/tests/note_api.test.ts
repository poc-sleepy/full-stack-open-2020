import mongoose from 'mongoose';
import supertest from 'supertest';
import { app } from '../app';
import { Note } from '../models/note';
import { NewNote, NoteType } from '../utils/types';
import { helper } from './test_helper';

const api = supertest(app);

beforeEach(async () => {
  void (await Note.deleteMany({}));
  let noteObject = new Note(helper.initialNotes[0]);
  void (await noteObject.save());
  noteObject = new Note(helper.initialNotes[1]);
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

  expect(response.body).toHaveLength(helper.initialNotes.length);
});

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const notes: NoteType[] = response.body;
  const contents = notes.map((r) => r.content);
  expect(contents).toContain('Browser can execute only Javascript');
});

test('a valid note can be added', async () => {
  const newNote: NewNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const notesAtEnd = await helper.notesInDb();
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

  const contents = notesAtEnd.map((n) => n.content);
  expect(contents).toContain('async/await simplifies making async calls');
});

test('note without content is not added', async () => {
  const newNote = {
    important: true,
  };
  await api.post('/api/notes').send(newNote).expect(400);

  const notesAtEnd = await helper.notesInDb();
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
});

afterAll(() => {
  void mongoose.connection.close();
});
