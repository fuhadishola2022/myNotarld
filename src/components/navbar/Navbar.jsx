import React from 'react'
import './navbar.css'
import {Link} from 'react-router-dom'
import Icon from '../../Icon'

function Navbar() {
  return (
    <div className='navbar'>
            <div className="navbar-left">
                <Icon />
            </div>
            
            <div className="navbar-right">
                <Link to="/form" className='login'>Login</Link>
                <Link to="/Signup" className="Sign-Up">Signup</Link>
            </div>
    </div>
  )
}

export default Navbar