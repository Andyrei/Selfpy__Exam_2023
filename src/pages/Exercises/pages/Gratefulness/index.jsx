import React, { useEffect, useState } from 'react'
import useAuthContext from '../../../../context/AuthContext'
import axios from 'axios'


export default function Gratefulness() {
const {cookies} = useAuthContext()
  const { fetcher, userData } = useAuthContext()
  const [navs, setNavs ]= useState()
  const [isLoading, setLoading ] = useState(false)

  const fetchNav = async() => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/exercises',
      {
        headers: {
          Accept: "application/json", 
          Authorization: `Bearer ${userData.token}`,
          "Content-type": "application/json"
        }
      })
      const navLinks =response.data
      console.log(navLinks)
      if(navLinks) setNavs(navLinks)
      
    }catch(err){
      console.log(err)
    }
    setLoading(false)
  }
  useEffect(()=>{
    console.log('component mounted')
    fetchNav()
  },[])
  
  if(isLoading) return <div>Loading.. </div>
  
  return (
    <div>
      {navs && (
        <ul>
          {navs.map(nav => (
              <li key={nav.id}>{nav.name}</li>
            ))}
        </ul>
      )}
    </div>
  )
}

