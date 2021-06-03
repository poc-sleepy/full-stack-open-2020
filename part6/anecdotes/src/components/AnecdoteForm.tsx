import React from 'react';
import { useDispatch } from 'react-redux';

import { createAnocdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnocdote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createAnocdote(event.currentTarget.content.value));
    dispatch(setNotification(`Created: ${event.currentTarget.content.value}`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
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
