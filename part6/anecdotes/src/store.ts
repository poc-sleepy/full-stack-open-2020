import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { anecdoteReducer } from './reducers/anecdoteReducer';
import { filterReducer } from './reducers/filterReducer';
import { notificationReducer } from './reducers/notificationReducer';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer,
});

export const store = createStore(reducer, composeWithDevTools());
