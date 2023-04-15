import React, { useState } from 'react'
import './FormStyle.css'
import { useForm } from 'react-hook-form'

export default function Home() {
  const {register, handleSubmit, watch, formState: {errors} } = useForm();
  
  const initialVurrentUserValue = {id: '', username: '', password:''};
  const {user, setUser} = useState(initialVurrentUserValue);

  const onSubmit = (e) =>{
    watch
  }

  return (
    <div className='form-container'>
      <h1 className='Page-Title'>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">        
          <input placeholder=' ' {...register('username', {required:true})} />
          <label className='input-label'> username </label>
          {errors.name && <span className='bg-error-content'>Field username missing</span>}
        </div>
        <div className="input-container">        
          <input placeholder=' ' {...register('password', {required:true})} />
          <label className='input-label'> password </label>
          {errors.name && <span className='bg-error-content'>Field username missing</span>}
        </div>


          <div className="w-full">
            <input type="submit" className='btn block mx-auto' value="Register"/>
          </div>
      </form>
    </div>
  )
}
