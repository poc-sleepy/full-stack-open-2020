import React from 'react';
import { useSelector } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';

import { Anecdote } from './types';

const App = () => {
  // HACK: should not cast but validate
  const anecdotes = useSelector((state) => state) as Anecdote[];
  // const dispatch = useDispatch();

  const vote = (id: string) => {
    console.log('vote', id);
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
      <form>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
