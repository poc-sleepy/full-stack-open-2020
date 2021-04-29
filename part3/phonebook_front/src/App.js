import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { InfoNotification, ErrorNotification } from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');
  const [usesFilter, setUsesFilter] = useState(false);
  const [infoMessage, setInfoMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
      });
  }, []);

  const personsToShow = usesFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(query.toLowerCase())
      )
    : persons;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const personToUpdate = persons.find((person) => person.name === newName);
    if (personToUpdate) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personObject = {
          ...personToUpdate,
          number: newNumber,
        };
        personService
          .update(personObject.id, personObject)
          .then((returnedPerson) => {
            const newerPersons = persons.map((person) =>
              person.id === returnedPerson.id ? returnedPerson : person
            );
            setPersons(newerPersons);
            setNewName('');
            setNewNumber('');
            setTimeout(() => {
              setInfoMessage(null);
            }, 5000);
            setInfoMessage(`Updated ${returnedPerson.name}`);
            setErrorMessage(null);
          })
          .catch((error) => {
            if (error.response.staus === 404) {
              setErrorMessage(
                `Information of ${newName} has already been removed from server`
              );
              setPersons(persons.filter((person) => person.name !== newName));
            } else {
              setErrorMessage(error.response.data.error);
            }
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setTimeout(() => {
            setInfoMessage(null);
          }, 5000);
          setInfoMessage(`Added ${returnedPerson.name}`);
          setErrorMessage(null);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
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

  const deletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .destroy(personToDelete.id)
        .then(() => {
          const newPersons = persons.filter(
            (person) => person.id !== personToDelete.id
          );
          setPersons(newPersons);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} />
      <InfoNotification message={infoMessage} />
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
