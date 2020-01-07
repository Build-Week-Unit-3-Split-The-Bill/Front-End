import React from "react";
import axiosWithAuth from "../custom-hooks/axiosWithAuth";

function NewBill(props) {
  const handleChange = e => {
    props.setNewBillValues({
      ...props.newBillValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("https://split-the-bill-api.herokuapp.com/api/bills", {
        amount: props.newBillValues.amount,
        title: props.newBillValues.title
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="bill-card">
      <h3>Create a New bill</h3>
      <form className="forms" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Bill name..."
          value={props.newBillValues.title}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Total Bill amount"
          value={props.newBillValues.amount}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default NewBill;
