import React, { useEffect } from 'react'
import useAuthContext from '../../context/AuthContext';

export default function Dashboard() {
  const {user, getUser } = useAuthContext();

  useEffect(()=>{
    getUser()
  },[])

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}
