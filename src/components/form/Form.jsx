import React from 'react'
import './form.css'
import {Link} from 'react-router-dom'
import Icon from '../../Icon'

function Form() {
  return (
    <div className='form'>
         <div className="form-wrapper">
            <div className="form-wrapper-top">
                <Icon />
            <span>[ Welcome Back ]</span>
            </div>


            <form id='login-form'>

                <div className="email-div">
                <label htmlFor="email">Email</label>
                <input type="text" placeholder='Please Enter Email Here...' id='email' autoComplete='off'/>
                </div>


                <div className="password-div">
                <label htmlFor="password">Password</label>
                <input type="password" placeholder='Please Enter Password Here...' id='password'/>
                </div>

                <button type='submit' className='login-btn'>Login</button>

                <div className="options">
                <span className='select'>Don't have an account ? </span>
                <Link to='/signup'>Register</Link>
                </div>

            </form>
         </div>
    </div>
  )
}

export default Form