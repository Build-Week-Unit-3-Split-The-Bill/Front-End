import React, { useState, useEffect } from "react";

import styled from "styled-components";
import NewBill from "./newBill";
import BillCard from "./BillCard";

const Id = styled.p`
  font-size: 1.2rem;
  margin-right: 20px;
`;

const Date = styled.p`
  font-size: 1.2rem;
`;

const FormContainer = styled.div``;

export default function Bills(props) {
  console.log(props);
  const bills = props.user.bills;
  const splits = props.user.splits;

  const [newBillValues, setNewBillValues] = useState({
    amount: "",
    title: ""
  });

  return (
    <div className="bills-container">
      <h3 className="bills-headings">{props.user.firstName} Bills</h3>
      <FormContainer>
        <div>
          <NewBill
            newBillValues={newBillValues}
            setNewBillValues={setNewBillValues}
            bills={bills}
          />
        </div>
      </FormContainer>
      <div className="all-bills">
        {bills.map((curr, index) => {
          return (
            <div key={index}>
              <BillCard curr={curr} />
            </div>
          );
        })}
      </div>
      <h3 className="bills-headings">Bills to Pay</h3>
      <div className="all-bills">
        {splits.map((curr, index) => {
          return (
            <div key={index}>
              <BillCard curr={curr} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
