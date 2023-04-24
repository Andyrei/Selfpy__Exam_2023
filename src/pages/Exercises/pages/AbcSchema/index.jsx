import React, { useEffect, useRef, useState } from 'react'
import { ReactSVG } from 'react-svg'
import icons from '../../../../assets/icons/Icons'
import useAuthContext from '../../../../context/AuthContext';

  
export default function AbcSchema() {
  const [tabsData, setTabsData ] = useState()
  const { fetcher, userData } = useAuthContext()

  const fetchExercise = async()=>{
  userData.token&&
    await  fetcher('/userexercises/1',{
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then(results => {
      if (results) {
        setTabsData(JSON.parse(results.data))
      }
    })
    .catch(error => console.log('error', error))
  }
  useEffect(() => {
    fetchExercise()
  },[userData])


  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabsRef = useRef([]);
  
    return (
      <>
        <div className="relative">
          <div className="tabs tabs-boxed mx-auto w-fit">
            {tabsData?.map((tab, idx) => {
              return (
                <button
                  key={idx}
                  ref={(el) => (tabsRef.current[idx] = el)}
                  className={idx == activeTabIndex ? 'tab tab-active' : 'tab'}
                  onClick={() => setActiveTabIndex(idx)}>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        <SingleExercise info={tabsData && tabsData[activeTabIndex]?.info} label={tabsData && tabsData[activeTabIndex].label}/>
        <div className='w-fu'><button className='btn mx-auto block'>Finish Exercise</button></div>
      </>
    );
  }
  


  const SingleExercise = ({info, label, content}) =>{
    const [infoAlert, setInfoAlert] = useState(true);
  
    return (
        <div className="w-[90%] my-10 mx-auto">
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
    )
  }