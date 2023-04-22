  import axios from "../api/axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

/* API's */
const USER_API= import.meta.env.VITE_USER_API;

// CREATE CONTEXT
const AuthContext = createContext({})

// CREATE PROVIDER
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState();

  const [userData, setUserData] = useState({
    toke: "",
    user: null,
  });

// CREATE and SAVE auth_token into cookie
  const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);
  
  const getAuthCookieExpiration = () => {
		let date = new Date();
		date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
		return date;
	};

  const setAsLogged = (user, token) => {
		setCookie("auth_token", token, {
			path: "/",
			expires: getAuthCookieExpiration(),
			sameSite: "lax",
			httpOnly: false,
		});
		setUserData({ token: token, user });
		navigate("/profile");
	};


  const setLogout = () => {
		removeCookie("auth_token", {
			path: "/",
			expires: getAuthCookieExpiration(),
			sameSite: "lax",
			httpOnly: false,
		});
		setUserData({ token: "", user: null });
		navigate("/login");
	};
// END COOKIE

// GET USER
const getUserToken = async() => {
  
  if(cookies["auth_token"]){
    await axios.get(
      USER_API,
      {headers: { Authorization: `Bearer ${cookies["auth_token"]}`}}
    )
    .then(()=>{
      setUserData({ token: cookies["auth_token"], user: data });
      console.log(cookies["auth_token"])
      navigate('/profile')
    })
    .catch(console.log)
  }else{
    setUserData({token: "", user: null});
    if(location.pathname === '/register') {
      return;
    }
    navigate("/");
  }
}

  /* 
    * posting data to the register api
  */
  const register = async ({...data}) => {
    await csfr();
    try {
      await axios.post('/api/auth/register', data );
      getUser();
      navigate('/profile');
      console.log('you have been registered');
    }
    catch (e){
      console.log(e)
      if(e.response.status === 401){
        setErrors(e.response.data.errors)
      }
    }
  }


  return <AuthContext.Provider 
      value = {{
        userData, 
        errors,
        setAsLogged,
        getUserToken, 
        register
        }}>

      {children}
      
  </AuthContext.Provider>
}

export default function useAuthContext() {
  return useContext(AuthContext);
}