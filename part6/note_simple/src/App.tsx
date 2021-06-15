import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ConnectedNewNote } from './components/NewNotes';
import { ConnectedNotes } from './components/Notes';
import { VisibilityFilter } from './components/VisibilityFilter';
import { initializeNotes } from './reducers/noteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
  }, []);

  return (
    <div>
      <ConnectedNewNote />
      <VisibilityFilter />
      <ConnectedNotes />
    </div>
  );
};

export default App;
