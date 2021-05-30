import React from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';

const NewNote = (_props: unknown) => {
  const dispatch = useDispatch();

  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const content = event.currentTarget.note.value;
    event.currentTarget.note.value = '';
    dispatch(createNote(content));
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};

export { NewNote };
