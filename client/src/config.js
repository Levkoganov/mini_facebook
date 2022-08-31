import axios from "axios";

// Set default url
export const baseUrl = axios.defaults.baseURL = 'https://luxury-crostata-60f8da.netlify.app/';

// Set token in headers
export const setToken = (token) => {
  axios.defaults.headers.common['token'] = token;
};