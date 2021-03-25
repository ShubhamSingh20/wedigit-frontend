import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

function PrivateRoute({ children, ...rest }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { referrer: location } }} />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.any,
};

export default PrivateRoute;
