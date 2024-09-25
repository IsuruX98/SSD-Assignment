import axios from "axios";

const instance = axios.create({
  //baseURL: "https://eyezen.onrender.com/api/",
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
