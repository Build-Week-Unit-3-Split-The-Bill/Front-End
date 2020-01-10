import React from 'react';
import NotificationCard from './notificationCard';

function Notifications(props) {

  return (
    <div className='notifications'>
      <div className='pointer' onClick={props.onClick}>
        <img
          className="slide-arrow"
          src="https://i.imgur.com/spe9HXm.png"
          width="100px"
          alt='animation logo'
        />
        <h1>Top up your account and make Payments via Paypal</h1>
        <h3>Coming soon</h3>
       </div>
    </div>
  );
}

export default Notifications;