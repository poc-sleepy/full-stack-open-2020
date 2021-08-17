import React from 'react';
import { useState } from 'react';
import {
  GetAllAuthorsQuery,
  useUpdateAuthorMutation,
} from '../generated/graphql';

type AuthorFormProps = {
  authors: GetAllAuthorsQuery['allAuthors'];
};

export const AuthorForm = (props: AuthorFormProps) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [updateAuthor] = useUpdateAuthorMutation({
    refetchQueries: ['getAllAuthors'],
  });

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    void updateAuthor({
      variables: { name: String(name), setBornTo: Number(born) },
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
          <select
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          >
            {props.authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
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
