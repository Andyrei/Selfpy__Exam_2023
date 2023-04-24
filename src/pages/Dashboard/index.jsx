import React from 'react'
import useAuthContext from '../../context/AuthContext';
import icons from '../../assets/icons/Icons';
import { ReactSVG } from 'react-svg';
import Motivational from './components/Motivational';
import { NavLink } from 'react-router-dom';



export default function Dashboard() {



const { userData, setLogout } =useAuthContext();

  return (
    <>    
    <div className='py-7 px-6 bg-dark-darker rounded-b-3xl'>
      <div className='w-full flex justify-between'>
        <div className="">{userData?.user?.username}</div>
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle"><ReactSVG src={icons.dash} /></label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>{ userData.token && 
                <button onClick={setLogout} className="text-sm  text-blue-600 hover:underline">Logout</button>}</li>
            <li><a href='/modify' className="text-sm  text-blue-600 hover:underline">Modify</a></li>
          </ul>
        </div>
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
    
    <Motivational/>

    <div className="flex px-5 justify-between gap-6 flex-wrap">
          <div className="relative w-fit mx-auto rounded-3xl overflow-hidden">
            <div className='w-full h-1/3 absolute bottom-0 -z-30 bg-primary_yellow opacity-40'></div>
            <div className="card py-20 glass">
              <ReactSVG src={icons.clock} className='w-50 top-1/2 -translate-y-1/2 absolute -z-10 opacity-50'/>
              <div className="card-body w-full text-center">
                <h2 className="text-2xl font-bold">Records</h2>
                <p>You can find exercises performed</p>
              </div>
              <div className="card-actions justify-center">
                <NavLink to='/records' className="btn btn-secondary text-dark-darker text-xl">Check out</NavLink>
              </div>
            </div>
          </div>
          <div className="relative w-fit mx-auto rounded-3xl overflow-hidden">
            <div className='w-full h-1/3 absolute bottom-0 -z-30 bg-primary_yellow opacity-40'></div>
            <div className="card py-20 glass">
              <ReactSVG src={icons.calendar} className='w-50 top-1/2 -translate-y-1/2 absolute -z-10 opacity-50'/>
              <div className="card-body w-full text-center">
                <h2 className="text-2xl font-bold">Appointments</h2>
                <p>You can find therapy appointments</p>
              </div>
              <div className="card-actions justify-center">
                <NavLink to='/appointments' className="btn btn-secondary text-dark-darker text-xl">Check out</NavLink>
              </div>
            </div>
          </div>

    </div>
  </>
  )
}
