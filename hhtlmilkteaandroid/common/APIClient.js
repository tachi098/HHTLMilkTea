import axios from "axios";
import { BASE_URL } from "./Constant";
import { AsyncStorage } from 'react-native';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return new Promise((resolve, reject) => {
      resolve(response);
    })
  },
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (Object.is(401, error.response.status)) {
      AsyncStorage.removeItem("user");
      return;
    }

    if (Object.is(403, error.response.status)) {
      AsyncStorage.removeItem("user");
      return;
    }

    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
);

export default api;
