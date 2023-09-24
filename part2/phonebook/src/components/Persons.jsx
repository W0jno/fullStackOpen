import React from "react";

function Persons({ persons, findName, removePerson }) {
  return (
    <div>
      {persons
        .filter((person) => {
          if (
            person &&
            person.name &&
            person.name.toLowerCase().includes(findName)
          ) {
            return person;
          }
          return false;
        })
        .map((person, key) => {
          return (
            <div key={key}>
              {person.name} {person.number}
              <button onClick={() => removePerson(person.id)}>delete</button>
            </div>
          );
        })}
    </div>
  );
}

export default Persons;
