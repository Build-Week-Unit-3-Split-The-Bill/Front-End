import React from "react";
import axiosWithAuth from "../custom-hooks/axiosWithAuth";
import { Link } from "react-router-dom";

function BillCard(props) {
  const splits = props.curr.splits;

  const handleDelete = e => {
    axiosWithAuth()
      .delete(
        `https://split-the-bill-api.herokuapp.com/api/bills/${props.curr.id}/delete`
      )
      .then(response => {
        console.log(response);
        let filteredArr = props.user.bills.filter(bill => {
          return bill.id != props.curr.id;
        });
        props.setUser({ ...props.user, bills: filteredArr });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <div className="bill-card" key={props.curr.id}>
      <h3>{props.curr.title}</h3>
      <h4>${props.curr.amount}</h4>
      <h4>Status: {props.curr.status}</h4>
      <h4>Splits: {props.curr.splits.length}</h4>
      <Link to={`/bills/${props.curr.id}`}>
        <button className="bill-card-button">Bill Details</button>
      </Link>
      <button onClick={handleDelete} className="bill-card-button">
        Delete
      </button>
      <div></div>
    </div>
  );
}

export default BillCard;
