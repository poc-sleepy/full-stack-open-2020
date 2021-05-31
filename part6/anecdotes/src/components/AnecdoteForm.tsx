import React from 'react';
import { useDispatch } from 'react-redux';

import { createAnocdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnocdote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createAnocdote(event.currentTarget.content.value));
  };

  return (
    <form onSubmit={addAnocdote}>
      <div>
        <input type="text" name="content" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export { AnecdoteForm };
