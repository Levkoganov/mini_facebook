import axios from "axios";

// Set default url
export const baseUrl = axios.defaults.baseURL = 'http://localhost:5000';

// Set token in headers
export const setToken = (token) => {
  axios.defaults.headers.common['token'] = token;
};