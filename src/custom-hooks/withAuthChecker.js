import React from "react";
import { Redirect } from "react-router-dom";

export default function withAuthChecked(component) {
  if (localStorage.getItem("token")) {
    return component;
  } else {
    alert(`You need to login to access "My Dashboard"`);
    return <Redirect to="/" />;
  }
}
