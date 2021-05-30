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

const Notes = () => {
  const dispatch = useDispatch();
  // HACK: 本当はキャストではなくバリデーションすべき
  const notes = useSelector((status) => status) as Note[];

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
