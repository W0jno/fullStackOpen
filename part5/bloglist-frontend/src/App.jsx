import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import BlogForm from "./components/blogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setError("Wrong credentials");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      getAllBlogs();
    }
  }, []);

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const handleBlog = async (event) => {
    event.preventDefault();

    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      });
      setBlogs([...blogs, blog]);
      setMessage(`a new blog ${blog.title} by ${blog.author} has been added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setError("Something went wrong, please try again");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  return (
    <div>
      <Notification message={message} error={error} />
      {user === null && (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
      {user !== null && (
        <BlogForm
          user={user.name}
          blogs={blogs}
          handleBlog={handleBlog}
          title={title}
          url={url}
          author={author}
          setTitle={setTitle}
          setUrl={setUrl}
          setAuthor={setAuthor}
        />
      )}
      {blogs.map((blog) => (
        <Blog key={blog.id} title={blog.title} author={blog.author} />
      ))}
    </div>
  );
};

export default App;
