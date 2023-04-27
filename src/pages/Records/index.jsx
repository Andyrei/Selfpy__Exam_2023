import React, { useEffect, useState } from 'react'
import useAuthContext from '../../context/AuthContext' 
import { Blocks } from  'react-loader-spinner'

export default function Statistics() {
  const [exercises, setExercises]= useState()
  const { userData, fetcher } = useAuthContext()
  const [pageLoading, setPageLoading ] = useState(true)


  const getExercises = ()=>{
    setPageLoading(true)
    fetcher('/userexercises',{
      method:'GET',
      headers: {  
        'content-type': 'application/json' 
      }
    })
    .then(r => { return r.json()})
    .then(data=>{
      console.log(data)
      if(data) {
        setExercises(data)
        setPageLoading(false)
      }
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


if(pageLoading) return <div className="grid w-full h-screen place-content-center">
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      </div>

  return (
    <>
      <h1 className='font-mono text-4xl underline underline-offset-8 text-center p-6'>RECORDS</h1>
        <div className='mx-auto  w-fit'>
          {exercises.length != 0 ? exercises?.slice(0).reverse().map((v,k)=>{
              return(<React.Fragment key={k}>
                <div className="card w-96 my-9 bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">From: <span className="uppercase">{(v.name).replace('_', ' ')}</span></h2>
                        {
                        Object.entries(JSON.parse(v.pivot.data)).map((val, key)=>{
                          return<div key={key} className="">
                            <span className='capitalize text-sm text-white-dark text-opacity-50 mr-6 '>{val[0][0]}: </span>
                            <span className=""> {val[1]}</span>
                          </div>
                        })
                        }
                    <div className="card-actions justify-between content-center">
                      <div className="mt-auto"> 
                        {formatDate(new Date(v.pivot.created_at))}                    
                      </div>
                      <div className="flex gap-6">
                        <a href='' className="btn btn-outline">Delete</a>
                        <a href='' className="btn btn-primary">Modify</a>
                      </div>
                    </div>
                  </div>
                </div>
                </React.Fragment>
              )
            }) : 
            <>
              <div className="w-full grid place-content-center h-[70vh]">
                <h3 className='text-center font-mono text-2xl'>No records yet...</h3>
              </div>
            </>}
        </div>
    </>
  )
}
