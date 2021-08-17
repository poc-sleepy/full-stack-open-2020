import React from 'react';
import { useState } from 'react';
import { useUpdateAuthorMutation } from '../generated/graphql';

export const AuthorForm = () => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [updateAuthor] = useUpdateAuthorMutation({
    refetchQueries: ['getAllAuthors'],
  });

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    void updateAuthor({
      variables: { name, setBornTo: Number(born) },
    });
    setName('');
    setBorn('');
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};
