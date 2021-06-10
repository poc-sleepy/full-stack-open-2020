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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return action.data;

    case 'CREATE':
      return state.concat(action.data);

    case 'VOTE':
      const toVote = state.find((anecdote) => anecdote.id === action.data.id);
      if (toVote === undefined) {
        return state;
      }
      const voted: Anecdote = {
        ...toVote,
        votes: toVote.votes + 1,
      };
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

export const createAnecdote = (data: Anecdote) => {
  return {
    type: 'CREATE',
    data,
  };
};

export const voteOf = (id: string) => {
  return {
    type: 'VOTE',
    data: {
      id,
    },
  };
};
