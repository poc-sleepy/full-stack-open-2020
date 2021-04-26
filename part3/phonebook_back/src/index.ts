import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { Person } from './models/person';
import { PersonType } from './types';
import { toNewPerson } from './utils';

void dotenv.config();

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

let persons: PersonType[] = [
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
  void (async () => {
    const persons = await Person.find({});
    response.json(persons);
  })();
});

app.get('/api/persons/:id', (request, response) => {
  void (async () => {
    const person = await Person.findById(request.params.id);
    response.json(person);
  })();
});

app.post('/api/persons', (request, response) => {
  // callbackに直接async関数は入れられないので、async無名関数を使う形を取る
  void (async () => {
    try {
      const newPerson = toNewPerson(request.body);
      const person = new Person({ ...newPerson });
      const savedPerson = await person.save();
      response.json(savedPerson);
    } catch (e) {
      response.status(400).send(e.message);
    }
  })();
});

app.delete('/api/persons/:id', (request, response) => {
  persons = persons.filter((p) => p.id !== Number(request.params.id));
  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
