import React, { useState } from 'react';

import { Persons } from './Persons';
import { useGetAllPersonsQuery } from '../generated/graphql';
import { PersonForm } from './PersonForm';
import { PhoneForm } from './PhoneForm';

export const App = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const result = useGetAllPersonsQuery();

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.data === undefined) {
    return <div>No person.</div>;
  }

  const notify = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PhoneForm setError={notify} />
      <PersonForm setError={notify} />
    </div>
  );
};

type NotifyParams = {
  errorMessage: string | null;
};

const Notify = ({ errorMessage }: NotifyParams) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};
