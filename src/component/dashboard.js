import React, { useState, useCallback } from "react";
import { useTransition, animated } from "react-spring";
import Friends from "./friends";
import Bills from "./bills";

export default function Dashboard(props) {
  const pages = [
    ({ style }) => (
      <animated.div style={{ ...style, background: "#EC576B", color: "white" }}>
        <Bills
          {...props}
          user={props.user}
          allUser={props.allUsers}
          setError={props.setError}
        />
      </animated.div>
    ),
    ({ style }) => (
      <animated.div style={{ ...style, background: "#F7CE3E", color: "white" }}>
        <Friends />
      </animated.div>
    ),
    ({ style }) => (
      <animated.div style={{ ...style, background: "#4EC5C1", color: "white" }}>
        NOTIFICATIONS
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
    <div>
      <div className="simple-trans-main">
        <button onClick={onClick}>></button>
        {transitions.map(({ item, props, key }) => {
          const Page = pages[item];
          return <Page key={key} style={props} />;
        })}
      </div>
    </div>
  );
}
