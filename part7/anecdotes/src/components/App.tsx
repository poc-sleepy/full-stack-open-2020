import React, { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { About } from './About';
import { AnecdoteSingle } from './AnecdoteSingle';
import { AnecdoteList } from './AnecdotesList';
import { CreateNew } from './CreateNew';
import { Footer } from './Footer';
import { Menu } from './Menu';

import { AnecdoteType, NewAnecdoteType } from '../types';

export const App = () => {
  const [anecdotes, setAnecdotes] = useState<AnecdoteType[]>([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ]);

  const match = useRouteMatch<{ id: string }>('/anecdotes/:id');
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === match.params.id)
    : null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notification, setNotification] = useState('');

  const addNew = (newAnecdote: NewAnecdoteType) => {
    const anecdote = {
      ...newAnecdote,
      id: (Math.random() * 10000).toFixed(0),
    };
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id: string) => anecdotes.find((a) => a.id === id);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vote = (id: string) => {
    const anecdote = anecdoteById(id);
    if (anecdote === undefined) return;

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Switch>
        <Route path="/anecdotes/:id">
          <AnecdoteSingle anecdote={anecdote} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
