import React, { useState } from "react";
import { Route } from "react-router-dom";
import Bill from "./bill";

import styled from "styled-components";
import NewBill from "./newBill";
import BillCard from "./BillCard";
import SplitCard from "./splitCard";

const FormContainer = styled.div``;

export default function Bills(props) {
  const bills = props.user.bills;
  const splits = props.user.splits;

  const [newBillValues, setNewBillValues] = useState({
    amount: "",
    title: ""
  });

  return (
    <div className="bills-container">
      <Route
        exact
        path="/dashboard/bills/:id"
        render={props => (
          <Bill {...props} allUsers={props.allUsers} user={props.curr} />
        )}
      />

      <h3 className="bills-headings">My Bills</h3>
      <div className="pointer" onClick={props.onClick}>
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
            newBillValues={newBillValues}
            setNewBillValues={setNewBillValues}
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
              <BillCard
                index={index}
                curr={curr}
                {...props}
                axiosOnLogin={props.axiosOnLogin}
              />
            </div>
          );
        })}
      </div>
      <h3 className="bills-headings">Bills to Pay ({splits.length})</h3>
      <div className="all-bills">
        {splits.map((curr, index) => {
          return (
            <div key={index}>
              <SplitCard
                {...props}
                curr={curr}
                axiosOnLogin={props.axiosOnLogin}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
