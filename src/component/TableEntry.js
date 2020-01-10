import React from "react";
import axiosWithAuth from "../custom-hooks/axiosWithAuth";

export default function TableEntry(props) {
  const handleApprove = e => {
    e.preventDefault();
    axiosWithAuth("patch", `/splits/${props.curr.id}/approve`)
      .then(response => {
        alert(`You have approved this payment`);
        props.axiosOnLogin();
      })
      .catch(error => {
        props.SetError(error);
      });
  };

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
