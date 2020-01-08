import React from "react";
<<<<<<< HEAD
import axiosWithAuth from "../custom-hooks/axiosWithAuth";
=======
import { Link } from 'react-router-dom'
>>>>>>> 09fb0f28a9614e6b2b709a1e92a871f049bca75d

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
      <Link to={`/bills/${props.curr.id}`}><button>Bill Details</button></Link>
      <button>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <div>
        <h4>Splits:</h4>
<<<<<<< HEAD
        {!splits.length ? (
          <div>No people assigned</div>
        ) : (
          splits.map((curr, index) => {
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
          })
        )}
=======
        {splits.map((curr, index) => {
          const shareUser = props.allUsers.filter(
            user => user.id === curr.userId
          );
          return (
            <div key={index} className='split-user'>
              <h4>
                Name: {shareUser[0].firstName} {shareUser[0].lastName}
              </h4>
              <h4>Left to pay: {curr.amount}</h4>
              <h4>Amount paid: {curr.amountPaid}</h4>
              <h4>Status: {curr.status}</h4>
            </div>
          );
        })}
>>>>>>> 09fb0f28a9614e6b2b709a1e92a871f049bca75d
      </div>
    </div>
  );
}

export default BillCard;
