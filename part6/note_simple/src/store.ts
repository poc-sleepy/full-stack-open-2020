import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { filterReducer } from './reducers/filterReducer';
import { noteReducer } from './reducers/noteReducer';

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

export const store = createStore(reducer, composeWithDevTools());
