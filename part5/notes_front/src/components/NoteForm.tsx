import React, { useState } from 'react';
import { NewNote } from '../utils/types';

type Props = {
  createNote: (newNote: NewNote) => void;
};

const NoteForm: React.FC<Props> = ({ createNote }) => {
  const [newNote, setNewNote] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value);
  };

  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createNote({
      content: newNote,
      date: new Date().toISOString(),
      important: false,
    });

    setNewNote('');
  };

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input id="newNote" value={newNote} onChange={handleChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
