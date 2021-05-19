import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import SingleBlog from './Blog';
import { BlogType } from '../utils/types';

let component: RenderResult;

const blog: BlogType = {
  id: 'hogehoge',
  title: 'sample blog',
  author: 'poc_sleepy',
  url: 'http://example.com',
  likes: 12,
  createdBy: {
    id: 'piyopiyo',
    username: 'tanaka',
    name: 'Mr.T',
  },
};
const mockHandler = jest.fn();
const mockHandler2 = jest.fn();

beforeEach(() => {
  component = render(
    <SingleBlog
      blog={blog}
      likesBlogHandler={mockHandler}
      removeBlogHandler={mockHandler2}
    />
  );
});

test('renders content', () => {
  const blogCard = component.container.querySelector('.blogCard');

  expect(blogCard).toHaveTextContent('sample blog');
  expect(blogCard).toHaveTextContent('poc_sleepy');
  expect(blogCard).toHaveTextContent('http://example.com');
  expect(blogCard).toHaveTextContent('12');
  expect(blogCard).toHaveTextContent('Mr.T');
});

test('detail is hidden', () => {
  const urlWrapper = component.getByText(blog.url).closest('div');
  const likesWrapper = component
    .getByText(`likes: ${blog.likes}`)
    .closest('div');
  expect(urlWrapper).toHaveStyle({ display: 'none' });
  expect(likesWrapper).toHaveStyle({ display: 'none' });
});

test('detail is shown after clicking the button', () => {
  const button = component.getByText('view');
  fireEvent.click(button);

  const urlWrapper = component.getByText(blog.url).closest('div');
  const likesWrapper = component
    .getByText(`likes: ${blog.likes}`)
    .closest('div');
  expect(urlWrapper).not.toHaveStyle({ display: 'none' });
  expect(likesWrapper).not.toHaveStyle({ display: 'none' });
});

test('likes button calls likesBlogHandler', () => {
  const button = component.getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
