import React, { useState } from 'react';
import { useCreateBookMutation } from '../generated/graphql';

type NewBookProps = {
  show: boolean;
};

const NewBook = (props: NewBookProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuhtor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState<string>('');
  const [genres, setGenres] = useState<string[]>([]);

  const [createBook] = useCreateBookMutation({
    refetchQueries: ['getAllAuthors', 'getAllBooks'],
  });

  if (!props.show) {
    return null;
  }

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('add book...');
    void createBook({
      variables: { title, author, published: Number(published), genres },
    });

    setTitle('');
    setPublished('');
    setAuhtor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
