import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Note } from '../types';
import { toggleImportanceOf } from '../reducers/noteReducer';

type PropsNote = {
  note: Note;
  handleClick: () => void;
};

const SingleNote = ({ note, handleClick }: PropsNote) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  );
};

type RootState = {
  notes: Note[];
  filter: string;
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => {
    if (state.filter === 'ALL') {
      return state.notes;
    }
    return state.filter === 'IMPORTANT'
      ? state.notes.filter((note) => note.important)
      : state.notes.filter((note) => !note.important);
  });

  return (
    <ul>
      {notes.map((note) => (
        <SingleNote
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      ))}
    </ul>
  );
};

export { Notes };
