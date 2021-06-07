import React from 'react';
import { useDispatch } from 'react-redux';

import { noteService } from '../services/notes';
import { createNote } from '../reducers/noteReducer';

const NewNote = (_props: unknown) => {
  const dispatch = useDispatch();

  const addNote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const content = event.currentTarget.note.value;
    event.currentTarget.note.value = '';
    const createdNote = await noteService.create(content);
    dispatch(createNote(createdNote));
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};

export { NewNote };
