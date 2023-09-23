import React from "react";

function Filter({ setFindName }) {
  return (
    <form>
      <div>
        filter shown with{" "}
        <input onChange={(e) => setFindName(e.target.value)} />
      </div>
    </form>
  );
}

export default Filter;
