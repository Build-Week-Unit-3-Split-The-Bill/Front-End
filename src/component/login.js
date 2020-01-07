import React from "react";
import { Link } from "react-router-dom";

function Login(props) {
  return (
    <div>
      <form className="forms" onSubmit={props.handleSubmit}>
        <input
          onChange={props.handleChange}
          name="email"
          type="text"
          value={props.loginFormValues.email}
          placeholder="Email"
        />
        <input
          onChange={props.handleChange}
          name="password"
          type="password"
          value={props.loginFormValues.password}
          placeholder="Password"
        />
        <input type="submit" id="submit" />
        <Link to="/register">
          <button>Register</button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
