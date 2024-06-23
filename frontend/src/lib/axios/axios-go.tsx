import { getAccessToken } from "@/service/token";
import axios from "axios";

const axiosGo = axios.create();

axiosGo.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosGo.interceptors.response.use(
  async (config) => {
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { axiosGo };
