import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ query, onChange }) => {
  return (
    <div>
      find countries <input value={query} onChange={onChange} />
    </div>
  );
};

const Countries = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) => (
        <Country key={country.alpha2Code} country={country} />
      ))}
    </ul>
  );
};

const Country = ({ country }) => <li>{country.name}</li>;

const Language = ({ lang }) => <li>{lang.name}</li>;

const CountryDetail = ({ country }) => {
  return (
    <>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((lang) => (
          <Language key={lang.iso639_1} lang={lang} />
        ))}
      </ul>
      <img src={country.flag} alt={country.name} />
    </>
  );
};

const Content = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <p>
        Too many matches, specify another filter ({countries.length} countries)
      </p>
    );
  } else if (countries.length > 1) {
    return <Countries countries={countries} />;
  } else if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />;
  } else {
    return <p>No country matches, specify another filter</p>;
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const countriesToShow = query.trim()
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase())
      )
    : countries;

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  console.log('countries', countriesToShow);

  return (
    <div>
      <Filter query={query} onChange={handleQueryChange} />
      <Content countries={countriesToShow} />
    </div>
  );
};

export default App;
