import * as React from "react";
import Togglable from "./Togglable";
const Blog = (props) => {
  const increaseLikes = () => {
    const updatedBlog = { ...props.blog, likes: props.blog.likes + 1 };

    props.updateBlog(updatedBlog);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {props.blog.title}
      <Togglable buttonLabel="view">
        <div style={{ border: "1px solid #000000" }}>
          <p>author: {props.blog.author}</p>
          <p>
            likes: {props.blog.likes}{" "}
            <button onClick={increaseLikes}>Like</button>
          </p>
          <p>url: {props.blog.url}</p>
          <p>created by: {props.blog.user.name}</p>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
