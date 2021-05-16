import React, { useState } from 'react';
import { NewBlogType } from '../utils/types';

type Props = {
  createBlogHandler: (newBlog: NewBlogType) => Promise<void>;
};

const BlogForm: React.FC<Props> = (props: Props) => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  const createBlogHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void props.createBlogHandler({ title, author, url });
  };

  return (
    <form onSubmit={createBlogHandler}>
      <div>
        title:{' '}
        <input
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        ></input>
      </div>
      <div>
        author:{' '}
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => {
            setAuthor(target.value);
          }}
        ></input>
      </div>
      <div>
        url:{' '}
        <input
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => {
            setUrl(target.value);
          }}
        ></input>
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
