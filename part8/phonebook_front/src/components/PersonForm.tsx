import React, { useState } from 'react';
import {
  GetAllPersonsDocument,
  useCreatePersonMutation,
} from '../generated/graphql';

type PersonFormParams = {
  setError: (message: string) => void;
};

export const PersonForm = ({ setError }: PersonFormParams) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const [createPerson] = useCreatePersonMutation({
    refetchQueries: [GetAllPersonsDocument],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    void createPerson({ variables: { name, phone, street, city } });

    setName('');
    setPhone('');
    setStreet('');
    setCity('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone{' '}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street{' '}
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city{' '}
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  );
};
