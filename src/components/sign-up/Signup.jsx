import React from 'react'
import './signup.css'
import Icon from '../../Icon'
import {Link} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


function Signup() {


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


  const submit = (data) => {
    console.log(data)
  }



  return (
    <div className='sign-Up'>
          <div className="signup-wrapper">
              <div className="signup-wrapper-top">
                <Icon />
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
                <input type="text" name="username" id="username" placeholder='Please Enter Your Username Here' {...register('username')}/>
                <p>{errors.username?.message}</p>
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
              <button type='submit' id='reg-sumbit'>Register</button>

              <div className="login-opt">
                <span className='select'>Have an account ? <Link to='/form'>Login</Link></span>
                
                </div>
        </form>
          </div>

       

    </div>
  )
}

export default Signup