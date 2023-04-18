import React, { useState } from 'react'
import './FormStyle.css'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools';

export default function Home() {
  const {register, handleSubmit, control, watch, formState: {errors} } = useForm();
  
  const initialVurrentUserValue = {id: '', username: '', password:''};
  const {user, setUser} = useState(initialVurrentUserValue);

  const onSubmit = (data) =>{
    console.log(data)
  }

  return (
    <div className='form-container'>
      <h1 className='Page-Title'>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <input type="submit" className='btn block mx-auto' value="Register"/>
          </div>
      </form>
      <DevTool control={control}/>
    </div>
  )
}
