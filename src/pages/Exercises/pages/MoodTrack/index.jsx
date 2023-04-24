import React from 'react'
import useAuthContext from '../../../../context/AuthContext'

export default function MoodTrack() {
  const {userData, cookies, getUserToken, setLogout } = useAuthContext()

  
  return (
    <div>
      Mood Track
    </div>
  )
} 