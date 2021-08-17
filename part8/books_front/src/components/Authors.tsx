import React from 'react';
import {
  GetAllAuthorsQuery,
  useGetAllAuthorsQuery,
} from '../generated/graphql';
import { AuthorForm } from './AuthorForm';

type AuthorsProps = {
  show: boolean;
};

const Authors = (props: AuthorsProps) => {
  if (!props.show) {
    return null;
  }

  const result = useGetAllAuthorsQuery();

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.data === undefined) {
    return <div>No person.</div>;
  }

  const authors: GetAllAuthorsQuery['allAuthors'] = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AuthorForm authors={authors} />
    </div>
  );
};

export default Authors;
