import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import SingleNote from './Note';

test('renders content', () => {
  const note = {
    id: 'hogehoge',
    date: 'piyopiyo',
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  const mockHandler = jest.fn();

  const component = render(
    <SingleNote note={note} toggleImportance={mockHandler} />
  );

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
});

test('clicking the button calls event handler once', () => {
  const note = {
    id: 'hogehoge',
    date: 'piyopiyo',
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  const mockHandler = jest.fn();

  const component = render(
    <SingleNote note={note} toggleImportance={mockHandler} />
  );

  const button = component.getByText('make not important');
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
