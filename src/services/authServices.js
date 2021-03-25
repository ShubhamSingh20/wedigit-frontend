import api from "./api";

const login = (credentials, { cancelToken = null, isHandlerDisabled = true }) =>
  api({ cancelToken, isHandlerDisabled }).post("/auth/login", credentials);
const logout = (options = { isHandlerDisabled: true }) =>
  api(options).post("/auth/logout");
const check = (options = { isHandlerDisabled: true }) =>
  api(options).post("/auth/check");

const signup = (credentials, { cancelToken = null, isHandlerDisabled = true }) =>
  api({ cancelToken, isHandlerDisabled }).post("/auth/register", credentials);

export default {
  login,
  logout,
  check,
  signup,
};
