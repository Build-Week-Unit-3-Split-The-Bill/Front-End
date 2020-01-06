import React from 'react';
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
      <div className='nav'>
        <Link to='/'><span className='logo'>SPLIT THE BILL</span></Link>
        <div>
            <ul className='nav-links'>
                <Link to='/login'><li>LOGIN</li></Link>
                <Link to='/team'><li>TEAM</li></Link>
            </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;