import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { Note } from './models/note';
import { requestLogger, unknownEndpoint } from './middlewares';
import { NoteType } from './types';
import { toNewNote } from './utils';

void dotenv.config();
const app = express();

let notes: NoteType[] = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
];

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/', (_request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (_request, response) => {
  void Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note === undefined) {
    response.status(404).end();
  } else {
    response.json(note);
  }
});

app.post('/api/notes', (request, response) => {
  try {
    const newNote = toNewNote(request.body);

    const note: NoteType = {
      id: generateId(),
      content: newNote.content,
      date: new Date().toISOString(),
      important: newNote.important || false,
    };
    notes = notes.concat(note);
    return response.json(note);
  } catch (e) {
    return response.status(400).send(e.message);
  }
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
