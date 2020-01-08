import React from "react";
import EditBill from "./editBill";

function Bill(props) {
  const id = props.match.params.id;

  const thisBill = props.user.bills.filter(curr => {
    return curr.id === id;
  });

  console.log(`Bill component`, props);

  return (
    <div className="bill">
      <h1>{thisBill[0].title}</h1>
<<<<<<< HEAD
      <p>HIIIII</p>
      <EditBill {...props} user={props.user} thisBill={thisBill} />
=======
      <p><span className='underline'>Total:</span> <br /><br /> {thisBill[0].amount}</p>
      <p><span className='underline'>Per person:</span><br /><br /> {thisBill[0].amount / 1 + thisBill[0].splits.length}</p>
      <p><span className='underline'>Status:</span> <br /><br />{thisBill[0].status}</p>
      <p><span className='underline'>Created:</span> <br /><br /> {thisBill[0].createdAt}</p>
      <p><span className='underline'>Updated:</span> <br /><br /> {thisBill[0].updatedAt}</p>
      <button>Edit</button>
>>>>>>> 7cd19187efc08a6030c41fc1c1b27b402659d518
    </div>
  );
}

export default Bill;
