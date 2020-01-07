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
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("https://split-the-bill-api.herokuapp.com/api/auth/register", {
        firstName: registerForm.first_name,
        lastName: registerForm.last_name,
        email: registerForm.email,
        password: registerForm.password
      })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        props.history.push("/dashboard");
      })
      .catch(error => {
        if (error.message == "Request failed with status code 409") {
          alert(`This email has already been registered.`);
        } else if (error.message == "Request failed with status code 422") {
          alert("Your password must be at least 6 characters.");
        } else {
          console.log(error.message);
        }
      });
  };

  return (
    <div className="register">
      <h2>Register Now</h2>
      <form onSubmit={handleSubmit} className="forms">
        <input
          type="text"
          placeholder="First name"
          name="first_name"
          onChange={formChange}
          value={registerForm.first_name}
        />

        <input
          type="text"
          placeholder="Last name"
          name="last_name"
          onChange={formChange}
          value={registerForm.last_name}
        />

        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={formChange}
          value={registerForm.email}
        />

        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={formChange}
          value={registerForm.password}
        />

        <input type="submit" />
      </form>
    </div>
  );
}

export default Register;
