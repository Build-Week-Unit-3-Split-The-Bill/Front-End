import React, {useState} from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Navbar from './component/navbar';
import Footer from './component/footer';
import Login from './component/login';
import Home from './component/home';
import Dashboard from './component/dashboard';
import Register from './component/register';

function App() {

  const [loginFormValues, setLoginFormValues] = useState({
    email: '',
    password: ''
  })

  return (
    <div className="App">
      <Navbar />
      <Route exact path='/'component={Home} />
      <Route exact path='/login' render={props => (<Login {...props} loginFormValues={loginFormValues} setLoginFormValues={setLoginFormValues} />)}/>/>
      <Route exact path='/dashboard'component={Dashboard} />
      <Route exact path='/register'component={Register} />
      <Footer />
    </div>
  );
}

export default App;
