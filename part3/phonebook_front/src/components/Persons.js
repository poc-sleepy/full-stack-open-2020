/* eslint-disable react/prop-types */
import React from 'react';

// eslint-disable-next-line react/prop-types
const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      {persons.map((person) => (
        <Person key={person.name} person={person} deletePerson={deletePerson} />
      ))}
    </>
  );
};

// eslint-disable-next-line react/prop-types
const Person = ({ person, deletePerson }) => (
  <p>
    {person.name} {person.number}
    <button onClick={() => deletePerson(person)}>delete</button>
  </p>
);

export default Persons;
