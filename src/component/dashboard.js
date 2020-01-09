import React, { useState, useCallback } from "react";
import { useTransition, animated } from "react-spring";
import Friends from "./friends";
import Bills from "./bills";
import Notification from './notification'

export default function Dashboard(props) {
  const pages = [
    ({ style }) => (
      <animated.div style={{ ...style, cursor: 'default', background: "#EC576B", color: "white" }}>
        <Bills
          {...props}
          user={props.user}
          setUser={props.setUser}
          allUser={props.allUsers} // TYPO!!
          setError={props.setError}
<<<<<<< HEAD
          newBillValues={props.newBillValues}
          setNewBillValues={props.setNewBillValues}
=======
          onClick={onClick}
>>>>>>> 9760b651f31814c4a34db2613322b3c8be588b63
        />
      </animated.div>
    ),
    ({ style }) => (
      <animated.div style={{ ...style, cursor: 'default', background: "#F7CE3E", color: "white" }}>
        <Friends 
        {...props}
        onClick={onClick}
        />
      </animated.div>
    ),
    ({ style }) => (
      <animated.div style={{ ...style, cursor: 'default', background: "#4EC5C1", color: "white" }}>
        <Notification 
        {...props}
        user={props.user}
        setUser={props.setUser}
        allUser={props.allUsers}
        onClick={onClick}
        />
      </animated.div>
    )
  ];

  const [sliderIteration, setSliderIteration] = useState(0);
  const onClick = useCallback(
    () => setSliderIteration(state => (state + 1) % 3),
    []
  );
  const transitions = useTransition(sliderIteration, p => p, {
    from: { opacity: 1, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 1, transform: "translate3d(-50%,0,0)" }
  });

  if (!props.user) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className='dashboard'>
      <div className="simple-trans-main">
        {transitions.map(({ item, props, key }) => {
          const Page = pages[item];
          return <Page key={key} style={props} />;
        })}
      </div>
    </div>
  );
}
