import React, { useState } from "react";
import axios from "axios";

function Register(props) {
  const [registerForm, setRegisterForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });

  const formChange = e => {
    console.log(e.target.value);
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (e.target.password.value === e.target.confirm_password.value) {
      axios
        .post("https://build-split-the-bill.herokuapp.com/api/users/register", {
          email: registerForm.email,
          password: registerForm.password,
          firstname: registerForm.first_name,
          lastname: registerForm.last_name
        })
        .then(response => {
          console.log(response.data);
          console.log(props);
          props.history.push("/login");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h2>Register Now</h2>
      <form onSubmit={handleSubmit} className='forms'>
        <label>
          First Name:
          <input
            type="text"
            placeholder="First name"
            name="first_name"
            onChange={formChange}
            value={registerForm.first_name}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            placeholder="Last name"
            name="last_name"
            onChange={formChange}
            value={registerForm.last_name}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={formChange}
            value={registerForm.email}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={formChange}
            value={registerForm.password}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            placeholder="re-type password"
            name="confirm_password"
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}

export default Register;
