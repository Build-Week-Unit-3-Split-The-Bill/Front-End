import React from 'react';
import { Link } from 'react-router-dom'
import { useSpring, a } from 'react-spring'

function Navbar(props) {

    const easeInAnimation = useSpring({
        config: {
            mass: 5,
            stiffness: 200,
            friction: 100,
            clamp: true
        },
        from: {
            opacity: 0
        },

        to: {
            opacity: 1
        }
    })
  return (
    <div className='navbar'>
      <a.div className='nav' style={easeInAnimation}>
        <Link to='/'><span className='logo'>SPLIT THE BILL</span></Link>
        <div>
            <ul className='nav-links'>
                {(localStorage.getItem('token') != undefined) ?
                <li><button onClick={() => {localStorage.removeItem('token')
                props.history.push('/login')}}>LOGOUT</button></li>
                : <Link to='/login'><li>LOGIN</li></Link>}
                <Link to='/team'><li>TEAM</li></Link>
            </ul>
        </div>
      </a.div>
    </div>
  );
}

export default Navbar;