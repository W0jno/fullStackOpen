import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "420-692-123" },
    { name: "Filip Wojno", number: "666-666-666" },
  ]);

  const [findName, setFindName] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFindName={setFindName} />

      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} findName={findName} />
    </div>
  );
};

export default App;
