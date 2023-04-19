import React, { useContext } from 'react'
import { UserContext } from '../context/userContext';
import { Route, Routes } from "react-router-dom";
import pages from '../../pages';


export default function Routing({curentUser, setCurentUser, registerUser}) {


  return (
    <Routes>
      <Route exact path="/login" element={<pages.Login />} />
      <Route exact path="/register" element={<pages.Register curentUser={curentUser} setCurentUser={setCurentUser} registerUser={registerUser}/>} />

        <Route path="/" element={<pages.Dashboard />} />
        <Route path="exercises" >
          <Route index element={<pages.Exercises />}/>
          <Route path='abcschema' element={ <pages.AbcSchema /> }/>
        </Route>
        <Route path="/statistics" element={<pages.Statistics />} />

    </Routes>
  )
}
