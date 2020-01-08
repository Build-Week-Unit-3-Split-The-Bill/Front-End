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
import useLocalStorage from "./custom-hooks/useLocalStorage";

function App(props) {
  const [loginFormValues, setLoginFormValues] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [user, setUser] = useLocalStorage("user", null);

  const [allUsers, setAllUsers] = useLocalStorage("all-user", null);

  const getAllUsers = e => {
    axiosWithAuth()
      .get("https://split-the-bill-api.herokuapp.com/api/users")
      .then(response => {
        setAllUsers(response.data.users);
        console.log(allUsers);
      })
      .catch(error => {
        props.setError(error.message);
      });
  };

  const axiosOnLogin = e => {
    axiosWithAuth()
      .get("https://split-the-bill-api.herokuapp.com/api/users/profile")
      .then(response => {
        setUser(response.data.user);
        window.location.reload();
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
        getAllUsers();
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
    return (
      <Dashboard
        user={user}
        setError={setError}
        allUsers={allUsers}
        {...props}
      />
    );
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
