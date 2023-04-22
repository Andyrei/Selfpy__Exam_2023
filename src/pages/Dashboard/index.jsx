import React, { useEffect } from 'react'
import useAuthContext from '../../context/AuthContext';

export default function Dashboard() {

const { userData } =useAuthContext();
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>CIAO {userData?.user?.name}</h2>
    </div>
  )
}
