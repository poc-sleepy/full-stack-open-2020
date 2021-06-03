import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { voteOf } from '../reducers/anecdoteReducer';
import { Anecdote } from '../types';

type Props = {
  anecdote: Anecdote;
  onClick: () => void;
};

const SingleAnecdote = (props: Props) => {
  const anecdote = props.anecdote;
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={props.onClick}>vote</button>
      </div>
    </div>
  );
};

type RootState = {
  anecdotes: Anecdote[];
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state: RootState) => state.anecdotes);
  const dispatch = useDispatch();

  const vote = (id: string) => {
    dispatch(voteOf(id));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <SingleAnecdote
          key={anecdote.id}
          anecdote={anecdote}
          onClick={() => vote(anecdote.id)}
        />
      ))}
    </>
  );
};

export { AnecdoteList };
