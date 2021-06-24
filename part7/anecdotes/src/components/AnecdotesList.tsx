import React from 'react';
import { Link } from 'react-router-dom';

import { AnecdoteType } from '../types';

type PropsAnecdoteList = {
  anecdotes: AnecdoteType[];
};

export const AnecdoteList = ({ anecdotes }: PropsAnecdoteList) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);
