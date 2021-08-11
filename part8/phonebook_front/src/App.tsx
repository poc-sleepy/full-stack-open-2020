import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { allPersonData, Person } from './types';

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

type PersonsParams = { persons: Person[] };

const Persons = ({ persons }: PersonsParams) => {
  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div key={p.name}>
          {p.name} {p.phone}
        </div>
      ))}
    </div>
  );
};

export const App = () => {
  const result = useQuery<allPersonData>(ALL_PERSONS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.data === undefined) {
    return <div>No person.</div>;
  }

  return <Persons persons={result.data.allPersons} />;
};
