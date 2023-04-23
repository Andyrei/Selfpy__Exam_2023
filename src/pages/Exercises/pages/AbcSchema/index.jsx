import React, { useState } from 'react'
import { ReactSVG } from 'react-svg'
import icons from '../../../../assets/icons/Icons'
import { NavLink } from 'react-router-dom'

export default function AbcSchema() {
  

  return (
    <>
      <div className="tabs tabs-boxed mx-auto w-fit">
        <NavLink className='tab tab-active'
          >Adversity</NavLink> 
        <NavLink className='tab' >Beliefs</NavLink> 
        <NavLink className='tab' >Feelings</NavLink>
      </div>
      <Adversity/>

      <div className="w-full">
        <button className='btn block mx-auto'>Finish exercise</button>
      </div>
    </>
  )
}

const Adversity = () =>{
  const [info, setInfo] = useState(true);

  return (
      <div className="w-[90%] my-10 mx-auto">
        {info && <div className="alert shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-secondary flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Adversity is the negative event that triggered your thoughts</span>
              <ReactSVG className='fill-secondary flex-shrink-0 cursor-pointer' src={icons.close} onClick={()=>{setInfo(false)}}/>
            </div>
          </div>
        }
        <textarea className="textarea textarea-secondary block my-7 w-full h-60 resize-none" placeholder="What happened?"></textarea>
      </div>
  )
}