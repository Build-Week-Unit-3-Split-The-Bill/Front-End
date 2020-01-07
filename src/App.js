import React, { useState } from "react";
import "./App.css";
import { Route, withRouter } from "react-router-dom";
import Navbar from "./component/navbar";
import Footer from "./component/footer";
import Login from "./component/login";
import Home from "./component/home";
import Dashboard from "./component/dashboard";
import Register from "./component/register";
import withAuthChecker from "./custom-hooks/withAuthChecker";
import axiosWithAuth from "./custom-hooks/axiosWithAuth";
import axios from "axios";

function App(props) {
  const [loginFormValues, setLoginFormValues] = useState({
    email: "",
    password: ""
  });
  const [user, setUser] = useState();
  const [error, setError] = useState(null);

  const axiosOnLogin = e => {
    axiosWithAuth()
      .get("https://split-the-bill-api.herokuapp.com/api/users/profile")
      .then(response => {
        setUser(response.data.user);
      })
      .catch(err => {
        setError(err.message);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("https://split-the-bill-api.herokuapp.com/api/auth/login", {
        email: loginFormValues.email,
        password: loginFormValues.password
      })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        props.history.push("/dashboard");
        axiosOnLogin();
      })
      .catch(error => {
        setError(error);
      });
  };

  const handleChange = event => {
    setLoginFormValues({
      ...loginFormValues,
      [event.target.name]: event.target.value
    });
  };

  const allowAccess = e => {
    return <Dashboard user={user} {...props} />;
  };

  return (
    <div className="App">
      <Route
        path="/"
        render={props => <Navbar {...props} setUser={setUser} />}
      />
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/login"
        render={props => (
          <Login
            {...props}
            loginFormValues={loginFormValues}
            setLoginFormValues={setLoginFormValues}
            user={user}
            setUser={setUser}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      />
      <Route
        exact
        path="/dashboard"
        render={props => withAuthChecker(allowAccess())}
      />
      <Route exact path="/register" render={props => <Register {...props} />} />
      <Footer />
    </div>
  );
}

export default withRouter(App);
