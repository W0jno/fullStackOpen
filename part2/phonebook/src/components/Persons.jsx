import React from "react";

function Persons({ persons, findName }) {
  return (
    <div>
      {persons
        .filter((e) => {
          if (e.name.toLowerCase().includes(findName)) {
            return e;
          }
        })
        .map((x, key) => {
          return (
            <p key={key}>
              {x.name} {x.number}
            </p>
          );
        })}
    </div>
  );
}

export default Persons;
