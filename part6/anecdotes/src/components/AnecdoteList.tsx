import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { voteOf } from '../reducers/anecdoteReducer';
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer';
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
  filter: string;
};

const AnecdoteList = () => {
  const filter = useSelector((state: RootState) => state.filter);
  const anecdotes = useSelector((state: RootState) =>
    state.anecdotes.filter((anecdote) => anecdote.content.includes(filter))
  );
  const dispatch = useDispatch();

  const vote = (anecdote: Anecdote) => {
    dispatch(voteOf(anecdote.id, anecdote));
    dispatch(setNotification(`Voted: ${anecdote.content}`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <SingleAnecdote
          key={anecdote.id}
          anecdote={anecdote}
          onClick={() => vote(anecdote)}
        />
      ))}
    </>
  );
};

export { AnecdoteList };
