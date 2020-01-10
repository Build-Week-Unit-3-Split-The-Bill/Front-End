import React from "react";
import DenseTable from "./Table";

function Friends(props) {
  return (
    <div>
      <h2>FRIENDS</h2>
      <div className="pointer" onClick={props.onClick}>
        <img
          className="slide-arrow"
          src="https://i.imgur.com/spe9HXm.png"
          width="100px"
          alt="animation logo"
        />
      </div>
      <DenseTable allUsers={props.allUsers} />
    </div>
  );
}

export default Friends;
