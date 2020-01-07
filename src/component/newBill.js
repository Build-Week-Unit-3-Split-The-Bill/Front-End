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
    <div className="new-bill">
      <h3>Create a New bill</h3>
      <form className="forms" onSubmit={handleSubmit}>
        <p>Bill Name:</p>
        <input
          type="text"
          name="title"
          value={props.newBillValues.title}
          onChange={handleChange}
        />
        <p>Total Bill in USD:</p>
        <input
          type="number"
          name="amount"
          value={props.newBillValues.amount}
          onChange={handleChange}
        />
        <input type="submit" className='new-bill-submit' />
      </form>
    </div>
  );
}

export default NewBill;
