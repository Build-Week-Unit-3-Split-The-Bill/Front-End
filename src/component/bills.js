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
      <h3 className='bills-headings'>My Bills</h3>
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
      <h3 className='bills-headings'>Bills to Pay</h3>
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

// function Bills() {
//   const [state, setState] = useState([]);

//   useEffect(() => {
//     axiosWithAuth().get('https://build-split-the-bill.herokuapp.com/api/bills')
//         .then(response => {
//             setState(response.data.bills)
//         })
//         .catch(error => {
//             console.log(error);
//         })
//   }, []);

//   return (
//     <div className="bills-container">
//       <h3>My Bills</h3>
//       <div className="all-bills">
//         {state.map((curr, index) => {
//           return (
//             <div className="bill-card" key={index}>
//               <div className="id-and-peoplecount">
//                 <div className="party-size">
//                   <img
//                     src="https://i.imgur.com/74ww7EK.png"
//                     width="32px"
//                     height="32px"
//                   />
//                   <p>{curr.split_people_count}</p>
//                 </div>
//                 <div className="pay-amounts">
//                   <h3 className="split-sum">{curr.split_sum}$</h3>
//                   <h4 className="total-sum">
//                     (Total: {curr.split_sum * curr.split_people_count}$)
//                   </h4>
//                 </div>
//                 <Id>{curr.id}</Id>
//               </div>

//               <Date>{curr.created_at}</Date>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Bills;
