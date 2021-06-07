import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { noteReducer, initializeNotes } from './reducers/noteReducer';
import { filterReducer } from './reducers/filterReducer';
import { noteService } from './services/notes';

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools());

void noteService
  .getAll()
  .then((notes) => store.dispatch(initializeNotes(notes)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <div />
  </React.StrictMode>,
  document.getElementById('root')
);
