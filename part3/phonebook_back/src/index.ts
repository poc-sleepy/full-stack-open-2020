import express from 'express';
import { Person } from './types';

const app = express();
app.use(express.json());

let persons: Person[] = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
];

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

app.delete('/api/persons/:id', (request, response) => {
  persons = persons.filter((p) => p.id !== Number(request.params.id));
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
