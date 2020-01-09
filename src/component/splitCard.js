import React, { useState } from "react";
import axiosWithAuth from "../custom-hooks/axiosWithAuth";

function SplitCard(props) {
  const [toggle, setToggle] = useState(false);
  const [payment, setPayment] = useState("");

  const handleClick = e => {
    setToggle(!toggle);
  };

  const handleChange = e => {
    e.preventDefault();
    setPayment(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .patch(
        `https://split-the-bill-api.herokuapp.com/api/splits/${props.curr.id}/settleUp?au&=`,
        { amount: payment }
      )
      .then(response => {
        console.log(response);
        props.axiosOnLogin();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="bill-card">
      <h3>{props.curr.title}</h3>
      <h4>${props.curr.amount}</h4>
      <h4>Status: {props.curr.status}</h4>
      <button onClick={handleClick}>Pay now</button>
      {toggle === false ? (
        <div></div>
      ) : (
        <div>
          <input type="number" name="amount" onChange={handleChange} />
          <button onClick={handleSubmit}>Confirm Payment</button>
        </div>
      )}
    </div>
  );
}

export default SplitCard;
