import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ConnectedAnecdoteForm } from './components/AnecdoteForm';
import { AnecdoteList } from './components/AnecdoteList';
import { ConnectedFilter } from './components/Filter';
import { ConnectedNotification } from './components/Notification';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  return (
    <div>
      <ConnectedNotification />
      <ConnectedFilter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <ConnectedAnecdoteForm />
    </div>
  );
};

export default App;
