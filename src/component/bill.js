import React from "react";
import { Link } from "react-router-dom";

function Bill(props) {
  const id = props.match.params.id;

  const thisBill = props.user.bills.filter(curr => {
    return curr.id === id;
  });

  console.log(`Bill component`, props);

  return (
    <div className="bill">
      <h1>{thisBill[0].title}</h1>
      <p>
        <span className="underline">Total:</span> <br />
        <br /> {thisBill[0].amount}
      </p>
      <p>
        <span className="underline">Per person:</span>
        <br />
        <br /> {thisBill[0].amount / 1 + thisBill[0].splits.length}
      </p>
      <p>
        <span className="underline">Status:</span> <br />
        <br />
        {thisBill[0].status}
      </p>
      <p>
        <span className="underline">Created:</span> <br />
        <br /> {thisBill[0].createdAt}
      </p>
      <p>
        <span className="underline">Updated:</span> <br />
        <br /> {thisBill[0].updatedAt}
      </p>
      <Link to={`/bills/${thisBill[0].id}/edit`}>
        <button className='bill-card-button-new'>Edit</button>
      </Link>
      <div className='spacer'></div>
    </div>
  );
}

export default Bill;
