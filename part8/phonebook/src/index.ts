import { ApolloServer, UserInputError } from 'apollo-server';
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
    allPersons: (_root, args) => {
      if (!args.phone) {
        return persons;
      }
      const byPhone = (person: Person) =>
        args.phone === 'YES' ? person.phone : !person.phone;
      return persons.filter(byPhone);
    },
    findPerson: (_root, args) => {
      const person = persons.find((p) => p.name === args.name);
      return person === undefined ? null : person;
    },
  },
  Mutation: {
    addPerson: (_root, args) => {
      if (persons.find((p) => p.name === args.name)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name,
        });
      }

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
    editNumber: (_root, args) => {
      const person = persons.find((p) => p.name === args.name);
      if (!person) {
        return null;
      }

      const updatedPerson = { ...person, phone: args.phone };
      persons = persons.map((p) => (p.name === args.name ? updatedPerson : p));
      return updatedPerson;
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
