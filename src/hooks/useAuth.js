import propTypes from "prop-types";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import authServices from "services/authServices";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useAlerts } from "./useAlerts";

const auth = createContext(null);
const { Provider } = auth;

/**
 * Custom hook for methods and properties of auth
 * @returns {Object} auth
 * @returns {Object} auth.user
 * @returns {bool} auth.isAuthenticating
 * @returns {bool} auth.isLoggingOut
 * @returns {bool} auth.isLoggingIn
 * @returns {bool} auth.isAuthenticated
 * @returns {function} auth.login
 * @returns {function} auth.logout
 * @returns {function} auth.check
 */
export const useAuth = () => useContext(auth);

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const { successAlert, errorAlert } = useAlerts();

  const isAtLoginPage = useRouteMatch("/");

  const [user, setUser] = useState([]);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let persistedUser = localStorage.getItem("user");
    try {
      persistedUser = JSON.parse(persistedUser);
      if (persistedUser) {
        check();
      } else setIsAuthenticating(false);
    } catch (e) {}
  }, []);

  const check = useCallback(() => {
    setIsAuthenticating(true);
    return authServices
      .check()
      .then((response) => {
        const { data } = response;
        setUser(data.user);
        setIsAuthenticated(true);
        setIsAuthenticating(false);
        if (isAtLoginPage?.isExact) history.push("/d");
      })
      .catch((e = { response: {} }) => {
        let description = e.response?.data?.message || e.response?.data?.error;
        errorAlert({
          title: "Credentials have expired, please login again",
          description,
        });
        setIsAuthenticating(false);
        if (!isAtLoginPage?.isExact) {
          localStorage.clear();
          if (location.pathname !== "/")
            history.replace("/", { state: location });
        }
      });
  }, [isAtLoginPage, errorAlert, history, location]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticating,
      isLoggingOut,
      isLoggingIn,
      isAuthenticated,
      signup: function (credentials) {
        setIsLoggingIn(true);
        return authServices
          .signup(credentials, { isHandlerDisabled: true })
          .then((response) => {
            const { data } = response;
            setIsAuthenticated(true);
            setUser(data.user);
            successAlert({ title: "Signed Up successfully" });
            localStorage.setItem("user", JSON.stringify(data.user));
            history.push("/d");
            setIsLoggingIn(false);
          })
          .catch((e = { response: {} }) => {
            let description =
              e.response?.data?.message || e.response?.data?.error;
            errorAlert({ description, title: "Error while Signing up!" });
            setIsLoggingIn(false);
          });
      },
      login: function (credentials) {
        setIsLoggingIn(true);
        return authServices
          .login(credentials, { isHandlerDisabled: true })
          .then((response) => {
            const { data } = response;
            setIsAuthenticated(true);
            setUser(data.user);
            successAlert({ title: "Logged in successfully" });
            localStorage.setItem("user", JSON.stringify(data.user));
            history.push("/d");
            setIsLoggingIn(false);
          })
          .catch((e = { response: {} }) => {
            let description =
              e.response?.data?.message || e.response?.data?.error;
            errorAlert({ description, title: "Error while logging in!" });
            setIsLoggingIn(false);
          });
      },
      logout: function () {
        setIsLoggingOut(true);
        return authServices
          .logout()
          .then(() => {
            localStorage.clear();
            setIsLoggingOut(false);
            history.go("/d", { state: location });
          })
          .catch((e = { response: {} }) => {
            let description =
              e.response?.data?.message || e.response?.data?.error;
            errorAlert({ description, title: "Error while logging out!" });
            setIsLoggingOut(false);
          });
      },
      check,
    }),
    [
      user,
      isAuthenticating,
      isAuthenticated,
      isLoggingOut,
      isLoggingIn,
      check,
      errorAlert,
      history,
      location,
      successAlert,
    ]
  );

  return <Provider value={value}>{children}</Provider>;
};
AuthProvider.propTypes = {
  children: propTypes.any,
};
