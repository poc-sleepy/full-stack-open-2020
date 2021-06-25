import React from 'react';
import { useHistory } from 'react-router-dom';
import { useField } from '../hooks';

import { NewAnecdoteType } from '../types';

type PropCreateNew = {
  addNew: (anecdote: NewAnecdoteType) => void;
};

export const CreateNew = (props: PropCreateNew) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push('/');
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};
