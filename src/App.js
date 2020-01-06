import React, {useState} from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Navbar from './component/navbar';
import Footer from './component/footer';
import Login from './component/login';
import Home from './component/home';
import Dashboard from './component/dashboard';
import Register from './component/register';
import withAuthChecker from './custom-hooks/withAuthChecker'


function App() {
  const [loginFormValues, setLoginFormValues] = useState({
    email: "",
    password: ""
  });

  return (
    <div className="App">
      <Route path="/" render={props => <Navbar {...props} />} />
      <Route exact path="/" component={Home} />
      <Route exact path='/login' render={props => (<Login {...props} loginFormValues={loginFormValues} setLoginFormValues={setLoginFormValues} />)}/>
      <Route exact path="/dashboard" render={props => withAuthChecker (Dashboard)} />
      <Route exact path="/register" render={props => <Register {...props} />} />
      <Footer />
    </div>
  );
}

export default App;
