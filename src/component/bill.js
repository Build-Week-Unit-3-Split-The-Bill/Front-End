import React from 'react';


function Bill(props) {

    const id = props.match.params.id
    console.log(id);

  return (
    <div className='bill'>
      {/* <p>{props.user.bills[id].title}</p> */}
    </div>
  );
}

export default Bill;