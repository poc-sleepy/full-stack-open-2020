import { Anecdote } from '../types';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote: string): Anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

export const anecdoteReducer = (
  state = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: string; data: any }
) => {
  switch (action.type) {
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

export const createAnocdote = (content: string) => {
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
