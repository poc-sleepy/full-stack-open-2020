import React, { useState } from 'react';

import { AnecdoteType, NewAnecdoteType } from './types';

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <a href="#" style={padding}>
        anecdotes
      </a>
      <a href="#" style={padding}>
        create new
      </a>
      <a href="#" style={padding}>
        about
      </a>
    </div>
  );
};

type PropsAnecdoteList = {
  anecdotes: AnecdoteType[];
};

const AnecdoteList = ({ anecdotes }: PropsAnecdoteList) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>{anecdote.content}</li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is &quot;a story with a point.&quot;
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{' '}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{' '}
    <a href="https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
);

type PropCreateNew = {
  addNew: (anecdote: NewAnecdoteType) => void;
};

const CreateNew = (props: PropCreateNew) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    });
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState<AnecdoteType[]>([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notification, setNotification] = useState('');

  const addNew = (newAnecdote: NewAnecdoteType) => {
    const anecdote = {
      ...newAnecdote,
      id: (Math.random() * 10000).toFixed(0),
    };
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id: string) => anecdotes.find((a) => a.id === id);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vote = (id: string) => {
    const anecdote = anecdoteById(id);
    if (anecdote === undefined) return;

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <AnecdoteList anecdotes={anecdotes} />
      <About />
      <CreateNew addNew={addNew} />
      <Footer />
    </div>
  );
};

export default App;
