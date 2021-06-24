import React from 'react';

import { AnecdoteType } from '../types';

type PropsAnecdoteSingle = {
  anecdote: AnecdoteType | null | undefined;
};

export const AnecdoteSingle = ({ anecdote }: PropsAnecdoteSingle) => {
  if (anecdote === null || anecdote === undefined) return <></>;

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};
