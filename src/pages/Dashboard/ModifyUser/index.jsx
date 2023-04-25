import React, { useEffect } from 'react'
import useAuthContext from '../../../context/AuthContext'
import { ReactSVG } from 'react-svg'
import icons from '../../../assets/icons/Icons'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

export default function ModifyUser() {
  const { userData, emailPattern } = useAuthContext()
  const {register, handleSubmit, control, reset, watch, formState: {errors, touchedFields} } = useForm();
  useEffect(()=>{
    console.log(userData.user)
    reset(userData.user)
  },[])
  const onSubmit = ()=>{

  }
  return (
    <>
      <DevTool control={control}/>
      <a href="/" className='p-5 block btn-circle'><ReactSVG className='w-7' src={icons.back}/></a>
      <section className='w-full flex p-5 justify-around content-center'>
        <div className="grid place-content-center">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2  ">
            <ReactSVG src={icons.user} className='stroke-primary_yellow'/>
          </div>
        </div>
        <div className='w-1/2 flex flex-col gap-7'>
          <button className='btn btn-primary'>Upload new</button>
          <button className='btn btn-outline'>Remove</button>
        </div>
      </section>
      <section className="form-container">
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
      </section>
    </>
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