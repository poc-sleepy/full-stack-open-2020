import React from 'react';

const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      {persons.map((person) => (
        <Person key={person.name} person={person} deletePerson={deletePerson} />
      ))}
    </>
  );
};

const Person = ({ person, deletePerson }) => (
  <p>
    {person.name} {person.number}
    <button onClick={() => deletePerson(person.id)}>delete</button>
  </p>
);

export default Persons;
