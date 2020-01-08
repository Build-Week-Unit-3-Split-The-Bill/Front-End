import React, { useState } from "react";
import axiosWithAuth from "../custom-hooks/axiosWithAuth";

export default function EditBill(props) {
  console.log(props);

  const billDetails = props.user.bills.filter(
    bill => bill.id === props.match.params.id
  );

  console.log(billDetails);

  const handleSubmit = e => {};

  //   const handleChange = e => {
  //     props.setNewBillValues({
  //       ...props.newBillValues,
  //       [e.target.name]: e.target.value
  //     });
  //   };

  return (
    <div>
      <p>Working</p>
      <form className="edit-bill" onSubmit={handleSubmit}>
        <p>Bill Overview</p>
        <span>Bill Name:</span>
        <input type="text" name="title" value={billDetails[0].title} />
        <span>Total Bill in USD:</span>
        <input type="number" name="amount" value={billDetails.amount} />
        <p>Splits:</p>
        <table>
          <tr>
            <th>Name</th>
            <th>Left to Pay</th>
            <th>Paid</th>
          </tr>
          {!billDetails.splits ? (
            <tr>
              <th>No splits asigned yet</th>
            </tr>
          ) : (
            billDetails.splits.map((curr, index) => {
              return (
                <div>
                  <span>Look at this person</span>
                </div>
              );
            })
          )}
        </table>
        <span>email</span>
        <input type="email" name="email" />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
