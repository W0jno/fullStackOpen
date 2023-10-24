import { React, useState } from "react";

function blogForm(props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const addBlog = (event) => {
    event.preventDefault();
    props.handleBlog({
      title,
      author,
      url,
      likes: 0,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={props.title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={props.author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={props.url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        {}
        <button type="submit">create</button>
      </form>{" "}
    </div>
  );
}

export default blogForm;
