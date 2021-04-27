import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { Note } from './models/note';
import { errorHandler, requestLogger, unknownEndpoint } from './middlewares';
import { toNewNote } from './utils';

void dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/', (_request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (_request, response) => {
  // callbackに直接async関数は入れられないので、async無名関数を使う形を取る
  void (async () => {
    const notes = await Note.find({});
    response.json(notes);
  })();
});

app.get('/api/notes/:id', (request, response, next) => {
  // callbackに直接async関数は入れられないので、async無名関数を使う形を取る
  void (async () => {
    try {
      const note = await Note.findById(request.params.id);
      if (note !== null) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    } catch (e) {
      next(e);
    }
  })();
});

app.post('/api/notes', (request, response) => {
  // callbackに直接async関数は入れられないので、async無名関数を使う形を取る
  void (async () => {
    try {
      const newNote = toNewNote(request.body);
      const note = new Note({
        content: newNote.content,
        important: newNote.important || false,
        date: new Date(),
      });
      const savedNote = await note.save();
      response.json(savedNote);
    } catch (e) {
      response.status(400).send(e.message);
    }
  })();
});

app.delete('/api/notes/:id', (request, response, next) => {
  void (async () => {
    try {
      const result = await Note.findByIdAndRemove(request.params.id);
      if (result === null) {
        response.status(404).end();
      } else {
        response.status(204).end();
      }
    } catch (e) {
      next(e);
    }
  })();
});

app.use(unknownEndpoint);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
