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
  console.log(props);

  const [splits, setSplits] = useState(props.user.splits);

  const [newBillValues, setNewBillValues] = useState({
    amount: "",
    title: ""
  });

  const handleUpdate = e => {
    props.axiosOnLogin();
  };

  return (
    <div className="bills-container">
      <Route
        exact
        path="/dashboard/bills/:id"
        render={props => (
          <Bill {...props} allUsers={props.allUsers} user={props.user} />
        )}
      />

      <div className="pointer" onClick={props.onClick}>
        <img
          className="slide-arrow"
          src="https://i.imgur.com/spe9HXm.png"
          width="100px"
          alt="animation logo"
        />
      </div>
      <button onClick={handleUpdate} className="update-button">
        Check for Updates
      </button>

      <h3 className="bills-headings">
        {props.user.firstName} Bills ({bills.length})
      </h3>
      <p className="sub-headings">(Bills created by you)</p>
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
      <p className="sub-headings">(Bills you are a part of)</p>
      <div className="all-bills">
        {splits.map((curr, index) => {
          return (
            <div key={index}>
              <SplitCard
                {...props}
                curr={curr}
                axiosOnLogin={props.axiosOnLogin}
                splits={splits}
                setSplits={setSplits}
                user={props.user}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
