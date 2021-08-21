import axios from "axios";
import { BASE_URL } from "./Constant";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const getUser = JSON.parse(localStorage.getItem("user"));

  if (getUser && getUser.token) {
    config.headers.Authorization = `Bearer ${getUser.token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return new Promise((resolve, reject) => {
      resolve(response);
    });
  },
  (error) => {
    if (!error.response) {
      localStorage.removeItem("user");
      return;
    }

    if (Object.is(401, error.response.status)) {
      localStorage.removeItem("user");
      // window.location.href = "/";
      return;
    }

    if (Object.is(403, error.response.status)) {
      localStorage.removeItem("user");
      window.location.href = "/";
      return;
    }
  }
);

export default api;
