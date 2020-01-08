import React from "react";
import axiosWithAuth from "../custom-hooks/axiosWithAuth";

function NewBill(props) {
  console.log(`newbills`, props);
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
        props.setUser({
          ...props.user,
          bills: [...props.user.bills, { ...response.data.bill, splits: [] }]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleClick = e => {
    console.log(`event happened`);
    return (
      <div>
        <input type="email" name="email" placeholder="email" />
        <input type="number" name="share" />
      </div>
    );
  };

  const email = "emma@gmail.com";

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
        <p>Splits:</p>
        <button onClick={handleClick}>+</button>

        <input type="submit" className="new-bill-submit" />
        <a
          href={`mailto:${email}?subject=Sign%20Up%20for%20Split%20the%20Bill!&amp;body=This%20is%20the%20body!`}
        >
          Link text
        </a>
      </form>
    </div>
  );
}

export default NewBill;
