import React, { useEffect, useState } from 'react'
import useAuthContext from '../../context/AuthContext'

export default function Statistics() {
  const [exercises, setExercises]= useState()
  const { userData, fetcher } = useAuthContext()

  
  const getExercises = ()=>{
    fetcher('/userexercises',{
      method:'GET',
      headers: {  
        'content-type': 'application/json' 
      }
    })
    .then(r => { return r.json()})
    .then(data=>{
      console.log(data)
      if(data) setExercises(data)
    })
  }
  
  useEffect(()=>{
    if(userData.token) getExercises();
  }, [userData])
  
  const formatNumbers = function(num) {
    return num < 10 ? "0" + num : num;
  }
  const formatDate = function (date){
    let day = formatNumbers(date.getDate());
    let month = formatNumbers(date.getMonth() + 1);
    let year = date.getFullYear()
    return day + '-' +  month + '-' + year
  }
  return (
    <>
      <h1>RECORDS</h1>
        <div className='mx-auto flex flex-wrap'>
          {
          exercises?.slice(0).reverse().map((v,k)=>{
              return(<React.Fragment key={k}>

                <div className="card w-96 my-9 bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">{formatDate(new Date(v.created_at))}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                      <a href='' className="btn btn-primary">Modify</a>
                    </div>
                  </div>
                </div>
              
              </React.Fragment>)
          })
        }
        </div>
    </>
  )
}
