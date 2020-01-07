import React, { useState, useEffect } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Navbar from "./component/navbar";
import Footer from "./component/footer";
import Login from "./component/login";
import Home from "./component/home";
import Dashboard from "./component/dashboard";
import Register from "./component/register";
import withAuthChecker from "./custom-hooks/withAuthChecker";
import axiosWithAuth from "./custom-hooks/axiosWithAuth";

function App(props) {
  const [loginFormValues, setLoginFormValues] = useState({
    email: "",
    password: ""
  });
  const [user, setUser] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosWithAuth()
      .get("https://split-the-bill-api.herokuapp.com/api/users/profile")
      .then(response => {
        setUser(response.data.user);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  const allowAccess = e => {
    return <Dashboard user={user} {...props} />;
  };

  return (
    <div className="App">
      <Route path="/" render={props => <Navbar {...props} />} />
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/login"
        render={props => (
          <Login
            {...props}
            loginFormValues={loginFormValues}
            setLoginFormValues={setLoginFormValues}
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

export default App;
