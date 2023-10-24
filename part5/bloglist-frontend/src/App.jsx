import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import BlogForm from "./components/blogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [blogFormVisible, setBlogFormVisible] = useState(false);

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
  const getAllBlogs = async () => {
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

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setBlogs([]);
    setUser(null);
  };

  const handleBlog = async (event) => {
    try {
      const blog = await blogService.create(event);
      setBlogs([...blogs, blog]);
      getAllBlogs();
      setMessage(`a new blog ${blog.title} by ${blog.author} has been added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setError("Something went wrong, please try again");
      console.log(exception);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const updateBlog = async (BlogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(BlogToUpdate);
      setMessage(
        `a blog ${BlogToUpdate.title} by ${BlogToUpdate.author} has been updated`
      );
      setError(null);
      setBlogs(
        blogs.map((blog) => (blog.id !== BlogToUpdate.id ? blog : updatedBlog))
      );

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setError(`Cannot update blog ${BlogToUpdate.title}`);
      setMessage(null);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  return (
    <div>
      {user !== null && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>{user.name} logged</h2>
          <button onClick={handleLogout} style={{ height: "50%" }}>
            log out
          </button>
        </div>
      )}
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
        <Togglable buttonLabel="create new blog">
          <BlogForm
            blogs={blogs}
            handleBlog={handleBlog}
            handleLogout={handleLogout}
          />
        </Togglable>
      )}
      {blogs.map((blog, key) => (
        <Blog key={key} blog={blog} updateBlog={updateBlog}></Blog>
      ))}
    </div>
  );
};

export default App;
