import React from "react";
import Part from "./Part";

function Content(props) {
  return (
    <>
      <Part parts={props.parts} />
    </>
  );
}

export default Content;
