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
import Bill from "./component/bill";
import EditBill from "./component/editBill";
import Table from './component/Table';

function App(props) {
  const [loginFormValues, setLoginFormValues] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [user, setUser] = useLocalStorage("user", null);

  const [allUsers, setAllUsers] = useLocalStorage("all-user", null);

  const [newBillValues, setNewBillValues] = useState({
    amount: "",
    title: ""
  });

  const getAllUsers = e => {
    axiosWithAuth()
      .get("https://split-the-bill-api.herokuapp.com/api/users")
      .then(response => {
        setAllUsers(response.data.users);
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
        console.log(user);
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
        alert(`Invalid login details. Please enter a valid login or register`);
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
        setUser={setUser}
        setError={setError}
        allUsers={allUsers}
        {...props}
        newBillValues={newBillValues}
        setNewBillValues={setNewBillValues}
        axiosOnLogin={axiosOnLogin}
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
      <Route
        exact
        path="/bills/:id"
        render={props => <Bill {...props} user={user} allUsers={allUsers} />}
      />
      <Route
        path="/bills/:id/edit"
        render={props => (
          <EditBill
            {...props}
            user={user}
            newBillValues={newBillValues}
            setNewBillValues={setNewBillValues}
            allUsers={allUsers}
            setUser={setUser}
            setError={setError}
            axiosOnLogin={axiosOnLogin}
          />
        )}
      />
      <Footer />
    </div>
  );
}

export default withRouter(App);
