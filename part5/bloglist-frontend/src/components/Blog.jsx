import * as React from "react";
const Blog = (props) => (
  <div>
    <p>
      {props.title} {props.author}
    </p>
  </div>
);

export default Blog;
