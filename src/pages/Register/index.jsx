import React, { useState } from 'react'
import './FormStyle.css'

import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools';
import { NavLink } from 'react-router-dom';

export default function Register({registerUser, curentUser, setCurentUser}) {
  
  const {register, handleSubmit, fieldValues, control, watch, formState: {errors, touchedFields} } = useForm();
  const emailPattern = 
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const watchPassword = watch('password', false),
        watchMail = watch('mail', false)

  const onSubmit = (data) =>{
    console.log(data);

    /* WORKING FETCH */
    /* registerUser(data) */
  }

  return (
    <div className='form-container'>
      <h1 className='Page-Title'>Register</h1>

      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
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

        {/* Name */}
        <div className="input-wrapper">        
          <div className={errors.name ? 'input-container invalid' : 'input-container'}>
            <input placeholder=' ' {
              ...register('name',
                {required: {
                  value: true,
                  message: 'name is required'
                }})} />
            <label className='input-label'> name </label>
          </div>
          {errors.name && <span className='error-text'>{errors.name?.message}</span> }
        </div>

        {/* Surname */}
        <div className="input-wrapper">        
          <div className={errors.surname ? 'input-container invalid' : 'input-container'}>
            <input placeholder=' ' {
              ...register('surname',
                {required: {
                  value: true,
                  message: 'surname is required'
                }})} />
            <label className='input-label'> surname </label>
          </div>
          {errors.surname && <span className='error-text'>{errors.surname?.message}</span> }
        </div>

        {/* Mail */}
        <div className="input-wrapper">        
          <div className={errors.mail ? 'input-container invalid' : 'input-container'}>
            <input placeholder=' ' {
              ...register('mail',
                {required: {
                  value: true,
                  message: 'Mail is required',
                },
                  pattern: {
                    value: emailPattern,
                    message: 'Mail is invalid'
                  }
                })} />
            <label className='input-label'> mail </label>
          </div>
          {errors.mail && <span className='error-text'>{errors.mail?.message}</span> }
        </div>

        {/* Confirm mail */}
        {touchedFields.mail && watchMail &&
        <div className="input-wrapper">
          {console.log(errors.confirmMail)}        
          <div className={errors.confirmMail ? 'input-container invalid' : 'input-container'}>
            <input placeholder=' ' {
              ...register('confirmMail',
                {required: {
                  value: true,
                  message: 'confirmMail is required'
                },
                pattern: {
                  value: emailPattern,
                  message: 'Mail is invalid'
                }
                })} />
            <label className='input-label'> confirm Mail </label>
          </div>
          {errors.confirmMail && <span className='error-text'>{errors.confirmMail?.message}</span> }
        </div>
        }

        {/* Password */}
        <div className="input-wrapper">
          <div className={errors.password? 'invalid input-container' : 'input-container'}>
            <input placeholder=' ' {...register('password', {required:{value: true, message: 'Password is required'}})} />
            <label className='input-label'> password </label>
          </div>
            {errors.password && <span className='error-text'>{errors.password.message}</span>}
        </div>
        
        {/* repeat Password */}
        {touchedFields.password && watchPassword &&
        <div className="input-wrapper">
          <div className={errors.repeatPassword? 'invalid input-container' : 'input-container'}>
            <input placeholder=' ' {...register('repeatPassword', {required:{value: true, message: 'Password is required'}})} />
            <label className='input-label'> repeat password </label>
          </div>
            {errors.repeatPassword && <span className='error-text'>{errors.repeatPassword.message}</span>}
        </div>}



        {/* SUBMIT */}
        <div className="w-full">
          <input type="submit" className='btn block w-full' value="Register"/>
        </div>
      </form>
      <p className='text-center my-3'>
        You already have an account? <br/>
        <NavLink className="Link link-warning" to='/'>Log In</NavLink>
      </p>
      <DevTool control={control}/>
    </div>
  )
}
