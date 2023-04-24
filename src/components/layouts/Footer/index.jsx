import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import icons from '../../../assets/icons/Icons'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useAuthContext from '../../../context/AuthContext'

export default function Footer() {
  const {register, watch} = useForm()
  const { fetcher, userData } = useAuthContext()
  const [nav, setNav ]= useState(null)

  useEffect(()=>{
      fetcher('/exercises',{
        method: "get",
        headers: {
          "content-type":"application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data) {
          setNav(data);
        }
      })
      .catch(err => console.log(err))
    },[userData])
  
    
  return (
    <>
      {/* MOBILE MENU /W FAB ONLY ON AUTH */}
      <div className="navbar-bottom-container md:hidden">
          <div className="navbar-bottom-tabs">
            <div className="navbar-tab navbar-tab-left">
                <NavLink className='w-1/4' to='/statistics'><ReactSVG className='' src={ icons.pieChart } /></NavLink>
            </div>
            <div className="navbar-tab navbar-tab-center relative">
              <ul className={`absolute -translate-y-[90%] -top-3/4 w-[300px] menu bg-base-200 bg-opacity-70 text-center ${watch('check') ? 'visible': 'hidden'} `}>
                    <li><NavLink className='Link' to='/moodtrack'>Mood track</NavLink></li>
                    <li><NavLink className='Link' to='/gratefulness'>Gratefulness</NavLink></li>
                    <li><NavLink className='Link' to='/abcschema'>ABC Schema</NavLink></li>
              </ul>
              <label className="fab swap swap-rotate">
                {/* <!-- this hidden checkbox controls the state --> */}
                <input type="checkbox" {...register('check', {checked: true/false, })}/>
                {/* <!-- hamburger icon --> */}
                <ReactSVG className="swap-off" src={icons.plus}/>
                {/* <!-- close icon --> */}
                <ReactSVG className="swap-on" src={icons.minus}/>           
              </label>
            </div>
            <div className="navbar-tab navbar-tab-right">
                <NavLink className='w-1/4' to='/' ><ReactSVG  src={ icons.user } /></NavLink>
            </div>
          </div>
        </div>
  </>
  )
}
