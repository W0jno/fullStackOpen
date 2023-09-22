import React from "react";

function Total(props) {
  const sum = props.parts.reduce((total, part) => total + part.exercises, 0);
  return <b>Total of {sum} exercises</b>;
}

export default Total;
