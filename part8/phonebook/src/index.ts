import { ApolloServer } from 'apollo-server';
import fs from 'fs';
import { v1 as uuid } from 'uuid';

import { Resolvers, Person } from './generated/graphql';

let persons: Person[] = [
  {
    name: 'Arto Hellas',
    phone: '040-123543',
    address: {
      street: 'Tapiolankatu 5 A',
      city: 'Espoo',
    },
    id: '3d594650-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Matti Luukkainen',
    phone: '040-432342',
    address: {
      street: 'Malminkaari 10 A',
      city: 'Helsinki',
    },
    id: '3d599470-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Venla Ruuska',
    address: {
      street: 'Nallemäentie 22 C',
      city: 'Helsinki',
    },
    id: '3d599471-3436-11e9-bc57-8b80ba54c431',
  },
];

const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf8' });

const resolvers: Resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (_root, args) => {
      const person = persons.find((p) => p.name === args.name);
      return person === undefined ? null : person;
    },
  },
  Mutation: {
    addPerson: (_root, args) => {
      const person = {
        ...args,
        id: uuid(),
        name: args.name,
        phone: args.phone,
        address: {
          street: args.street,
          city: args.city,
        },
      };
      persons = persons.concat(person);
      return person;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

void server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
