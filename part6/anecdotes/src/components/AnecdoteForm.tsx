import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props: PropsFromRedux) => {
  const addAnocdote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const content: string = event.currentTarget.content.value;
    event.currentTarget.content.value = '';
    props.createAnecdote(content);
    props.setNotification(`Created: ${content}`, 5);
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

const mapStateToDispatch = {
  createAnecdote,
  setNotification,
};

const connector = connect(null, mapStateToDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const ConnectedAnecdoteForm = connector(AnecdoteForm);
