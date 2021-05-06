import express from 'express';

import { Note } from '../models/note';
import { User } from '../models/user';
import { toNewNote, toUpdateNote } from '../utils/functions';

const notesRouter = express.Router();

notesRouter.get('/', (_request, response, next) => {
  // callbackに直接async関数は入れられないので、async無名関数を使う形を取る
  void (async () => {
    try {
      const notes = await Note.find({}).populate('user', {
        username: 1,
        name: 1,
      });
      response.json(notes);
    } catch (e) {
      next(e);
    }
  })();
});

notesRouter.get('/:id', (request, response, next) => {
  // callbackに直接async関数は入れられないので、async無名関数を使う形を取る
  void (async () => {
    try {
      const note = await Note.findById(request.params.id).populate('user', {
        username: 1,
        name: 1,
      });
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

notesRouter.post('/', (request, response, next) => {
  // callbackに直接async関数は入れられないので、async無名関数を使う形を取る
  void (async () => {
    // toNewNoteで例外発生の可能性があるので、try/catchが必要
    try {
      const user = await User.findById(request.body.userId);

      if (user === null) {
        const error = new Error(
          `Invalid userId: ${request.body.userId}, not found the user.`
        );
        error.name = 'InvalidValueError';
        throw error;
      }

      const newNote = toNewNote(request.body);
      const note = new Note({
        content: newNote.content,
        important: newNote.important || false,
        date: new Date(),
        user: user._id,
      });
      const savedNote = await note.save();
      user.notes = user.notes.concat(savedNote._id);
      await user.save();

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

notesRouter.delete('/:id', (request, response, next) => {
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

export { notesRouter };
