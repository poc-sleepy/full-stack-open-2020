import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Home = () => (
  <div>
    {' '}
    <h2>TKTL notes app</h2>{' '}
  </div>
);

const Notes = () => (
  <div>
    {' '}
    <h2>Notes</h2>{' '}
  </div>
);

const Users = () => (
  <div>
    {' '}
    <h2>Users</h2>{' '}
  </div>
);

const App = () => {
  const padding = {
    padding: 5,
  };

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>

      <Switch>
        <Route path="/notes">
          <Notes />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <div>
        <i>Note app, Department of Computer Science 2021</i>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
