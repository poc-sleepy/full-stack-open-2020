import React from 'react';

import { Persons } from './Persons';
import { useGetAllPersonsQuery } from '../generated/graphql';

export const App = () => {
  const result = useGetAllPersonsQuery();

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.data === undefined) {
    return <div>No person.</div>;
  }

  return <Persons persons={result.data.allPersons} />;
};
