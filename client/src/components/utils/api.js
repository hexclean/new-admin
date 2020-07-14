import axios from "axios";

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
