import './Navbar.css'
import React from 'react'
import icons from '../../../assets/icons/Icons'
import { ReactSVG } from 'react-svg'


export default function Navbar() {

  return (
    <>
      <div className="w-full shadow-lg">
        <div className=" navbar p-5">
          <div className="navbar-start">
          </div>
          <div className="navbar-center">
            <a href="/">
              <ReactSVG className='w-20' src={ icons.logoEy } />
            </a>
          </div>
          <div className="navbar-end">
          </div>
        </div>
      </div>
    </>
  )
}
