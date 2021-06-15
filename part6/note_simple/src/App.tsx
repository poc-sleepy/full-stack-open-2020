import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { NewNote } from './components/NewNotes';
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
      <NewNote />
      <VisibilityFilter />
      <ConnectedNotes />
    </div>
  );
};

export default App;
