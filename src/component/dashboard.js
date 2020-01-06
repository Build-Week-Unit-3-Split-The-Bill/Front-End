import React, { useState, useCallback } from 'react'
import { useTransition, animated } from 'react-spring'
import Friends from './friends'


const pages = [
    ({ style }) => <animated.div style={{ ...style, background: '#EC576B', color: 'white' }}>BILLS</animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: '#F7CE3E', color: 'white' }}><Friends /></animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: '#4EC5C1', color: 'white' }}>NOTIFICATIONS</animated.div>,
]

export default function Dashboard() {

  const [index, set] = useState(0)
  const onClick = useCallback(() => set(state => (state + 1) % 3), [])
  const transitions = useTransition(index, p => p, {
    from: { opacity: 1, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 1, transform: 'translate3d(-50%,0,0)' },
  })
  return (
    <div>
        <div className="simple-trans-main" onClick={onClick}>
        {transitions.map(({ item, props, key }) => {
            const Page = pages[item]
            return <Page key={key} style={props} />
        })}
        </div>
    </div>
  )
}