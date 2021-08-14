import React, { useEffect, useState } from 'react';

import { useEditNumberMutation } from '../generated/graphql';

type PhoneFormParams = {
  setError: (message: string) => void;
};

export const PhoneForm = ({ setError }: PhoneFormParams) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [changeNumber, result] = useEditNumberMutation();

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('person not found');
    }
  }, [result.data]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    void changeNumber({ variables: { name, phone } });

    setName('');
    setPhone('');
  };

  return (
    <div>
      <h2>change number</h2>

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
        <button type="submit">change number</button>
      </form>
    </div>
  );
};
