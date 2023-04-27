import React from 'react'
import useAuthContext from '../context/AuthContext'
import { Navigate } from 'react-router'

export default function PrivateRoute({children}) {
  const { cookies } = useAuthContext()
  if(!cookies['auth_token']) return <Navigate to='/login'/>
  return cookies['auth_token']? children : <Navigate to='/login'/>
}
