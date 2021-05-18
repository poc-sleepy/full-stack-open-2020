import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import SingleNote from './Note';

test('renders content', () => {
  const note = {
    id: 'hogepiyo',
    date: new Date().toISOString(),
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  const component = render(
    <SingleNote
      note={note}
      toggleImportance={() => {
        return;
      }}
    />
  );

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
});
