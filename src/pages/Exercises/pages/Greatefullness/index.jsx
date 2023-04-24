import React, { useEffect, useState } from 'react'
import axios from '../../../../api/fetcher'



export default function Greatefullness() {
  const [navs, setNavs ]= useState()
  const [isLoading, setLoading ] = useState(false)

/*   const fetchNav = async() => {
    try {
      setLoading(true);
      const response = await axios.get('/exercises')
      const navLinks =response.data
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
  
  if(isLoading) return <div>Loading.. </div> */
  
  return (
    <div>
{/*       {navs && (
        <ul>
          {navs.map(nav => (
              <li key={nav.id}>{nav.name}</li>
            ))}
        </ul>
      )} */}
    </div>
  )
}

