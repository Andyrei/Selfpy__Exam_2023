import React, { useState } from 'react'
import './FormStyle.css'

import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools';
import { NavLink } from 'react-router-dom';
import useAuthContext from '../../../context/AuthContext';

export default function Register() {
  const {register, handleSubmit, control, setError, watch, formState: {errors, touchedFields} } = useForm();
  const {registerUser ,emailPattern} = useAuthContext()

  const onSubmit =  (dataForm) =>{
    registerUser(setError, dataForm);
	};

  return (
    <div className='form-container'>
      <h1 className='Page-Title'>Register</h1>

      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <div className="input-wrapper">        
          <div className={errors.username ? 'input-container invalid' : 'input-container'}>
            <input placeholder=' ' {
              ...register('username',
                {
                  required: {
                    value: true,
                    message: 'Username is required'
                  },
                  pattern: {
                    value: /^[a-zA-Z_.]+[0-9]{0,3}$/,
                    message: 'Can only use "_"or "." as a special character / no spaces / no more than 3 numbers'
                  },
                  minLength: {
                    value: 5,
                    message: "Should contain at least 5 characters"
                  }
                }
                )} />
            <label className='input-label'> username </label>
          </div>
          <FieldError errors={errors} field="username" />
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
          <FieldError errors={errors} field="name" />
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
          <FieldError errors={errors} field="surname" />
        </div>

        {/* Mail */}
        <div className="input-wrapper">        
          <div className={errors.email ? 'input-container invalid' : 'input-container'}>
            <input placeholder=' ' {
              ...register('email',
                {required: {
                  value: true,
                  message: 'Email is required',
                },
                  pattern: {
                    value: emailPattern,
                    message: 'Email is not correct'
                  }
                })} />
            <label className='input-label'> email </label>
          </div>
          <FieldError errors={errors} field="email" />
        </div>

        {/* Password */}
        <div className="input-wrapper">
          <div className={errors.password? 'invalid input-container' : 'input-container'}>
            <input placeholder=' ' {...register('password', 
                {
                  required:{value: true, message: 'Password is required'}
                }
              )} />
            <label className='input-label'> password </label>
          </div>
          <FieldError errors={errors} field="password" />
        </div>
        
        {/* repeat Password */}
        {watch('password') && touchedFields.password &&
            <div className="input-wrapper">
              <div className={errors.password_confirmation ? 'invalid input-container' : 'input-container'}>
                <input placeholder=' ' {...register('password_confirmation', {required:{value: true, message: 'Password confirmation is required'}})} />
                <label className='input-label'> repeat password </label>
              </div>
              <FieldError errors={errors} field="password_confirmation" />
            </div>
        }



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

const FieldError = ({errors, field}) => {
	return errors[field] && (
		errors[field].types ? 
		Object.values(errors[field].types).map((error, i) => (
			<span key={i} className="error-text">
				{error}
			</span>
		))
		:
		<span className="error-text">
			{errors[field].message}
		</span>
	)
}