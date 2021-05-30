import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import { noteReducer } from './reducers/noteReducer';

const store = createStore(noteReducer);

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2,
  },
});

store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  data: {
    id: 2,
  },
});

const generateId = () => Math.floor(Math.random() * 1000000);

const createNote = (content: string) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

const toggleImportanceOf = (id: number) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id },
  };
};

const App = () => {
  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('called addNote');
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const content: string = event.currentTarget.note.value;
    event.currentTarget.note.value = '';
    store.dispatch(createNote(content));
  };

  const toggleImportance = (id: number) => {
    console.log('called toggleImportance');
    store.dispatch(toggleImportanceOf(id));
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id} onClick={() => toggleImportance(Number(note.id))}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);

export default App;
