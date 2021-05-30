import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Note } from './types';
import { createNote, toggleImportanceOf } from './reducers/noteReducer';

const App = () => {
  const dispatch = useDispatch();
  // HACK: 本当はキャストではなくバリデーションすべき
  const notes = useSelector((status) => status) as Note[];

  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('called addNote');
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const content: string = event.currentTarget.note.value;
    event.currentTarget.note.value = '';
    dispatch(createNote(content));
  };

  const toggleImportance = (id: number) => {
    console.log('called toggleImportance');
    dispatch(toggleImportanceOf(id));
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id} onClick={() => toggleImportance(Number(note.id))}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
