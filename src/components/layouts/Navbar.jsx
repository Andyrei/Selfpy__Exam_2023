import React from 'react'
import { ReactSVG } from 'react-svg'
import { NavLink } from 'react-router-dom'
import navIcon from '../../assets/icons/NavIcon.svg'
import logoEy from '../../assets/icons/logo_EY_yellow.svg'
import dashIcon from '../../assets/icons/dashboard.svg'



export default function Navbar() {
  
  return (
    <>
      <div className="w-full shadow-lg">
        <div className=" navbar p-5">
          <div className="navbar-start">
            <a href="/">
              <ReactSVG className='w-20' src={ logoEy } />
            </a>
          </div>
          <div className="navbar-center">
          </div>
          <div className="navbar-end">
              <ReactSVG className="btn btn-ghost btn-circle" tabIndex={0} src={ navIcon } />
          </div>
        </div>
      </div>
      {/* MENU ON MOBILE */}
      <div className="menu-mobile md:hidden">
          <ul>
            <li>
              <NavLink to="/exercises" >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </NavLink>
            </li>
            <li>
              <NavLink to='/dashboard'>
                <ReactSVG className='w-6' src={ dashIcon }/>
              </NavLink>
            </li>
            <li>
              <NavLink to='/statistics'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </NavLink>
            </li>
          </ul>    
      </div>
    </>
  )
}
