import React from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';

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

const Notes = (props: PropsFromRedux) => {
  const dispatch = useDispatch();
  return (
    <ul>
      {props.notes.map((note) => (
        <SingleNote
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      ))}
    </ul>
  );
};

type RootState = {
  notes: Note[];
  filter: string;
};

const mapStateToProps = (state: RootState) => {
  if (state.filter === 'ALL') {
    return { notes: state.notes };
  }
  return {
    notes:
      state.filter === 'IMPORTANT'
        ? state.notes.filter((note) => note.important)
        : state.notes.filter((note) => !note.important),
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const ConnectedNotes = connector(Notes);
