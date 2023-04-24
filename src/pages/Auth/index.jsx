import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../../components/layouts/Navbar'
import useAuthContext from '../../context/AuthContext'

export default function Auth() {
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  )
}
