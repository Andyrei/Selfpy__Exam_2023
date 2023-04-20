import React, { useState } from 'react'

import './FormStyle.css'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/authContext';

export default function Login() {
  
  const {register, handleSubmit, control, formState: {errors} } = useForm();
  
  const {setUser} = useAuth();
  const navigate = useNavigate();


  const onSubmit = (dataForm) =>{
    fetch('https://selfpy-a80cb-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(
      (data)=>{
        setUser = dataForm
      }
    )
    .catch(err => console.log(err))

  }

  return (
    <div className='form-container'>
      <h1 className='Page-Title'>Log In</h1>
      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">        
          <div className={errors.username ? 'input-container invalid' : 'input-container'}>
            <input placeholder=' ' {
              ...register('username',
                {required: {
                  value: true,
                  message: 'Username is required'
                }})} />
            <label className='input-label'> username </label>
          </div>
          {errors.username && <span className='error-text'>{errors.username?.message}</span> }
        </div>
        <div className="input-wrapper">
          <div className={errors.password? 'invalid input-container' : 'input-container'}>
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
