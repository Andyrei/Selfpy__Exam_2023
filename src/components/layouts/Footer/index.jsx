import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import icons from '../../../assets/icons/Icons'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useAuthContext from '../../../context/AuthContext'
import axios from './../../../api/fetcher'
import useLoading from '../../../hooks/useLoading'

export default function Footer() {
  const {register, watch} = useForm()

  const [navs, setNavs ]= useState()

  const fetchNav = async() => {
    try {
      const response = await axios.get('/exercises')
      const navLinks =response.data
      if(navLinks) setNavs(navLinks)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    console.log('component mounted')
    fetchNav()
  },[])
  
  

  return (
    <>
      {/* MOBILE MENU /W FAB ONLY ON AUTH */}
      <div className="navbar-bottom-container md:hidden">
          <div className="navbar-bottom-tabs">
            <div className="navbar-tab navbar-tab-left">
                <NavLink className='w-1/4' to='/statistics'><ReactSVG className='' src={ icons.pieChart } /></NavLink>
            </div>
            <div className="navbar-tab navbar-tab-center relative">
            {navs && (
              <ul className={`absolute -translate-y-[90%] -top-3/4 w-[300px] menu bg-base-200 bg-opacity-70 text-center ${watch('check') ? 'visible': 'hidden'} `}>

                {navs.map(nav => (
                    <li key={nav.id}>
                      <NavLink className='Link' to={nav.name}>{
                        JSON.parse(nav.data).map(e=>{
                          return e.title
                        })
                      }
                      </NavLink>
                      </li>
                  ))}
              </ul>
            )}
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
