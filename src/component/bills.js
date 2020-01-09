import React, { useState } from "react";
import { Route } from "react-router-dom";
import Bill from "./bill";

import styled from "styled-components";
import NewBill from "./newBill";
import BillCard from "./BillCard";

const FormContainer = styled.div``;

export default function Bills(props) {
  console.log(props);

  const bills = props.user.bills;
  const splits = props.user.splits;

  return (
    <div className="bills-container">
      <Route
        exact
        path="/dashboard/bills/:id"
        render={props => (
          <Bill {...props} allUsers={props.allUser} user={props.user} />
        )}
      />

      <h3 className="bills-headings">My Bills</h3>
      <div>
        <img
          className="slide-arrow"
          src="https://i.imgur.com/spe9HXm.png"
          width="100px"
          alt="animation logo"
        />
      </div>

      <h3 className="bills-headings">{props.user.firstName} Bills</h3>
      <FormContainer>
        <div>
          <NewBill
            newBillValues={props.newBillValues}
            setNewBillValues={props.setNewBillValues}
            bills={bills}
            user={props.user}
            setUser={props.setUser}
          />
        </div>
      </FormContainer>
      <div className="all-bills">
        {bills.map((curr, index) => {
          return (
            <div key={index}>
              <BillCard index={index} curr={curr} {...props} />
            </div>
          );
        })}
      </div>
      <h3 className="bills-headings">Bills to Pay</h3>
      {/* <div className="all-bills">
        {splits.map((curr, index) => {
          return (
            <div key={index}>
              <BillCard curr={curr} />
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
