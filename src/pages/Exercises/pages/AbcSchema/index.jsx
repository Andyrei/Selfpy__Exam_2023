import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import icons from '../../../../assets/icons/Icons'
import useAuthContext from '../../../../context/AuthContext';
import caller from '../../../../api/fetcher';
import useLoading from '../../../../hooks/useLoading';
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

  
export default function AbcSchema() {

/* FETCH THE EXERCISE DATA */
  const [exercise, setExercise] = useState()
  const {setIsLoading, LoadingElement} = useLoading()
  const [postExercise, setPostExercise] = useState()
  const {fetcher} = useAuthContext()

  const fetchExercise = async()=>{
    setIsLoading(true)
    await caller.get('/exercises/1')
    .then((res)=>{
      if(res.status) {
        setPostExercise(res.data)
        JSON.parse(res.data.data).map(e=>{return setExercise(e)})
        setIsLoading(false)
      }
    })

  }
  useEffect(() => {
    fetchExercise()
  },[])
  

  /* POST EXERCISE */
  const [loaderPost, setLoaderPost] = useState(false)
  const [serverMessage, setServerMessage] = useState()
  const postExercises = async (data)=>{
    setLoaderPost(true)
    console.log('fetch started')
    await fetcher('/userexercises/create',{
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: 'follow'
      })
      .then(res => {return res.json()})
      .then(data => {
        if(data){
          setLoaderPost(false)
          setServerMessage(data.message)
        }
      })
      .catch(error => console.log('error', error));
  }


/* WORK WITH ITS DATA */
  const {register, handleSubmit, control} = useForm()
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id)
  }
  const onSubmit =(dataForm)=> {
    const sendData = {
      exercise_id: postExercise.id,
      data: JSON.stringify(dataForm)
    }
    console.log(sendData)
    postExercises(sendData)
  }
  return (
    <LoadingElement>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              {exercise && exercise.its_data.map((v, k)=>{
                    return <SingleExercise key={k} idX={k} currentTab={currentTab} info={v.info} label={v.label} register={register}/>
                })
              }
          </div>
        </div>
          <div className='w-fu'>
              <button type="submit" className='btn mx-auto block flex gap-8'>
                {loaderPost && <span><ReactSVG src={icons.load} className='w-5'/></span>}
                Finish exercise
              </button>
              {!loaderPost && serverMessage && <p>{serverMessage}</p>}
          </div>
      </form>
      <DevTool control={control} />
    </LoadingElement>
  );

}

/*  
    FETCH POST MISSING
*/

const SingleExercise = ({info, label,currentTab, idX, register}) =>{
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
        <textarea {...register(label)} className="textarea textarea-secondary block my-7 w-full h-60 resize-none" placeholder={`Write here the ${label}!`}></textarea>
    </div>
  }