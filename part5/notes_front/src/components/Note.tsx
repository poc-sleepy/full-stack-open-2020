import React from 'react';

import { Note } from '../utils/types';

type Props = {
  note: Note;
  toggleImportance: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const SingleNote: React.FC<Props> = ({ note, toggleImportance }: Props) => {
  const label = note.important ? 'make not important' : 'make important';

  return (
    <li className="note">
      <span>{note.content}</span>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default SingleNote;
