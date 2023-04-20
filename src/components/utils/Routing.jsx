import React from 'react'
import { Route, Routes } from "react-router-dom";
import pages from '../../pages';


export default function Routing({curentUser, setCurentUser, registerUser}) {

  return (
    <Routes>
      <Route path="/" element={<pages.Login />} />
      <Route path="/register" element={<pages.Register/>} />

      <Route path="/profile" element={<pages.Dashboard />} />
      <Route path="exercises" >
        <Route index element={<pages.Exercises />}/>
        <Route path='abcschema' element={ <pages.AbcSchema /> }/>
      </Route>

      <Route path="/statistics" element={<pages.Statistics />} />
    </Routes>
  )
}