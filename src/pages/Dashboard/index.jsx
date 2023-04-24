import React, { useEffect, useState } from 'react'
import useAuthContext from '../../context/AuthContext';
import icons from '../../assets/icons/Icons';
import { ReactSVG } from 'react-svg';



export default function Dashboard() {

const [ motivational, setMotivational ] = useState();


async function getapi()
{
  const response = await fetch('https://zenquotes.io/api/random/',
  {
    method: 'get',
    'Access-Control-Allow-Origin': '*'
  });
  var data = await response.json();
  setMotivational(data);
}

useEffect(()=>{

  getapi();

},[])
/* const { userData } =useAuthContext(); */
const userData ={
  user:{
    username: 'pip.pluto',
    name: "Pippp",
    surname: "Pluto",
    mail: "pip@pluto.com",
    description: "Small description about me"
  }
} 
  return (
    <>
    <div className='py-7 px-6 bg-dark-darker rounded-b-3xl'>
      <div className='w-full flex justify-between'>
        <div className="">{userData?.user?.username}</div>
        <div className=""><ReactSVG src={icons.dash} /></div>
      </div>
      <div className="avatar block mb-5">
        <p className='text-white-dark text-center font-semibold mb-5 text-opacity-70'>PROFILE</p>
        <div className="w-24 mx-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2  ">
          <ReactSVG src={icons.user} className='stroke-primary_yellow'/>
        </div>
      </div>
      <div className="">        
        <p className="text-center">{userData?.user?.name} {userData?.user?.surname}</p>
        <p className="text-center text-sm text-white-dark text-opacity-60">{userData?.user?.description}</p>
      </div>
    </div>
    <div className='w-11/12 mx-auto my-5 rounded-3xl overflow-clip relative'>
      <div className="">
        <img src="https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG1vdGl2YXRpb25hbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" className='w-full h-auto' />
      </div>
      <div className=' bg-dark-darker w-full h-full bg-opacity-50 absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-content-center'>
          {motivational && <div>
            {motivational.q}
          </div>
          }
      </div>
    </div>
  </>
  )
}
