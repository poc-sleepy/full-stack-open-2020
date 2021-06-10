import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { anecdoteService } from '../services/anecdotes';
import { Anecdote } from '../types';

export const anecdoteReducer = (
  state: Anecdote[] = [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case 'INITIALIZE':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const initialState: Anecdote[] = action.data;
      return initialState.sort((a, b) => b.votes - a.votes);

    case 'CREATE':
      return state.concat(action.data);

    case 'VOTE':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const voted: Anecdote = action.data;
      const newState = state.map((anecdote) =>
        anecdote.id === action.data.id ? voted : anecdote
      );
      // HACK: Voteの数を0以外にする箇所が増えたら、そこでもソートする必要あり
      return newState.sort((a, b) => b.votes - a.votes);

    default:
      break;
  }

  return state;
};

export const initializeAnecdotes = (): ThunkAction<
  void,
  Anecdote[],
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes,
    });
  };
};

export const createAnecdote = (
  content: string
): ThunkAction<void, Anecdote[], unknown, AnyAction> => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content);
    dispatch({
      type: 'CREATE',
      data: anecdote,
    });
  };
};

export const voteOf = (
  id: string,
  anecdote: Anecdote
): ThunkAction<void, Anecdote[], unknown, AnyAction> => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.update(id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });

    dispatch({
      type: 'VOTE',
      data: votedAnecdote,
    });
  };
};
