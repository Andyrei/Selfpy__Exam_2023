import React from 'react'
import { Route, Routes } from "react-router-dom";
import pages from '../../pages';
export default function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={<pages.Home />} />
     {/*  
        <Route path="dashboard" element={<Pages.Dashboard />} />
        <Route path="exercises" >
          <Route index element={<Pages.Exercises />}/>
          <Route path='abcschema' element={ <Pages.AbcSchema /> }/>
        </Route>
        <Route path="/statistics" element={<Pages.Statistics />} />
      */}
    
    </Routes>
  )
}
