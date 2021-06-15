import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { createNote } from '../reducers/noteReducer';

const NewNote = (props: PropsFromRedux) => {
  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const content: string = event.currentTarget.note.value;
    event.currentTarget.note.value = '';
    props.createNote(content);
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};

const mapDispatchToProps = {
  createNote,
};

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const ConnectedNewNote = connector(NewNote);
