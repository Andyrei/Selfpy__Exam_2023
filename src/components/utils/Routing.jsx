import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext';
import { Route, Routes } from "react-router-dom";
import pages from '../../pages';


export default function Routing() {
  const user = useContext(UserContext)

  return (
    <Routes>
      <Route exact path="/login">
        {user.token? <Redirect to="/"/> : <Route path='/login' element={<pages.Home />} />}
      </Route>

        <Route path="/" element={<pages.Dashboard />} />
        <Route path="exercises" >
          <Route index element={<pages.Exercises />}/>
          <Route path='abcschema' element={ <pages.AbcSchema /> }/>
        </Route>
        <Route path="/statistics" element={<pages.Statistics />} />

    </Routes>
  )
}
