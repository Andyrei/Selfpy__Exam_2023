import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

/* API's */
const USER_API= import.meta.env.VITE_USER_API;
const BASE_URL= import.meta.env.VITE_BASE_URL;

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
		navigate("/");
	};
// END COOKIE

// GET USER
const getUserToken = async() => {
  if (cookies["auth_token"]) {
    fetcher(`/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookies["auth_token"]}`,
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData({ token: cookies["auth_token"], user: data });
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
        setUserData({ token: "", user: null });
        setLogout();
      });
  } else {
    setUserData({ token: "", user: null });
    if(location.pathname === '/register') {
      return;
    }
    navigate("/");
  }
}

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

	const fetcher = (apiEndPoint, options) => {
		return fetch(`${BASE_URL}${apiEndPoint}`, updateOptions(options));
	};

const login = (setError, dataForm) => {
  fetcher('/auth/login', {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(dataForm),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data.message)
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

const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return <AuthContext.Provider 
      value = {{
          userData,
          emailPattern,
          fetcher,
          login,
          setAsLogged,
          setLogout,
          getUserToken,
        }}>

      {children}
      
  </AuthContext.Provider>
}

export default function useAuthContext() {
  return useContext(AuthContext);
}