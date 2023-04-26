import React, {  useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import useAuthContext from './context/AuthContext';
import pages from './pages';
import Footer from "./components/layouts/Footer";
import PrivateRoute from './utils/PrivateRoute';


function App() {
  const {cookies, getUserToken } = useAuthContext()


/* THIS ONE IS GETTING THE USER TOKEN ONLY IF HE LOGGED IN!! */
  useEffect(()=>{
    getUserToken()
  },[])
  
  return (
    <>  
        <h1 className='text-6xl text-center font-bold font-mono hidden md:block'>THIS WEBSITE IS VISIBLE FOR SMALL SCREENS ONLY</h1>
        <main className='main-container md:hidden'>
          <Routes>
            <Route element={<pages.Auth />}>
              <Route index path="/login" element={<pages.Login />} />
              <Route path="/register" element={<pages.Register />} />
            </Route>
            
            <Route path="/" element={<PrivateRoute> <pages.Dashboard /> </PrivateRoute>} />
            <Route path='/modify' element={<PrivateRoute>< pages.ModifyUser/></PrivateRoute>}/>
            <Route element={<pages.Exercises />}>
              <Route index path='abc_schema' element={<PrivateRoute> <pages.AbcSchema /> </PrivateRoute>}/>
              <Route path='mood_track' element={<PrivateRoute><pages.MoodTrack /></PrivateRoute>}/>
              <Route path='gratefulness' element={<PrivateRoute><pages.Gratefulness /></PrivateRoute>}/>
            </Route>
            <Route path="/records" element={<PrivateRoute><pages.Records /></PrivateRoute>} />
            <Route path="/appointments" element={<PrivateRoute><pages.Records /></PrivateRoute>} />
          
          
          </Routes>
        </main>

        {cookies['auth_token'] && <Footer />}
    </>
  )
}

export default App
