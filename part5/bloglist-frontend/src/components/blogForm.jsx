import React from "react";

function blogForm(props) {
  return (
    <div>
      <h2>{props.user} has logged</h2>
      <form>
        <div>
          title:
          <input type="text" />
        </div>
        <div>
          author:
          <input type="text" />
        </div>
        <div>
          url:
          <input type="text" />
        </div>
        {}
        <button type="submit">create</button>
      </form>{" "}
    </div>
  );
}

export default blogForm;
