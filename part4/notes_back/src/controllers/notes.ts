import express from 'express';

import { Note } from '../models/note';
import { toNewNote, toUpdateNote } from '../utils/functions';

const notesRouter = express.Router();

notesRouter.get('/', (_request, response) => {
  // callbackに直接async関数は入れられないので、async無名関数を使う形を取る
  void (async () => {
    const notes = await Note.find({});
    response.json(notes);
  })();
});

notesRouter.get('/:id', (request, response) => {
  // callbackに直接async関数は入れられないので、async無名関数を使う形を取る
  void (async () => {
    const note = await Note.findById(request.params.id);
    if (note !== null) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  })();
});

notesRouter.post('/', (request, response, next) => {
  // callbackに直接async関数は入れられないので、async無名関数を使う形を取る
  void (async () => {
    // toNewNoteで例外発生の可能性があるので、try/catchが必要
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
      next(e);
    }
  })();
});

notesRouter.put('/:id', (request, response, next) => {
  void (async () => {
    // toNewNoteで例外発生の可能性があるので、try/catchが必要
    try {
      const note = toUpdateNote(request.body);
      const updatedNote = await Note.findByIdAndUpdate(
        request.params.id,
        note,
        { new: true }
      );
      response.json(updatedNote);
    } catch (e) {
      next(e);
    }
  })();
});

notesRouter.delete('/:id', (request, response) => {
  void (async () => {
    const result = await Note.findByIdAndRemove(request.params.id);
    if (result === null) {
      response.status(404).end();
    } else {
      response.status(204).end();
    }
  })();
});

export { notesRouter };
