import React from 'react';
import { useHistory } from 'react-router-dom';
import { useField } from '../hooks';

import { NewAnecdoteType } from '../types';

type PropCreateNew = {
  addNew: (anecdote: NewAnecdoteType) => void;
};

export const CreateNew = (props: PropCreateNew) => {
  const [content, handleContent] = useField('text');
  const [author, handleAuthor] = useField('text');
  const [info, handleInfo] = useField('text');

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

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleContent.clear();
    handleAuthor.clear();
    handleInfo.clear();
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
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};
