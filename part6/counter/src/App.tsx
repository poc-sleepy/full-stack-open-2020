import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const counterReducer = (state = 0, action: { type: unknown }) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ZERO':
      return 0;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

const App = () => {
  return (
    <div>
      <div>{store.getState()}</div>
      <button onClick={(_e) => store.dispatch({ type: 'INCREMENT' })}>
        plus
      </button>
      <button onClick={(_e) => store.dispatch({ type: 'DECREMENT' })}>
        minus
      </button>
      <button onClick={(_e) => store.dispatch({ type: 'ZERO' })}>zero</button>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);

export default App;
