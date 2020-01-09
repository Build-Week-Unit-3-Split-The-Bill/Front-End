import React from "react";


function SplitCard(props) {

  return (
    <div className="bill-card">
      <h3>{props.curr.title}</h3>
      <h4>${props.curr.amount}</h4>
      <h4>Status: {props.curr.status}</h4>
      <button>Pay now</button>
    </div>
  );
}

export default SplitCard;
