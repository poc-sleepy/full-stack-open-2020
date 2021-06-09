import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AnecdoteForm } from './components/AnecdoteForm';
import { AnecdoteList } from './components/AnecdoteList';
import { Filter } from './components/Filter';
import { Notification } from './components/Notification';
import { initializeAnecdotes } from './reducers/anecdoteReducer';
import { anecdoteService } from './services/anecdotes';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    void anecdoteService.getAll().then((anecdotes) => {
      dispatch(initializeAnecdotes(anecdotes));
    });
  }, []);

  return (
    <div>
      <Notification />
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
