import React, { useState, useEffect } from "react";
import axiosWithAuth from "../custom-hooks/axiosWithAuth";

export default function EditBill(props) {
  const getThisBill = e =>
    props.user.bills.filter(bill => bill.id === props.match.params.id);
  const thisBill = getThisBill();

  useEffect(() => {
    getThisBill();
  });

  const [newEmail, setNewEmail] = useState("");
  const [addedPeopleDetails, setAddedPeopleDetails] = useState([]);

  const handleChange = e => {
    setNewEmail(e.target.value);
  };

  const handleAdd = e => {
    const user = props.allUsers.filter(user => user.email === newEmail);
    if (user === undefined || user === []) {
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
        console.log(response);
        console.log(thisBill);
        getThisBill();
      })
      .catch(error => {
        props.setError(error);
      });
  };

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
              </tr>
              {!thisBill[0].splits.length || thisBill[0].splits.length === 0 ? (
                <tr>
                  <th>No splits assigned</th>
                </tr>
              ) : (
                thisBill.splits.map((curr, index) => {
                  const getSplitDetails = props.allUsers.filter(
                    user => curr.userId === user.id
                  );
                  return (
                    <tr key="index">
                      <th>
                        {getSplitDetails.firstName} {getSplitDetails.lastName}
                      </th>
                      <th>Left to Pay</th>
                      <th>Paid</th>
                    </tr>
                  );
                })
              )}
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
        </div>
      )}
    </div>
  );

  //   const getBillDetails = props.user.bills.filter(
  //     bill => bill.id === props.match.params.id
  //   );

  //   const [billDetails, setBillDetails] = useState(getBillDetails);
  //   console.log(`initial`, billDetails);

  //   const [newEmail, setNewEmail] = useState("");
  //   const [splittersArr, setSpliterArr] = useState([]);
  //   const [billSplits, setBillSplits] = useState([]);

  //   const handleChange = e => {
  //     setNewEmail(e.target.value);
  //   };

  //   const handleAdd = e => {
  //     const user = props.allUsers.filter(user => user.email === newEmail);
  //     setSpliterArr([...splittersArr, user]);
  //     setNewEmail("");
  //   };

  //   const handleSubmit = e => {
  //     e.preventDefault();
  //     const splittersIds = splittersArr.map(curr => curr[0].id);
  //     axiosWithAuth()
  //       .post(
  //         `https://split-the-bill-api.herokuapp.com/api/bills/${billDetails[0].id}/split`,
  //         { splitters: splittersIds }
  //       )
  //       .then(response => {
  //         setBillSplits(response.data.splits);
  //         setBillDetails([{ ...billDetails, splits: response.data.splits }]);
  //         let newArr = props.user.splits.concat(response.data.splits);
  //         props.setUser({
  //           ...props.user,
  //           splits: [newArr]
  //         });
  //         setSpliterArr([]);
  //         setNewEmail("");
  //         console.log(`working axios`, billDetails);
  //       })
  //       .catch(error => {
  //         props.setError(error);
  //         console.log(`sad face`, billDetails);
  //       });
  //   };

  //   return (
  //     <div className="edit-bill">
  //       <p>Bill Overview</p>
  //       {!billDetails ? (
  //         <p>Loading...</p>
  //       ) : (
  //         <div>
  //           <span>Bill Name:</span>
  //           <span>{billDetails[0].title}</span>
  //           <span>Total Bill in USD:</span>
  //           <span>{billDetails[0].amount}</span>

  //           <p>Splits:</p>
  //           <table>
  //             <tbody>
  //               <tr>
  //                 <th>Details from:</th>
  //                 <th>Name</th>
  //                 <th>Left to Pay</th>
  //                 <th>Paid</th>
  //               </tr>
  //               {!billDetails[0].splits && !billSplits ? (
  //                 <tr>
  //                   <th>No splits asigned yet</th>
  //                 </tr>
  //               ) : !billSplits ? (
  //                 billDetails[0].splits.map((curr, index) => {
  //                   const splitsDetails = props.allUsers.filter(
  //                     user => curr.userId === user.id
  //                   );
  //                   return (
  //                     <tr key={index}>
  //                       <th>no billSplits</th>
  //                       <th>
  //                         {splitsDetails.firstName} {splitsDetails.lastName}
  //                       </th>
  //                       <th>{curr.amount}</th>
  //                       <th>{curr.amountPaid}</th>
  //                     </tr>
  //                   );
  //                 })
  //               ) : !billDetails[0].splits ? (
  //                 billSplits.map((curr, index) => {
  //                   const splitsDetails = props.allUsers.filter(
  //                     user => curr.userId === user.id
  //                   );
  //                   return (
  //                     <tr key={index}>
  //                       <th>no billDetails</th>
  //                       <th>
  //                         {splitsDetails[0].firstName} {splitsDetails[0].lastName}
  //                       </th>
  //                       <th>{curr.amount}</th>
  //                       <th>{curr.amountPaid}</th>
  //                     </tr>
  //                   );
  //                 })
  //               ) : (
  //                 <tr>
  //                   <th>No splits asigned yet</th>
  //                 </tr>
  //               )}
  //             </tbody>
  //           </table>
  //           <span>email</span>
  //           <input
  //             type="email"
  //             name="email"
  //             onChange={handleChange}
  //             value={newEmail}
  //           />
  //           <button onClick={handleAdd}>Add</button>
  //           {splittersArr.map((curr, index) => {
  //             return (
  //               <div key={index}>
  //                 <span>
  //                   {curr[0].firstName} {curr[0].lastName}
  //                 </span>
  //                 <span>{curr[0].email}</span>
  //               </div>
  //             );
  //           })}
  //           <br />
  //           <button onClick={handleSubmit}>Submit</button>
  //         </div>
  //       )}
  //     </div>
  //   );
}
