import React from 'react'
import './FormStyle.css'
import axios from '../../api/axios';

import { useForm } from 'react-hook-form'
import useAuthContext from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';

import { DevTool } from '@hookform/devtools';


export default function Login() {
  const {register, handleSubmit, control, formState: {errors} } = useForm();
  const { setAsLogged } = useAuthContext()
  const LOGIN_API= import.meta.env.VITE_LOGIN_API;

  const onSubmit = async (dataForm) =>{
    await axios.post(LOGIN_API, dataForm)
    .then((data)=>{
      if (data.status !== 'error'){
        setAsLogged(data.user, data['access_token'])
      }else{
        //
      }

      navigate('/profile');
      console.log('You have been logged');
    });
  }

  return (
    <div className='form-container'>
      <h1 className='Page-Title'>Log In</h1>
      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">        
          <div className={errors? 'input-container invalid' : 'input-container'}>
            <input placeholder=' ' {
              ...register('email',
                {required: {
                  value: true,
                  message: 'email is required'
                }})} />
            <label className='input-label'> Email </label>
          </div>
          {errors && <span className='error-text'>{errors?.message}</span> }
        </div>
        <div className="input-wrapper">
          <div className={errors? 'invalid input-container' : 'input-container'}>
            <input placeholder=' ' {...register('password', {required:{value: true, message: 'Password is required'}})} />
            <label className='input-label'> password </label>
          </div>
            {errors && <span className='error-text'>{errors.message}</span>}
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
