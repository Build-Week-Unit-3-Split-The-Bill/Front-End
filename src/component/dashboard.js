import React, { useState, useCallback, useEffect } from "react";
import { useTransition, animated } from "react-spring";
import Friends from "./friends";
import Bills from "./bills";
import axiosWithAuth from "../custom-hooks/axiosWithAuth";

export default function Dashboard(props) {
  const [user, setUser] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosWithAuth()
      .get("https://split-the-bill-api.herokuapp.com/api/users/profile")
      .then(response => {
        console.log(response);
        setUser(response.data.user);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  const pages = [
    ({ style }) => (
      <animated.div style={{ ...style, background: "#EC576B", color: "white" }}>
        <Bills {...props} user={user} />
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

  const [index, set] = useState(0);
  const onClick = useCallback(() => set(state => (state + 1) % 3), []);
  const transitions = useTransition(index, p => p, {
    from: { opacity: 1, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 1, transform: "translate3d(-50%,0,0)" }
  });

  if (!user) {
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
