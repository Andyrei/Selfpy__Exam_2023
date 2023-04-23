import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Exercises() {
  return (
    <div className='py-10 ' >
      <Outlet />
    </div>
  )
}
