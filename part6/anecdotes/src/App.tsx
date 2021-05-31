import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createAnocdote, voteOf } from './reducers/anecdoteReducer';
import { Anecdote } from './types';

const App = () => {
  // HACK: should not cast but validate
  const anecdotes = useSelector((state) => state) as Anecdote[];
  const dispatch = useDispatch();

  const addAnocdote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createAnocdote(event.currentTarget.content.value));
  };

  const vote = (id: string) => {
    dispatch(voteOf(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnocdote}>
        <div>
          <input type="text" name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
