import React from 'react'
import './FormStyle.css'

import { useForm } from 'react-hook-form'
import useAuthContext from '../../../context/AuthContext';
import { NavLink } from 'react-router-dom';

import { DevTool } from '@hookform/devtools';


export default function Login() {
  const {control, register, handleSubmit, setError, formState: { errors } } = useForm();

  const { login, emailPattern } = useAuthContext()

  const onSubmit = (dataForm) =>{
    login(setError, dataForm)
  }
  return (
    <div className='form-container'>
      <h1 className='Page-Title'>Log In</h1>
      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">        
          <div className={`input-container ${errors.email && 'invalid'}`}>
            <input placeholder=' ' {
              ...register('email',
                {required: {
                  value: true,
                  message: 'Email is required'
                },pattern: {
                  value: emailPattern,
                  message: 'Mail is not valid'
                }
                })} />
            <label className='input-label'> Email </label>
          </div>
          {errors.email && <span className='error-text'>{errors.email.message}</span> }
        </div>
        <div className="input-wrapper">
          <div className={`input-container ${errors.password && "invalid"}`}>
            <input placeholder=' ' {...register('password', {required:{value: true, message: 'Password is required'}})} />
            <label className='input-label'> password </label>
          </div>
            {errors.password && <span className='error-text'>{errors.password.message}</span>}
        </div>

          <div className="w-full">
            <input type="submit" className='btn block w-full' value="Login"/>
          </div>
      </form>
      <p className='text-center my-3'>
        You don't have an account? <br/>
        <NavLink className="Link link-warning" to='/register'>Register</NavLink>
      </p>
      <DevTool control={control}/>
    </div>
  )
}
