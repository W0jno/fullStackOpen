import * as React from "react";

function LoginForm(props) {
  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input
            type="text"
            value={props.username}
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={props.password}
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default LoginForm;
