import React, { useState } from 'react'
import { ReactSVG } from 'react-svg'
import icons from '../assets/icons/Icons'







export default function useLoading() {
  const [ isLoading, setIsLoading ] = useState(true)
  
  
  const LoadingElement = ({children}) =>{
  
    if(isLoading) {return<div className="border shadow rounded-md p-4 my-5 max-w-sm w-full mx-auto">
      <div className="animate-pulse space-x-4">
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-motion-id="svg 1">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
        <div className="space-y-6 py-1">
          <div className="h-2 bg-dark-darker rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-dark-darker rounded col-span-2"></div>
              <div className="h-2 bg-dark-darker rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-dark-darker rounded"></div>
          </div>
        </div>
      </div>
      </div>}
      else{
        return children
      }
  }


  return {
    LoadingElement,
    setIsLoading,
  }
}
