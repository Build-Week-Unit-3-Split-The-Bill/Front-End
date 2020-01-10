import React, { useState, useEffect } from "react";
import axiosWithAuth from "../custom-hooks/axiosWithAuth";
import TableEntry from "./TableEntry";

export default function EditBill(props) {
  const getThisBill = e =>
    props.user.bills.filter(bill => bill.id === props.match.params.id);
  const thisBill = getThisBill();
  const allEmails = props.allUsers.map(user => user.email);

  useEffect(() => {
    getThisBill();
  });

  const [newEmail, setNewEmail] = useState("");
  const [addedPeopleDetails, setAddedPeopleDetails] = useState([]);
  const [displayAddedEmails, setDisplayAddedEmails] = useState([]);

  const handleChange = e => {
    setNewEmail(e.target.value);
  };

  const handleAdd = e => {
    const user = props.allUsers.filter(user => user.email === newEmail);
    if (!allEmails.includes(newEmail)) {
      alert(`This person doesn't current have an account. Send them an invite`);
    } else {
      setAddedPeopleDetails([...addedPeopleDetails, user]);
      setNewEmail("");
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const userIds = addedPeopleDetails.map(user => user[0].id);
    axiosWithAuth()
      .post(
        `https://split-the-bill-api.herokuapp.com/api/bills/${thisBill[0].id}/split`,
        { splitters: userIds }
      )
      .then(response => {
        let splitsArray = response.data.splits;
        splitsArray = splitsArray.map(user => user.id);
        setDisplayAddedEmails(splitsArray);
        props.axiosOnLogin();
      })
      .catch(error => {
        props.setError(error);
      });
  };
  let getSplitDetails;

  return (
    <div className="edit-bill">
      <p>Bill Overview</p>
      {!thisBill ? (
        <p>Loading...</p>
      ) : (
        <div>
          <span>Bill Name:</span>
          <span>{thisBill[0].title}</span>
          <span>Total Bill in USD:</span>
          <span>{thisBill[0].amount}</span>

          <p>Splits:</p>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Left to Pay</th>
                <th>Paid</th>
                <th>Status</th>
                <th>Aprove Payment</th>
              </tr>
              {thisBill[0].splits.map((curr, index) => {
                const getSplitDetails = props.allUsers.filter(
                  user => curr.userId === user.id
                );
                return (
                  <TableEntry
                    curr={curr}
                    index={index}
                    getSplitDetails={getSplitDetails}
                    axiosOnLogin={props.axiosOnLogin}
                  />
                );
              })}
              {displayAddedEmails.map((curr, index) => {
                getSplitDetails = props.allUsers.filter(
                  user => curr.userId === user.id
                );
                return (
                  <tr key={index}>
                    <th>
                      {getSplitDetails.firstName} {getSplitDetails.lastName}
                    </th>
                    <th>{curr.amount}</th>
                    <th>{curr.amountPaid}</th>
                    <th>{curr.status}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <span>email</span>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={newEmail}
          />
          <button onClick={handleAdd}>Add</button>
          {addedPeopleDetails.map((curr, index) => {
            return (
              <div key={index}>
                <span>
                  {curr[0].firstName} {curr[0].lastName}
                </span>
                <span>{curr[0].email}</span>
              </div>
            );
          })}
          <br />

          <button onClick={handleSubmit}>Submit</button>
          <br />
          <a href="mailto:?subject=Split%20the%20Bill%20Invitation%20-%20Your%20personal%20invitation!%20&amp;body=Hey!%2C%0A%0AYou%20have%20been%20invited%20by%20your%20friend%20a%20to%20Split%20the%20Bill.%20%0A%0AThis%20is%20the%20new%20and%20easy%20way%20to%20split%20the%20bill%20without%20the%20fuse%20at%20the%20table!%0A%0ARegister%20now%20%3D%3E%20https%3A%2F%2Ffront-end.mattlocklin.now.sh%2Fregister%20%0A%0ASee%20you%20soon!%0A%0AFrom%20the%20Team%20at%20Split%20the%20Bill">
            Invite a Friend
          </a>
        </div>
      )}
    </div>
  );
}
