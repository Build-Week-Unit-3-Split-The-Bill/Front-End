import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login(props) {
  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("https://split-the-bill-api.herokuapp.com/api/auth/login", {
        email: props.loginFormValues.email,
        password: props.loginFormValues.password
      })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        props.history.push("/dashboard");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleChange = event => {
    props.setLoginFormValues({
      ...props.loginFormValues,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      <form className="forms" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="email"
          type="text"
          value={props.loginFormValues.email}
          placeholder="Email"
        />
        <input
          onChange={handleChange}
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
