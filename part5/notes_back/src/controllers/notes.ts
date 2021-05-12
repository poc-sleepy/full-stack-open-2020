import express from 'express';
import jwt from 'jsonwebtoken';

import { Note } from '../models/note';
import { User } from '../models/user';
import { config } from '../utils/config';
import { toNewNote, toUpdateNote } from '../utils/functions';
import { UserToken } from '../utils/types';

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

const getTokenFrom = (request: express.Request): string | null => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

notesRouter.post('/', (request, response, next) => {
  // callbackに直接async関数は入れられないので、async無名関数を使う形を取る
  void (async () => {
    // toNewNoteで例外発生の可能性があるので、try/catchが必要
    try {
      const token = getTokenFrom(request);
      const secret = config.SECRET;
      if (token === null) {
        response.status(401).json({ error: 'token missing or invalid' });
        return;
      }
      if (secret === undefined) {
        throw new Error('Environment variable SECRET is not given.');
      }

      const decodedTokenNever = jwt.verify(token, secret);
      if (typeof decodedTokenNever !== 'object') {
        response.status(401).json({ error: 'token missing or invalid' });
        return;
      }
      const decodedToken = decodedTokenNever as UserToken;

      if (!token || !decodedToken.id) {
        response.status(401).json({ error: 'token missing or invalid' });
        return;
      }
      const user = await User.findById(decodedToken.id);

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
