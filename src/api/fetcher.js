import axios from 'axios';
import useAuthContext from '../context/AuthContext';
/**
 * THIS PART IS UNDER CONSTRUCTION 
*/


/* API's */
export const USER_API= import.meta.env.VITE_USER_API;
export const REGISTER_API= import.meta.env.VITE_REGISTER_API;
export const LOGIN_API= import.meta.env.VITE_LOGIN_API;
export const BASE_URL= import.meta.env.VITE_BASE_URL;
export const AUTH_TOKEN = ''

function useAuth (){
  const {userData} = useAuthContext()
    return(
      userData.token ? AUTH_TOKEN = `Bearer ${userData.token}` : ''
    )
}
export default axios.create({
  baseURL: BASE_URL
});

axios.defaults.headers.post['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.common['Content-Type'] = 'application/json';




