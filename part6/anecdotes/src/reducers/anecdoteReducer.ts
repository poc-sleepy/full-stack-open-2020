import { Anecdote } from '../types';

const asObject = (anecdote: string) => {
  return {
    content: anecdote,
    votes: 0,
  };
};

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

export const initializeAnecdotes = (data: Anecdote[]) => {
  return {
    type: 'INITIALIZE',
    data,
  };
};

export const createAnecdote = (content: string) => {
  return {
    type: 'CREATE',
    data: asObject(content),
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
