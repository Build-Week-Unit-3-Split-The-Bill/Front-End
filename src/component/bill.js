import React from "react";
import { Link } from "react-router-dom";

function Bill(props) {
  const id = props.match.params.id;

  const thisBill = props.user.bills.filter(curr => {
    return curr.id === id;
  });

  const newCreated = Date(thisBill[0].createdAt);
  const stringCreated = newCreated.toString();
  const newUpdated = Date(thisBill[0].createdAt);
  const stringUpdated = newUpdated.toString();

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
        <br /> {thisBill[0].amount / thisBill[0].splits.length}
      </p>
      <p>
        <span className="underline">Status:</span> <br />
        <br />
        {thisBill[0].status}
      </p>
      <div>
        <h4>Splits:</h4>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Left to Pay</th>
              <th>Paid</th>
              <th>Status</th>
            </tr>
            {!thisBill[0].splits.length ? (
              <div>No people assigned</div>
            ) : (
              thisBill[0].splits.map((curr, index) => {
                const getSplitDetails = props.allUsers.filter(
                  user => user.id === curr.userId
                );
                return (
                  <tr key={index}>
                    <th>
                      {getSplitDetails[0].firstName}{" "}
                      {getSplitDetails[0].lastName}
                    </th>
                    <th>{curr.amount}</th>
                    <th>{curr.amountPaid}</th>
                    <th>{curr.status}</th>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <p>
        <span className="underline">Created:</span> <br />
        <br /> {stringCreated.slice(0, -34)}
      </p>
      <p>
        <span className="underline">Updated:</span> <br />
        <br /> {stringUpdated.slice(0, -34)}
      </p>
      <Link to={`/bills/${thisBill[0].id}/edit`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}

export default Bill;
