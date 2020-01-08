import React from "react";
import EditBill from "./editBill";

function Bill(props) {
  const id = props.match.params.id;

  const thisBill = props.user.bills.filter(curr => {
    return curr.id === id;
  });

  console.log(`Bill component`, props);

  return (
    <div className="bill">
      <h1>{thisBill[0].title}</h1>
      <p>HIIIII</p>
      <EditBill {...props} user={props.user} thisBill={thisBill} />
    </div>
  );
}

export default Bill;
