import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

/* API's */
const USER_API= import.meta.env.VITE_USER_API;
const REGISTER_API= import.meta.env.VITE_REGISTER_API;
const LOGIN_API= import.meta.env.VITE_LOGIN_API;
const BASE_URL= import.meta.env.VITE_BASE_URL;

const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// CREATE CONTEXT
const AuthContext = createContext({})

// CREATE PROVIDER
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState();

  const [userData, setUserData] = useState({
    token: "",
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
		navigate("/");
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
  if (cookies["auth_token"]) {
    fetcher(USER_API, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookies["auth_token"]}`,
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData({ token: cookies["auth_token"], user: data });
      })
      .catch((error) => {
        console.log(error);
        setUserData({ token: "", user: null });
        setLogout();
      });
  } 
  
  else {
    setUserData({ token: "", user: null });
    if(location.pathname === '/register') {
      return;
    }
    navigate("/");
  }
}

// REGISTER USER FUNC
const registerUser = (setError, dataForm)=>{
  const getErrorTypes = (errors) => {
		const types = {};
		errors.forEach((error, i) => {
			types[`errorsFromApi${i + 1}`] = error
		})
		return types;
	}

  fetcher(REGISTER_API, {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify(dataForm),
  })
    .then((response) => response.json())
    .then((data) => {
      if(data.status) {
        setAsLogged(data.user, data["access_token"])
      } else {
        Object.keys(data.errors).forEach(field => {
          if(data.errors[field]) {
            setError(field, {
              types: getErrorTypes(data.errors[field])
            })	
          }
        })
      }
  })
}

// LOGIN USER FUNC
const login = (setError, dataForm) => {
  fetcher(LOGIN_API, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(dataForm),
  })
  .then((response) => response.json())
  .then((data) => {
    if(data.status) {
      setAsLogged(data.user, data["access_token"])
    }else{
      setError('email')
      setError('password', {type: 'custom', message: data.message})
    }
  }).catch((err) => {
    console.log(err)
  });  
  
}

const fetcher = (apiEndPoint, options) => {
  return fetch(`${BASE_URL}${apiEndPoint}`, updateOptions(options));
};

function updateOptions(options) {
  const update = {
    ...options,
    headers: { ...options.headers, Accept: "application/json" },
  };
  if (userData.token) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${userData.token}`,
    };
  }
  return update;
}


  return <AuthContext.Provider 
      value = {{
          userData,
          cookies,
          login,
          registerUser,
          setLogout,
          emailPattern,
          getUserToken,
          fetcher,
        }}>

      {children}
      
  </AuthContext.Provider>
}

export default function useAuthContext() {
  return useContext(AuthContext);
}