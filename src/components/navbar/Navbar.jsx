import React, { useContext, useState } from 'react'
import './navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import Icon from '../../Icon'
import NoteContext from '../../NoteContext'
import UserIcon from '../../UserIcon'
import { CiEdit } from 'react-icons/ci';
import { BiLogOut } from 'react-icons/bi';



function Navbar() {

  const {userLoggedIn, toggleShowPost} = useContext(NoteContext)
  const [userOpt, setUserOpt] = useState(false)
  const navigate = useNavigate()
  
  const switchUserOpt = () => {
    setUserOpt(!userOpt)
  }

  const logout = () => {
    localStorage.clear("User")
    navigate('/form')
    window.location.reload()
}
 

  return (
    <div className='navbar'>
            <div className="navbar-left">
               <Link to='/'> <Icon /></Link>
            </div>
            
            <div className="navbar-right">
                {userLoggedIn ? (
                  <div className='user-holder'>
                  <Link to='/profile'><button className='create-post' onClick={toggleShowPost}>Create Post</button></Link>
                  <div className='user-icon' onClick={switchUserOpt}><UserIcon /></div>     
            

                  {userOpt ? ( <div className="userOptions">
                      <div className="user-link-holder">
                      <CiEdit className='pro-icon'/>
                        <Link to="profile" className='user-link-text'>Profile</Link>
                      </div>
                     
                     <div className="user-logout-btn">
                      <BiLogOut className='pro-icon-log'/>
                       <button type='submit' className='logout' onClick={logout}>Logout</button>
                     </div>
                      </div> ) : null}
            </div>

                  


                ): (
                  <div>
                  <Link to="/form" className='login'>Login</Link>
                  <Link to="/Signup" className="Sign-Up">Signup</Link>
                  </div>
                )}
            </div>
    </div>
  )
}

export default Navbar