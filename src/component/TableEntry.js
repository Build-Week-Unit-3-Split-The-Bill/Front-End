import React from "react";
import axiosWithAuth from "../custom-hooks/axiosWithAuth";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

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

  return (
    <TableRow key={props.index}>
      <TableCell component="th" scope="row">
        {props.getSplitDetails[0].firstName}
      </TableCell>
      <TableCell align="right">{props.getSplitDetails[0].lastName}</TableCell>
      <TableCell align="right">{props.curr.amount}</TableCell>
      <TableCell align="right">{props.curr.amountPaid}</TableCell>
      <TableCell align="right">{props.curr.status}</TableCell>
      <TableCell align="right">
        <button onClick={handleApprove}>Approve</button>
      </TableCell>
    </TableRow>
  );
}
