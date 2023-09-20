import React from "react";

function Part(props) {
  return (
    <>
      {props.parts.map((x) => (
        <p>
          {x.name} {x.exercises}
        </p>
      ))}
    </>
  );
}

export default Part;
