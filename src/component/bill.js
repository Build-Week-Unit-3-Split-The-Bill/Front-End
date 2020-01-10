import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    width: 650,
    margin: "0px auto"
  },
  rows: {
    color: "white",
    margin: "3px 0px"
  }
});

function Bill(props) {
  const id = props.match.params.id;

  const thisBill = props.user.bills.filter(curr => {
    return curr.id === id;
  });

  const newCreated = Date(thisBill[0].createdAt);
  const stringCreated = newCreated.toString();
  const newUpdated = Date(thisBill[0].createdAt);
  const stringUpdated = newUpdated.toString();

  const classes = useStyles();

  const perPerson = thisBill[0].amount / thisBill[0].splits.length;

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
        <br />{" "}
        {!thisBill[0].splits.length ? thisBill[0].amount : perPerson.toFixed(2)}
      </p>
      <p>
        <span className="underline">Status:</span> <br />
        <br />
        {thisBill[0].status}
      </p>
      <div>
        <h4>Splits:</h4>
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
              {!thisBill[0].splits.length ? (
                <div>No people assigned</div>
              ) : (
                thisBill[0].splits.map((curr, index) => {
                  const getSplitDetails = props.allUsers.filter(
                    user => user.id === curr.userId
                  );
                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {getSplitDetails[0].firstName}
                      </TableCell>
                      <TableCell align="right">
                        {getSplitDetails[0].lastName}
                      </TableCell>
                      <TableCell align="right">{curr.amount}</TableCell>
                      <TableCell align="right">{curr.amountPaid}</TableCell>
                      <TableCell align="right">{curr.status}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
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
        <button className="bill-card-button-new">Edit</button>
      </Link>
      <div className="spacer"></div>
    </div>
  );
}

export default Bill;
