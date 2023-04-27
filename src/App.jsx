import React, {  useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import useAuthContext from './context/AuthContext';
import pages from './pages';
import Footer from "./components/layouts/Footer";
import PrivateRoute  from './utils/PrivateRoute';

function App() {
  const { userData, cookies,  getUserToken } = useAuthContext()

/* THIS ONE IS GETTING THE USER TOKEN ONLY IF HE LOGGED IN!! */
  useEffect(()=>{
    getUserToken()
  },[])

  return (
    <>  
        <h1 className='text-6xl text-center font-bold font-mono hidden md:block'>THIS WEBSITE IS VISIBLE FOR SMALL SCREENS ONLY</h1>
        
        <main className={`main-container md:hidden ${!cookies['auth_token'] && 'max-h-full'}`}>
          <Routes>
            <Route element={<pages.Auth />}>
              <Route index path="/login" element={<pages.Login />} />
              <Route path="/register" element={<pages.Register />} />
            </Route>
              <Route path="/" element={<PrivateRoute> <pages.Dashboard /> </PrivateRoute>} />
              <Route path='/modify' element={<PrivateRoute>< pages.ModifyUser/></PrivateRoute>}/>
              <Route element={<PrivateRoute><pages.Exercises /></PrivateRoute>}>
                <Route index path='abc_schema' element={<PrivateRoute> <pages.AbcSchema /> </PrivateRoute>}/>
                <Route path='mood_track' element={<PrivateRoute><pages.MoodTrack /></PrivateRoute>}/>
                <Route path='gratefulness' element={<PrivateRoute><pages.Gratefulness /></PrivateRoute>}/>
              </Route>
              <Route path="/records" element={<PrivateRoute><pages.Records /></PrivateRoute>} />
              <Route path="/appointments" element={<PrivateRoute><pages.Appointments /></PrivateRoute>} />
          
          </Routes>
        </main>

        {cookies['auth_token'] && <div className="w-full bg-dark">
          <Footer />
        </div>}
    </>
  )
}

export default App
