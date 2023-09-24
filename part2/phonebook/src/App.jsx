import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [findName, setFindName] = useState("");

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const updatePerson = (newName, newNumber) => {
    const person = persons.find((x) => x.name === newName);

    const changedPerson = { ...person, number: newNumber };
    personsService.update(changedPerson.id, changedPerson).then((res) => {
      setPersons(
        persons.map((n) => {
          if (n.id !== person.id) {
            return n;
          } else {
            return res;
          }
        })
      );
    });
  };

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFindName={setFindName} />

      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        updatePerson={updatePerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        findName={findName}
        removePerson={removePerson}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
