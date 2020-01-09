import React from "react";

function Friends(props) {
  return (
    <div>
      <h1>FRIENDS</h1>
      <div className='pointer' onClick={props.onClick}>
        <img
          className="slide-arrow"
          src="https://i.imgur.com/spe9HXm.png"
          width="100px"
          alt='animation logo'
        />
      </div>
    </div>
  );
}

export default Friends;
