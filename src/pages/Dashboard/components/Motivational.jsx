import React, { useEffect, useState } from 'react'
import useLoading from '../../../hooks/useLoading';


export default function Motivational() {
  const [ motivational, setMotivational ] = useState();
  const {setIsLoading, LoadingElement} = useLoading()

  async function getQuote()
  {
    setIsLoading(true)
    await fetch("https://api.api-ninjas.com/v1/quotes?category=happiness",{
      method: 'get',
      headers: {
        'X-Api-Key': 'mXZQT7LdG74IHwCHGmiakQ==0hysFn0bQFXuCSjO'
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      setMotivational(data)
      setIsLoading(false)
    }).catch((er)=>{
      console.log(er) 
      setIsLoading(false)
    })
  }

  useEffect(()=>{
    getQuote();
  },[])

  return (
    <LoadingElement>
        <div className='w-11/12 mx-auto my-5 rounded-3xl overflow-clip relative'>
          <div className="">
            <img src="https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG1vdGl2YXRpb25hbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" className='w-full h-auto' />
          </div>
          <div className=' bg-dark-darker w-full h-full bg-opacity-70 absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-content-center'>
              {motivational?.map((v, i)=>{
                  return (
                        <div key={i}>
                        <p className='text-center text-xl'>{v.quote}</p>
                        <p className='text-sm mt-5'>@ {v.author}</p>
                        </div>
                    )
                })
              }
          </div>
        </div>
    </LoadingElement>
  )
}
