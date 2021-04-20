import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Person } from './types';
import { getRandomInt, toNewPerson } from './utils';

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ');
  })
);

let persons: Person[] = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
];

const generateId = (): number => {
  const id = getRandomInt(100000);
  const person = persons.find((p) => p.id === id);
  if (person === undefined) {
    console.log(id);
    return id;
  } else {
    return generateId();
  }
};

app.get('/ping', (_request, response) => {
  response.send('pong');
});

app.get('/info', (_request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  );
});

app.get('/api/persons', (_request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const person = persons.find((p) => p.id === Number(request.params.id));
  if (person === undefined) {
    response.status(404).end();
  } else {
    response.json(person);
  }
});

app.post('/api/persons', (request, response) => {
  try {
    const newPerson = toNewPerson(request.body);

    if (persons.find((p) => p.name === newPerson.name) !== undefined) {
      throw new Error(`name must be unique: ${newPerson.name}`);
    }

    const person = {
      id: generateId(),
      ...newPerson,
    };
    persons = persons.concat(person);
    response.status(201).json(person);
  } catch (e) {
    response.status(400).send(e.message);
  }
});

app.delete('/api/persons/:id', (request, response) => {
  persons = persons.filter((p) => p.id !== Number(request.params.id));
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
