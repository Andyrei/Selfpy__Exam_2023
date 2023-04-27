import React, { useEffect } from 'react'
import useAuthContext from '../../../context/AuthContext'
import { ReactSVG } from 'react-svg'
import icons from '../../../assets/icons/Icons'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

export default function ModifyUser() {
  const { userData, fetcher } = useAuthContext()
  const {register, handleSubmit, control, watch, reset, formState: {errors, isDirty} } = useForm();

  const modifyUser = async(id, data)=>{
    await fetcher(`/user/update-profile/${id}`,{
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: 'follow'
      })
      .then(res => {return res.json()})
      .then(data => {
        if(data){
          console.log("data received", data)
        }
      })
      .catch(error => console.log('error', error));
  }
  const { user } = userData

  /* 
    GET USER AND ADD ITTO CURRENT BECAUSE THE user VAR HAS id 
    AND OTHER FIELDS THAT WON'T BE SENT TO DB
  */

  useEffect(()=>{
    reset({
      description: user?.description,
      username: user?.username,
      name: user?.name,
      surname: user?.surname
    })
  },[userData])

  const onSubmit = (formData)=>{
    modifyUser(user?.id, formData)
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
          {/* Description */}
          <div className="input-wrapper">
            <label className=''> Description </label>
            <div className={errors.description ? 'input-container invalid' : 'input-container'}>
              <textarea placeholder='Add a description' className='w-full p-3 resize-none' 
                { ...register('description',
                  {
                    maxLength: {
                      value: 100,
                      message: "Should contain at least 5 characters"
                    }
                  }
                  )}></textarea>
                  <span className={`text-sm font-semibold ${watch('description')?.length > 100 && 'text-accentPrimary'}`}>{ watch('description') ? watch('description').length : '0' } / 100 max</span>
            </div>
            <FieldError errors={errors} field="description" />
          </div>
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
            <div className='input-container '>
              <label className='input-label'> Email: {user?.email} </label>
            </div>
          </div>
          {/* SUBMIT */}
          {isDirty&&<div className="w-full">
            <input type="submit" className='btn block w-full' value="Modify"/>
          </div>}
          
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