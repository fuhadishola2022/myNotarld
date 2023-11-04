import React, {useState} from 'react'
import './form.css'
import {Link} from 'react-router-dom'
import Icon from '../../Icon'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rotate from '../../spinner/Rotate'
import { useNavigate } from 'react-router-dom'




function Form() {

  const [emailText, setEmailText] = useState('')
  const [passwordText, setPasswordText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()


  const successNotification = () => {
    toast.success('Login Successful', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const errorNotification = () => {
    toast.error('Auth Failed!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const loginHandle = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    await axios.post('https://notearld.onrender.com/user/login', {
      email: emailText,
      password: passwordText
    }).then((response) => {
      console.log(response.data)
      successNotification()
      localStorage.setItem("User", JSON.stringify(response.data))
      setIsLoading(false)
      setTimeout(() => {
        navigate('/')
        window.location.reload()
      }, 3500);
      
    }).catch((error) => {
      if(error){
        if(error){
          errorNotification()
          setIsLoading(false)
        }
      }
    })
    
  }

 


  

  return (
    <div className='form'>
         <div className="form-wrapper">
            <div className="form-wrapper-top">
               <Link to='/'><Icon className='icon'/></Link>
            <span>[ Welcome Back ]</span>
            </div>


            <form id='login-form'>

                <div className="email-div">
                <label htmlFor="email">Email</label>
                <input type="text" 
                placeholder='Please Enter Email Here...' 
                id='email' 
                onChange={(e) => setEmailText(e.target.value)}
                />
                </div>


                <div className="password-div">
                <label htmlFor="password">Password</label>
                <input type="password" placeholder='Please Enter Password Here...' id='password'
                onChange={(e) => setPasswordText(e.target.value)}
                />
                </div>

                <button type='submit' className='login-btn' onClick={loginHandle}>{isLoading ? <p className='rotateP'><Rotate /></p> : "Login"}</button>

                <div className="options">
                <span className='select'>Don't have an account ? </span>
                <Link to='/signup'>Register</Link>
                </div>

                <ToastContainer />
            </form>
         </div>
    </div>
  )
}

export default Form