import React from 'react';
import { Book } from '../generated/graphql';

type BooksProps = {
  show: boolean;
};

const Books = (props: BooksProps) => {
  if (!props.show) {
    return null;
  }

  const books: Book[] = [];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
