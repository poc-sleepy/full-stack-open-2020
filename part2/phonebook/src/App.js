import React, { useState } from 'react';

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

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </>
  );
};

const Person = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');
  const [usesFilter, setUsesFilter] = useState(false);

  const personsToShow = usesFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(query.toLowerCase())
      )
    : persons;

  const handleFromSubmit = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
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

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter query={query} onChange={handleQueryChange} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleFromSubmit}
        newName={newName}
        newNameOnChange={handleNameChange}
        newNumber={newNumber}
        newNumberOnChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
