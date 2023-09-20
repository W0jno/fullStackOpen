import React from "react";

function Total(props) {
  let sum = 0;
  props.parts.forEach((x) => (sum += x.exercises));
  return <>Number of exercises {sum}</>;
}

export default Total;
