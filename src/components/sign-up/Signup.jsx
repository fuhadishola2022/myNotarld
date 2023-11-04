import React, {useState, useContext, useEffect} from 'react'
import './signup.css'
import Icon from '../../Icon'
import {Link} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import NoteContext from '../../NoteContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import Rotate from '../../spinner/Rotate'
import { useNavigate } from 'react-router-dom'






function Signup() {

  const {submit, isChecking} = useContext(NoteContext)
  const [checkUserName, setCheckUserName] = useState('')
  const [userNameBool, setUserNameBool] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userNameStatus, setUserNameStatus] = useState('')
  const navigate = useNavigate()
  


  const fetchCheck = async () => {

     await axios.post('https://notearld.onrender.com/user/check', {
      username: checkUserName
    }).then((stat) => {
      setUserNameStatus(stat?.data?.message)
      setUserNameBool(stat?.data?.status)
      setIsLoading(false)
      
    }).catch((err) => {
      setUserNameStatus(err?.response?.data?.message)
      setUserNameBool(err?.response?.data?.status)
      setIsLoading(false)
    })
        
  }

  

  useEffect(() => {
    if(checkUserName.length){
      fetchCheck()
      setIsLoading(true)
    }
    if(checkUserName.length === 0){
      setUserNameStatus(null)
      setIsLoading(false)
    }
  
  },[checkUserName])

  

 
   
  const schema = yup.object().shape({
    name: yup.string().required('Required*'),
    username: yup.string().required('Required*'),
    email: yup.string().email().required('Required*'),
    password: yup.string().min(6).max(15).required('Required*'),
    confirmPassword: yup.string().oneOf([yup.ref('password')]).required('Your password failed to match!')
  })

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })

      


  return (
    <div className='sign-Up'>
          <div className="signup-wrapper">
              <div className="signup-wrapper-top">
              <Link to='/'><Icon className='icon'/></Link>
                <span>[ SIGNUP ]</span>
              </div>

              <form id='signup-details' onSubmit={handleSubmit(submit)}>
              <div className="name">
                <label htmlFor="Name">Name</label>
                <input type="text" name="name" id="name" placeholder='Please Enter Your Name Here' {...register('name')}/>
                <p>{errors.name?.message}</p>
              </div>
            

              <div className="username">
              <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username"  placeholder='Please Enter Your Username Here' {...register('username')} onChange={(e) => setCheckUserName(e.target.value)}/>
                <p>{errors.username?.message}</p>
                {isLoading ? <Rotate /> : 
                <span className={userNameBool === true ? "success" : "fail"}>{userNameStatus}</span>}
              </div>

              <div className="user-email">
                <label htmlFor="user-email">Email</label>
                <input type="email" name="user-email" id="user-email" placeholder='Please Enter Your Email Here' {...register('email')}/>
                <p>{errors.email?.message}</p>
              </div>

              <div className="password">
                <label htmlFor="user-password">Password</label>
                <input type="password" name="user-password" id="user-password" placeholder='Please Enter Your Password Here' {...register('password')}/>
                <p>{errors.password?.message}</p>
              </div>

              <div className="confirm-password">
              <label htmlFor="user-confirm-password">Confirm Password</label>
                <input type="password" name="user-confirm-password" id="user-confirm-password" placeholder='Confirm Password' {...register('confirmPassword')}/>
                <p>{errors.confirmPassword?.message}</p>
              </div>
              <button type='submit' id='reg-sumbit' disabled={userNameBool ? false : true}>{isChecking ? <p className='rotateP'>{<Rotate />}</p> : "Register"}</button>

              <div className="login-opt">
                <span className='select'>Have an account ? <Link to='/form'>Login</Link></span>
                
                </div>
                <ToastContainer />
        </form>
          </div>

       

    </div>
  )
}

export default Signup