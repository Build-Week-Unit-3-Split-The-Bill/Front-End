import React, { useState, useEffect } from "react";
import axiosWithAuth from "../custom-hooks/axiosWithAuth";
import TableEntry from "./TableEntry";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    width: "85%",
    margin: "0px auto"
  },
  rows: {
    color: "black",
    margin: "3px 0px"
  }
});

export default function EditBill(props) {
  const classes = useStyles();

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
          <TableContainer className={classes.table}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Amount Left to Pay</TableCell>
                  <TableCell align="right">Amount Paid</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
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
              </TableBody>
            </Table>
          </TableContainer>
          <span>email</span>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={newEmail}
          />
          <button onClick={handleAdd}>Add</button>
          <TableContainer>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {addedPeopleDetails.map((curr, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {curr[0].firstName}
                    </TableCell>
                    <TableCell align="right">{curr[0].lastName}</TableCell>
                    <TableCell align="right">{curr[0].email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <button onClick={handleSubmit}>Submit</button>
          <br />
          <a
            className="invite-friend"
            href="mailto:?subject=Split%20the%20Bill%20Invitation%20-%20Your%20personal%20invitation!%20&amp;body=Hey%2C%0A%0AYou%20have%20been%20invited%20by%20your%20friend%20a%20to%20Split%20the%20Bill.%20%0A%0AThis%20is%20the%20new%20and%20easy%20way%20to%20split%20the%20bill%20without%20the%20fuse%20at%20the%20table!%0A%0ARegister%20now%20%3D%3E%20https%3A%2F%2Ffront-end.mattlocklin.now.sh%2Fregister%20%0A%0ASee%20you%20soon!%0A%0AFrom%20the%20Team%20at%20Split%20the%20Bill"
          >
            Invite a Friend
          </a>
        </div>
      )}
    </div>
  );
}
