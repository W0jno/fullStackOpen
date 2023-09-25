import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [findName, setFindName] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const updatePerson = (newName, newNumber) => {
    const person = persons.find((x) => x.name.trim() === newName.trim());
    //console.log(person);
    const changedPerson = { ...person, number: newNumber };
    personsService
      .update(changedPerson.id, changedPerson)
      .then((res) => {
        setPersons(
          persons.map((n) => {
            if (n.id !== person.id) {
              return n;
            } else {
              return res;
            }
          })
        );
      })
      .catch((err) => {
        setError(
          `Information of ${changedPerson.name} has already been deleted`
        );
        setTimeout(() => {
          setError(null);
        }, 5000);
        setPersons(persons.filter((n) => n.id !== person.id));
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
      <Notification message={message} error={error} />
      <Filter setFindName={setFindName} />

      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        updatePerson={updatePerson}
        setMessage={setMessage}
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
