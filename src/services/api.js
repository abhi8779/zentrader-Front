import config from "@/config";
import {
  logout,
  updateAccessToken,
} from "@/features/accounts/slices/userSlice";
import axios from "axios";

let reqInterceptor, resInterceptor;
// const csrfToken = getCookie('csrftoken')
console.log("config.BASE_URL :>> ", config.BASE_URL);
const instance = axios.create({
  baseURL: config.BASE_URL,
  // baseURL: "http://127.0.0.1:8000/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const configureApi = async (instance, store) => {
  if (reqInterceptor || resInterceptor) {
    if (reqInterceptor) {
      instance.interceptors.request.eject(reqInterceptor);
    }
    if (resInterceptor) {
      instance.interceptors.response.eject(resInterceptor);
    }
  }
  reqInterceptor = instance.interceptors.request.use(
    (config) => {
      const state = store.getState();
      if (state.user.tokens.access) {
        config.headers.Authorization = "Bearer " + state.user.tokens.access;
      }

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  resInterceptor = instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const state = store.getState();
      const { dispatch } = store;
      const originalRequest = error.config;

      if (
        error.response.status === 400 &&
        originalRequest.url.indexOf("/api/token/refresh/") >= 0
      ) {
        return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return axios
          .post(
            config.BASE_URL + "/api/token/refresh/",
            {
              refresh: state.user.tokens.refresh,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              // 1) put token to Store
              dispatch(updateAccessToken(res.data.access));

              // 2) Change Authorization header
              instance.defaults.headers.common.Authorization =
                "Bearer " + res.data.access;

              // 3) return originalRequest object with Axios.
              return instance(originalRequest);
            }
          })
          .catch((e) => {
            if (e.response.status === 401) {
              dispatch(logout());
            }
            throw e;
          });
      }

      // return Error object with Promise

      return Promise.reject(error);
    }
  );
};

export default instance;
export { configureApi };
