import { Axios, AxiosHeaders } from 'axios';
/**
 * THIS PART IS UNDER CONSTRUCTION 
*/


/* API's */
export const USER_API= import.meta.env.VITE_USER_API;
export const REGISTER_API= import.meta.env.VITE_REGISTER_API;
export const LOGIN_API= import.meta.env.VITE_LOGIN_API;
export const BASE_URL= import.meta.env.VITE_BASE_URL;

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
