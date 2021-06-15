import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { noteService } from '../services/notes';
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

export const initializeNotes = (): ThunkAction<
  void,
  Note[],
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch({
      type: 'INIT_NOTES',
      data: notes,
    });
  };
};

export const createNote = (
  content: string
): ThunkAction<void, Note[], unknown, AnyAction> => {
  return async (dispatch) => {
    const createdNote = await noteService.create(content);
    dispatch({
      type: 'NEW_NOTE',
      data: createdNote,
    });
  };
};

export const toggleImportanceOf = (id: number) => {
  // TODO: バックエンドへの反映処理が未実装
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id },
  };
};

export { noteReducer };
