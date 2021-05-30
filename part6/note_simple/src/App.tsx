import React from 'react';

import { NewNote } from './components/NewNotes';
import { Notes } from './components/Notes';

const App = () => {
  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  );
};

export default App;
