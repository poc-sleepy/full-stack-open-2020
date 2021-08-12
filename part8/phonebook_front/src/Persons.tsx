import React, { useEffect, useState } from 'react';
import {
  GetAllPersonsQuery,
  Person,
  useFindPersonByNameLazyQuery,
} from './generated/graphql';
import { PersonForm } from './PersonForm';

type PersonsParams = { persons: GetAllPersonsQuery['allPersons'] };

const Persons = ({ persons }: PersonsParams) => {
  const [getPerson, result] = useFindPersonByNameLazyQuery();
  const [person, setPerson] = useState<Person | null>(null);

  const showPerson = (name: string) => {
    getPerson({ variables: { nameToSearch: name } });
  };

  useEffect(() => {
    if (result.data) {
      setPerson(
        result.data.findPerson === undefined ? null : result.data.findPerson
      );
    }
  }, [result]);

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>
          {person.address.street} {person.address.city}
        </div>
        <div>{person.phone}</div>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => showPerson(p.name)}>show address</button>
        </div>
      ))}
      <PersonForm />
    </div>
  );
};

export { Persons };
