import React, { useEffect, useRef, useState } from 'react'
import { ReactSVG } from 'react-svg'
import icons from '../../../../assets/icons/Icons'
import useAuthContext from '../../../../context/AuthContext';
import fetcher from '../../../../api/fetcher';
import useLoading from '../../../../hooks/useLoading';
import { useForm } from 'react-hook-form';

  
export default function AbcSchema() {

/* FETCH THE EXERCISE DATA */
  const [exercise, setExercise] = useState()
  const {setIsLoading, LoadingElement} = useLoading()

  const fetchExercise = async()=>{
    setIsLoading(true)
    await fetcher.get('/exercises/1')
    .then((res)=>{
      if(res.status) {
        JSON.parse(res.data.data).map(e=>{return setExercise(e)})
        setIsLoading(false)
      }
    })

  }
  useEffect(() => {
    fetchExercise()
  },[])


/* WORK WITH ITS DATA */
  const {register, handleSubmit, control} = useForm()
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id)
  }
  const sendData =(e)=> {

  }
  return (
    <LoadingElement>
      <div className="relative">
        <h1 className='text-3xl text-center underline underline-offset-8 mb-10'> {exercise?.title} </h1>
        <div className="tabs tabs-boxed mx-auto w-fit">
            {
              exercise && exercise.its_data.map((v, k)=>{
                return <button 
                          id={k}
                          key={k} 
                          className={`tab uppercase font-semibold text-md ${currentTab == k ? 'tab-active' : ''}`}
                          onClick={(handleTabClick)}
                          >
                        { v.label }
                      </button>
              })
            }
        </div>
        <div className="content_tab">
          <form onClick={handleSubmit(sendData)}>
            {exercise && exercise.its_data.map((v, k)=>{
                  return <SingleExercise key={k} idX={k} currentTab={currentTab} info={v.info} label={v.label}/>
              })
            }
          </form>
        </div>
      </div>

      <div className='w-fu'><button className='btn mx-auto block'>Finish Exercise</button></div>
    </LoadingElement>
  );

}

/*  FETCH POST MISSING
    TABS WORKING
*/

const SingleExercise = ({info, label,currentTab, idX}) =>{
  const [infoAlert, setInfoAlert] = useState(true); /* TURNS ON/OFF THE INFO ALERT */
    return <div className={`w-[90%] my-10 mx-auto ${currentTab == idX ? 'block' : 'hidden'}`}>
        {infoAlert && <div className="alert shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-secondary flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>{info}</span>
              <ReactSVG className='fill-secondary flex-shrink-0 cursor-pointer' src={icons.close} onClick={()=>{setInfoAlert(false)}}/>
            </div>
          </div>
        }
        <textarea className="textarea textarea-secondary block my-7 w-full h-60 resize-none" placeholder={`Write here the ${label}!`}></textarea>
    </div>
  }