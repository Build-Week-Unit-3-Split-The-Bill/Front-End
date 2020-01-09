import React from 'react';
import NotificationCard from './notificationCard';

function Notifications(props) {

  return (
    <div>
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

export default Notifications;