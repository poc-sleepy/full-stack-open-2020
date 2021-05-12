import React from 'react';

type Props = {
  note: any;
  toggleImportance: (event: React.MouseEvent<HTMLInputElement>) => void;
};

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important';

  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
