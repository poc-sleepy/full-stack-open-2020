import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  
  const newBlog = {
    title: 'Unit Test of React App',
    author: 'poc_sleepy',
    url: 'https://example.com',
  };
  const createBlogHandler = jest.fn();

  const component = render(<BlogForm createBlogHandler={createBlogHandler} />);

  const inputTitle = component.container.querySelector('input[name=title]');
  expect(inputTitle).not.toBeNull();
  if (inputTitle === null) return;

  const inputAuthor = component.container.querySelector('input[name=author]');
  expect(inputAuthor).not.toBeNull();
  if (inputAuthor === null) return;

  const inputUrl = component.container.querySelector('input[name=url]');
  expect(inputUrl).not.toBeNull();
  if (inputUrl === null) return;

  const form = component.container.querySelector('form');
  expect(form).not.toBeNull();
  if (form === null) return;

  fireEvent.change(inputTitle, {
    target: { value: newBlog.title },
  });
  fireEvent.change(inputAuthor, {
    target: { value: newBlog.author },
  });
  fireEvent.change(inputUrl, {
    target: { value: newBlog.url },
  });

  fireEvent.submit(form);

  expect(createBlogHandler.mock.calls).toHaveLength(1);
  expect(createBlogHandler.mock.calls[0][0]).toEqual(newBlog);
});
