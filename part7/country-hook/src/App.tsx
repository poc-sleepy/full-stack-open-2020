import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { CountryType } from './types';

const useField = (type: string) => {
  const [value, setValue] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name: string) => {
  const baseUrl = 'https://restcountries.eu/rest/v2/name/';
  const [country, setCountry] = useState<CountryType | null | undefined>(null);

  useEffect(() => {
    void (async () => {
      if (!name) {
        setCountry(undefined);
        return country;
      }

      try {
        const response = await axios.get<CountryType[]>(
          `${baseUrl}${name}?fullText=true`
        );
        console.log(response);

        setCountry(response.data[0]);
      } catch (e) {
        setCountry(null);
      }
    })();
  }, [name]);

  return country;
};

type PropsCountry = {
  country: CountryType | null | undefined;
};

const Country = ({ country }: PropsCountry) => {
  if (country === undefined) {
    return null;
  }

  if (country === null) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flag} height="100" alt={`flag of ${country.name}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState<string>('');
  const country = useCountry(name);

  const fetch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
