import React, { useState } from "react";

function Register(props) {
  const formChange = e => {
    if (/^[A-Za-z]+$/.test(e.target.value) || e.target.value === "") {
      console.log(e.target.value);
      props.registerForm({
        ...props.registerForm,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    e.persist();
    console.log(e);
    console.log(e.target.first_name.value);
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
            value={props.registerForm.first_name}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            placeholder="Last name"
            name="last_name"
            onChange={formChange}
            value={props.registerForm.last_name}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={formChange}
            value={props.registerForm.email}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={formChange}
            value={props.registerForm.password}
          />
        </label>
        <label>
          Confirm Password:
          <input type="password" placeholder="re-type password" />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}

export default Register;
