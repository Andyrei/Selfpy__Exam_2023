import React, { useEffect, useState } from 'react'
import useLoading from '../../../hooks/useLoading';


export default function Motivational() {
  const [ motivational, setMotivational ] = useState();
  const [ img, setImg  ] = useState();
  const {setIsLoading, LoadingElement} = useLoading()
  const API_KEY = import.meta.env.VITE_API_NINJA_KEY
  
  
  async function getQuote()
  {
    setIsLoading(true)
    await fetch("https://api.api-ninjas.com/v1/quotes?category=happiness",{
      method: 'get',
      headers: {
        'X-Api-Key': API_KEY
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

  /* NOT WORKING REQUEST FULFILLED BUT NO URL SUGGESTION: imageBase64  */
  async function getImg(){
    setIsLoading(true)
    await fetch("https://api.api-ninjas.com/v1/randomimage?category=nature",{
      method: 'get',
      headers: {
        'X-Api-Key': API_KEY,
        'Accept': 'image/jpg'
      }
    })
    .then(result=>{
      if(result.status) return result.blob()
    }).then(data => {setImg(URL.createObjectURL(data))})

    .catch((er)=>{
      console.log(er) 
      setIsLoading(false)
    })
  }

  useEffect(()=>{
    getQuote();
    getImg();
    console.log(img)
  },[])

  return (
    <LoadingElement>
        <div className='w-11/12 mx-auto my-5 rounded-3xl overflow-clip relative'>
          <div className="">
            <img src={img} />
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
