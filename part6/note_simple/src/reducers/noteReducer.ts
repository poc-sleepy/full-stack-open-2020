import { Note } from '../types';

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
];

const noteReducer = (
  state: Note[] = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: string; data: any }
) => {
  switch (action.type) {
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

const generateId = () => Math.floor(Math.random() * 1000000);

export const createNote = (content: string) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

export const toggleImportanceOf = (id: number) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id },
  };
};

export { noteReducer };
