import React from "react";
import { Link } from "react-router-dom";

function Login(props) {
  return (
    <div className='login'>
      <h1>Login</h1>
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
        <Link className='link-no-css' to="/register">
          <p className='register-button'>Sign Up</p>
        </Link>
      </form>
    </div>
  );
}

export default Login;
