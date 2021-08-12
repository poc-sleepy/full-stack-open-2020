import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { queryResultData } from './types';
import { Persons } from './Persons';

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

export const App = () => {
  const result = useQuery<queryResultData>(ALL_PERSONS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.data === undefined) {
    return <div>No person.</div>;
  }

  return <Persons persons={result.data.allPersons} />;
};
