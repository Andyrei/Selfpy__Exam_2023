import React from 'react'
import { ReactSVG } from 'react-svg'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

import userIcon from '../../../assets/icons/userIcon.svg'
import navIcon from '../../../assets/icons/NavIcon.svg'
import logoEy from '../../../assets/icons/logo_EY_yellow.svg'
import dashIcon from '../../../assets/icons/dashboard.svg'
import infoIcon from '../../../assets/icons/infoIcon.svg'
import signalIcon from '../../../assets/icons/signalIcon.svg'
import pieChart from '../../../assets/icons/pieChart.svg'
import plusIcon from '../../../assets/icons/plusIcon.svg'


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
              <ReactSVG className="btn btn-ghost btn-circle" tabIndex={0} src={ userIcon } />
          </div>
        </div>
      </div>


      {/* MOBILE MENU /W FAB */}
      <div className="navbar-bottom-container">
        <div className="navbar-bottom-tabs">
          <div className="navbar-tab navbar-tab-left">
              <ReactSVG className='w-1/4' src={ pieChart } />
          </div>
          <div className="navbar-tab navbar-tab-center">
            <ReactSVG className='fab' src={ plusIcon } />
          </div>
          <div className="navbar-tab navbar-tab-right">
              <ReactSVG className='w-1/4' src={ userIcon } />
          </div>
        </div>
      </div>

    </>
  )
}
