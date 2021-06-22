import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

const Home = () => (
  <div>
    {' '}
    <h2>TKTL notes app</h2>{' '}
  </div>
);

type NoteType = {
  id: number;
  content: string;
  important: boolean;
  user: string;
};

type PropNotes = {
  notes: NoteType[];
};

const Note = ({ notes }: PropNotes) => {
  const id = useParams<{ id: string }>().id;
  const note = notes.find((n) => n.id === Number(id));
  if (note === undefined) return <></>;
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div>
        <strong>{note.important ? 'important' : ''}</strong>
      </div>
    </div>
  );
};

const Notes = ({ notes }: PropNotes) => (
  <div>
    <h2>Notes</h2>
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Users = () => (
  <div>
    {' '}
    <h2>Users</h2>{' '}
  </div>
);

const App = () => {
  const [notes] = useState<NoteType[]>([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen',
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      important: false,
      user: 'Matti Luukkainen',
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas',
    },
  ]);

  const padding = {
    padding: 5,
  };

  return (
    <Router>
      <div>
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
          <Route path="/notes/:id">
            <Note notes={notes} />
          </Route>
          <Route path="/notes">
            <Notes notes={notes} />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
