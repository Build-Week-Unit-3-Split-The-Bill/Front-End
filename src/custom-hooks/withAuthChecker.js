import React from "react";
import { Redirect } from "react-router-dom";

export default function withAuthChecked(Component, props) {
  if (localStorage.getItem("token")) {
    return <Component {...props} />;
  } else {
    alert(`You need to login to access "My Dashboard"`);
    return <Redirect to="/" />;
  }
}
