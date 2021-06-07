import { Note } from '../types';

const noteReducer = (
  state: Note[] = [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case 'INIT_NOTES':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return action.data;

    case 'NEW_NOTE':
      return state.concat(action.data);

    case 'TOGGLE_IMPORTANCE': {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const id = action.data.id;
      const noteToChange = state.find((n) => n.id === id);
      if (noteToChange === undefined) {
        throw new Error();
      }
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    }

    default:
      return state;
  }
};

export const initializeNotes = (notes: Note[]) => {
  return {
    type: 'INIT_NOTES',
    data: notes,
  };
};

export const createNote = (data: Note) => {
  return {
    type: 'NEW_NOTE',
    data,
  };
};

export const toggleImportanceOf = (id: number) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id },
  };
};

export { noteReducer };
