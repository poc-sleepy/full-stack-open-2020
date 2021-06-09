import React from 'react';
import { useDispatch } from 'react-redux';

import { createAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer';
import { anecdoteService } from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnocdote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const content: string = event.currentTarget.content.value;
    event.currentTarget.content.value = '';
    const anecdote = await anecdoteService.create(content);
    dispatch(createAnecdote(anecdote));
    dispatch(setNotification(`Created: ${anecdote.content}`));
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
