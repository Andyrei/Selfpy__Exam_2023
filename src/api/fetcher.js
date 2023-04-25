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

// Create instance called instance
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
      'content-type':'application/json',
  },
});
export default {
  get: (url) =>
  instance({
      'method':'GET',
      'url':url
  }),
  /* post: (url, token, data) =>
  instance({
      'method': 'POST',
      'url':url,
      'headers': {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      'data': data
  }) */
}


