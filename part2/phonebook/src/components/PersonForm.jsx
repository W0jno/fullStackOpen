import React from "react";
import { useState } from "react";
import axios from "axios";
import personsService from "../services/persons.js";

function PersonForm({ persons, setPersons, updatePerson, setMessage }) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    const personObj = {
      name: newName.trim(),
      number: newNumber.trim(),
    };
    if (newName !== "" || newNumber !== "") {
      if (
        persons.find(
          (x) => x.name.toLowerCase() == personObj.name.toLowerCase()
        )
      ) {
        if (
          window.confirm(
            `${personObj.name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          updatePerson(newName, newNumber);
        }
      } else {
        personsService.create(personObj).then(() => {
          setMessage(`Added ${personObj.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setPersons(persons.concat(personObj));
          setNewName("");
          setNewNumber("");
        });
      }
    }
  };

  const inputNameHandler = (e) => {
    setNewName(e.target.value);
  };

  const inputNumberHandler = (e) => {
    setNewNumber(e.target.value);
  };
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={inputNameHandler} />
      </div>
      <div>
        number: <input value={newNumber} onChange={inputNumberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;
