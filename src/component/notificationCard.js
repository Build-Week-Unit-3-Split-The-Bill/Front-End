import React from "react";


function NotificationCard(props) {

  return (
    <div className="notification-card">
      <h3>New Bill</h3>
      <h4>${props.curr.amount}</h4>
    </div>
  );
}

export default NotificationCard;
