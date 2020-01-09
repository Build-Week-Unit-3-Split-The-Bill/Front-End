import React from "react";
import axiosWithAuth from "../custom-hooks/axiosWithAuth";

export default function TableEntry(props) {
  const handleApprove = e => {
    e.preventDefault();
    axiosWithAuth()
      .patch(
        `https://split-the-bill-api.herokuapp.com/api/splits/${props.curr.id}/approve`
      )
      .then(response => {
        alert(`You have approved this payment`);
        props.axiosOnLogin();
      })
      .catch(error => {
        console.log(error);
      });
  };

  console.log(props);

  return (
    <tr key={props.index}>
      <th>
        {props.getSplitDetails[0].firstName} {props.getSplitDetails[0].lastName}
      </th>
      <th>{props.curr.amount}</th>
      <th>{props.curr.amountPaid}</th>
      <th>{props.curr.status}</th>
      <th>
        <button onClick={handleApprove}>Approve</button>
      </th>
    </tr>
  );
}
