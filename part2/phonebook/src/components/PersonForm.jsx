import React from "react";
import { useState } from "react";

function PersonForm({ persons, setPersons }) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const addPerson = (e) => {
    e.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
      important: Math.random() < 0.5,
      id: newName,
    };
    if (
      persons.find((x) => x.name.toLowerCase() == personObj.name.toLowerCase())
    ) {
      alert(`${personObj.name} is already added to phonebook`);
      setNewName("");
    } else if (persons.find((x) => x.number == personObj.number)) {
      alert(`${personObj.number} is already added to phonebook`);
      setNewNumber("");
    } else {
      setPersons(persons.concat(personObj));
      setNewName("");
      setNewNumber("");
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
