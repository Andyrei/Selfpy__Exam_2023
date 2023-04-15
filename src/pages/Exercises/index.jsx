import React from 'react'
import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'

export default function Exercises() {
  return (
    <div>
      <h1 className='text-center text-xl underline'>Exercises</h1>
      <Outlet />
    </div>
  )
}
