import {  useEffect, useState } from "react";
import Navbar from './components/layouts/Navbar'
import Routing from './components/utils/Routing';
import useAuthContext, { AuthProvider } from './context/AuthContext';


function App() {
  const {userData, getUserToken, setLogout } = useAuthContext()


/* THIS ONE IS GETTING THE USER TOKEN ONLY IF HE LOGGED IN!! */
  useEffect(()=>{
    getUserToken()
  },[])

  return (
    <>
    
        <Navbar userData={userData} setLogout={setLogout}/>
        <main className='w-full h-screen flex justify-center'>
          <Routing />
        </main>
    </>
  )
}

export default App
