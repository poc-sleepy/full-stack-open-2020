import React from 'react';

import { NewNote } from './components/NewNotes';
import { Notes } from './components/Notes';
import { VisibilityFilter } from './components/VisibilityFilter';

const App = () => {
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
