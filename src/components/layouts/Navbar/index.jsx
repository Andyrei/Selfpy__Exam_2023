import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/userContext'

import './Navbar.css'
import { ReactSVG } from 'react-svg'
import { NavLink } from 'react-router-dom'
import { set } from 'react-hook-form'
import icons from '../../../assets/icons/Icons'


export default function Navbar() {
  const [addExercise, setAddExercise] = useState(false)
  const user = useContext(UserContext)

  const clickAdd = (e) => {
    e.preventDefault()
    setAddExercise(!addExercise)
  }
  return (
    <>
      <div className="w-full shadow-lg">
        <div className=" navbar p-5">
          <div className="navbar-start">
            <a href="/">
              <ReactSVG className='w-20' src={ icons.logoEy } />
            </a>
          </div>
          <div className="navbar-center">
            {user.name}
          </div>
          <div className="navbar-end">
              <ReactSVG className="btn btn-ghost btn-circle" tabIndex={0} src={ icons.userIcon } />
          </div>
        </div>
      </div>

      {/* MOBILE MENU /W FAB ONLY ON AUTH */}
      {user.token&&
        <div className="navbar-bottom-container md:hidden">
          <div className="navbar-bottom-tabs">
            <div className="navbar-tab navbar-tab-left">
                <ReactSVG className='w-1/4' src={ icons.pieChart } />
            </div>
            <div className="navbar-tab navbar-tab-center">
              <button onClick={clickAdd} className='flex justify-center'>
              {!addExercise ?  <ReactSVG className='fab' src={ icons.plusIcon } /> :  <ReactSVG className='fab' src={ icons.signalIcon } />}
              </button>
            </div>
            <div className="navbar-tab navbar-tab-right">
                <ReactSVG className='w-1/4' src={ icons.userIcon } />
            </div>
          </div>
        </div>
      }
    </>
  )
}
