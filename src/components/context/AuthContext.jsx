import React, {createContext, useContext, useState} from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/* CREATING CONTEXT */
const AuthContext = createContext(null);


/* HOOK CUSTOM */
export const useAuth = () => useContext(AuthContext)


/* SETTING A PROVIDER SO IT CAN BE USED ON OTHER COMPONENTS */
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return(
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export const RequireAuth = () =>{
  const {user} = useAuth();
  const location = useLocation();

  if(!user){
    return <Navigate to='/login' />
  }
  
  return <Outlet />
}

