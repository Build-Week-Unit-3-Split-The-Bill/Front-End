import React from "react";


function Bill(props) {

  const id = props.match.params.id 

  const thisBill = props.user.bills.filter( curr => {
    return curr.id === id
  })

  console.log(thisBill);

  return (
    <div className="bill">
      <h1>{thisBill[0].title}</h1>
      <p>HIIIII</p>
    </div>
  );
}

export default Bill;
