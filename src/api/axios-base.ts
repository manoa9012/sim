/**
 * @author andyg9413
 */
import axios from "axios";
import store from "../store";

import { isDevelop } from "@/enviorment";

/* const APIUrl = process.env.VUE_APP_BASE_URL; */
const APIUrl = process.env.VUE_APP_BASE_URL;

const axiosBase = axios.create({
  baseURL: APIUrl,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expire: 0,
  },
});
const getAPI = axios.create({
  baseURL: APIUrl,
});

axiosBase.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

/**
 * Configurar el interceptor para poner el token de
 * acceso en la cabecera de cada peticion
 */
getAPI.interceptors.request.use(
  (config) => {
    const token = store.state.accessToken;

    if (token) (config as any).headers.Authorization = "Bearer " + token;

    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

// REFRESHING TOKEN ON UNATHORIZED

const subscribers = [] as (() => void)[];

function subscribePromise(cb: () => void): void {
  subscribers.push(cb);
}

function onRefreshed(): void {
  subscribers.forEach((cb) => cb());
}

/**
 * If error response status is 401, it means the request
 * was invalid due to expired access token
 */
getAPI.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalRequest = err.config;
    if (
      (err.response.status === 401 &&
        originalRequest.url.includes("users/refresh")) ||
      err.response.message == "Invalid refresh Token"
    ) {
      store.dispatch("forceLogout");

      return Promise.reject(err);
    } else if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await store.dispatch("refreshToken");
      return getAPI(originalRequest);
    }

    return Promise.reject(err);
  }
);
// END REFRESHING TOKEN ON UNATHORIZED

export { axiosBase, getAPI };
