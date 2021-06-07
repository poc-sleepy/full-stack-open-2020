import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { NewNote } from './components/NewNotes';
import { Notes } from './components/Notes';
import { VisibilityFilter } from './components/VisibilityFilter';
import { noteService } from './services/notes';
import { initializeNotes } from './reducers/noteReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    void noteService.getAll().then((notes) => dispatch(initializeNotes(notes)));
  }, []);

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
