import React from "react";

function BillCard(props) {
  const splits = props.curr.splits;

  return (
    <div className="bill-card" key={props.curr.id}>
      <h3>{props.curr.title}</h3>
      <h4>${props.curr.amount}</h4>
      <h4>Status: {props.curr.status}</h4>
      <button>Edit</button>
      <button>Delete</button>
      <div>
        <h4>Splits:</h4>
        {splits.map((curr, index) => {
          const shareUser = props.allUsers.filter(
            user => user.id === curr.userId
          );
          return (
            <div key={index}>
              <h4>
                Name: {shareUser[0].firstName} {shareUser[0].lastName}
              </h4>
              <h4>Left to pay: {curr.amount}</h4>
              <h4>Amount paid: {curr.amountPaid}</h4>
              <h4>Status: {curr.status}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BillCard;
