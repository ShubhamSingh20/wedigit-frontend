import axios from "axios";
import React from "react";
import { ValidationErrorDescription } from "hooks/useAlerts";
const api = (
  options = {
    cancelToken: null,
    isHandlerDisabled: false,
    addTrailingSlash: true,
  }
) => {
  const { cancelToken, isHandlerDisabled } = options;
  const axiosInstance = axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? new URL("/api/v1", process.env.REACT_APP_BACKEND_URI).href
        : "/api/v1",
    cancelToken,
    withCredentials: true,
    addTrailingSlash: true,
  });
  axiosInstance.interceptors.request.use((config) => {
    if (config.addTrailingSlash && config.url[config.url.length - 1] !== "/") {
      config.url += "/";
    }
    return config;
  });
  if (!isHandlerDisabled)
    axiosInstance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (axios.isCancel(error)) {
        } else {
          const response = error.response;
          if (response.status === 401) {
            // auto logout if 401 response returned from api
            // clear localstorage or a logout method
            localStorage.clear();
            window.location && window.location.replace("/");
          } else if (response.status === 400) {
            let description = (
              <ValidationErrorDescription errors={response.data} />
            );
            return Promise.reject({ ...error, description });
          }
          const description =
            (response.data && response.data.message) ||
            (response.data && response.data.error);
          return Promise.reject({ ...error, description });
        }
      }
    );
  return axiosInstance;
};
export default api;
