import React from 'react';

type Props = {
  createBlogHandler: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  author: string;
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
};

const BlogForm: React.FC<Props> = (props: Props) => (
  <form onSubmit={props.createBlogHandler}>
    <div>
      title:{' '}
      <input
        type="text"
        name="title"
        value={props.title}
        onChange={({ target }) => {
          props.setTitle(target.value);
        }}
      ></input>
    </div>
    <div>
      author:{' '}
      <input
        type="text"
        name="author"
        value={props.author}
        onChange={({ target }) => {
          props.setAuthor(target.value);
        }}
      ></input>
    </div>
    <div>
      url:{' '}
      <input
        type="text"
        name="url"
        value={props.url}
        onChange={({ target }) => {
          props.setUrl(target.value);
        }}
      ></input>
    </div>
    <button type="submit">create</button>
  </form>
);

export default BlogForm;
