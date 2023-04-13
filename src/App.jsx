import { useState } from 'react'
import {  Route, Routes } from "react-router-dom";
import Navbar from './components/layouts/Navbar'
import Dashboard from './pages/Dashboard'
import Statistics from './pages/Statistics'
import Exercises from './pages/Exercises';
import Home from './pages/Home'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/exercises" element={<Exercises />} >\
            <Route index element={<>LISTA</>}/>
            <Route path=':id' element={<>EXID</>}/>
          </Route>
          <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </>
  )
}

export default App
