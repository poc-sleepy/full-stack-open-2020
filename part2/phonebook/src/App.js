import React, { useState, useEffect } from 'react';
import personService from './services/persons';

const Filter = ({ query, onChange }) => {
  return (
    <>
      filter shown with <input value={query} onChange={onChange} />
    </>
  );
};

const PersonForm = ({
  onSubmit,
  newName,
  newNameOnChange,
  newNumber,
  newNumberOnChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={newNameOnChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={newNumberOnChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

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

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');
  const [usesFilter, setUsesFilter] = useState(false);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const personsToShow = usesFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(query.toLowerCase())
      )
    : persons;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value.trim());
    setUsesFilter(Boolean(event.target.value.trim()));
  };

  const deletePerson = (id) => {
    personService.destroy(id).then(() => {
      const newPersons = persons.filter((person) => person.id !== id);
      setPersons(newPersons);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter query={query} onChange={handleQueryChange} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleFormSubmit}
        newName={newName}
        newNameOnChange={handleNameChange}
        newNumber={newNumber}
        newNumberOnChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
