import React from "react";

function BillCard(props) {
  const splits = props.curr.splits;
  console.log(props);

  return (
    <div className="bill-card">
      <h3>{props.curr.title}</h3>
      <h4>${props.curr.amount}</h4>
      <h4>Status: {props.curr.status}</h4>
      <button className='see-more-bill'>Bill Details</button>
      {/* <div>
        <h4>Date: {props.curr.createdAt}</h4>
        <h4>Splits:</h4>
        {splits.map((curr, index) => {
          return (
            <div key="index">
              <h4>Name: {curr.userId}</h4>
              <h4>Share amount: {curr.amount}</h4>
              <h4>Amount paid: {curr.amountPaid}</h4>
              <h4>Status: {curr.status}</h4>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default BillCard;
