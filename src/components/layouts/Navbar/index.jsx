import React, { useState } from 'react'
import icons from '../../../assets/icons/Icons'

import './Navbar.css'
import { ReactSVG } from 'react-svg'
import { NavLink } from 'react-router-dom'


export default function Navbar({userData, setLogout}) {

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
          </div>
          <div className="navbar-end">
              {/* <ReactSVG className="btn btn-ghost btn-circle" tabIndex={0} src={ icons.userIcon } /> */}
              {
                userData.token && 
                <button onClick={setLogout} className="text-sm  text-blue-600 hover:underline">Logout</button>
						  }
          </div>
        </div>
      </div>
    </>
  )
}
