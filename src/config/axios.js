import axios from "axios";

const API_KEY = process.env.REACT_APP_API_TMDB_KEY;

// Create an Axios instance
const api = axios.create({
  baseURL: "https://api.themoviedb.org",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

export default api;
