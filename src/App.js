import React, { lazy, Suspense } from "react";
/* eslint-disable no-unused-vars */
import Signup from "./pages/Signup";
import Detail from "./pages/Detail";
import { Route, Switch } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth.js";
import { FileProvider } from "./hooks/useFiles";
import PrivateRoute from "./components/PrivateRoute.js";
import FullscreenLoader from "./components/FullscreenLoader.js";
import { AlertProvider } from "./hooks/useAlerts.js";
import Layout from "./components/layouts";

const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const { isAuthenticating, isLoggingOut } = useAuth();
  return (
    <>
      {isAuthenticating || isLoggingOut ? (
        <FullscreenLoader open />
      ) : (
        <Layout>
          <Switch>
            <Route path="/" exact component={Signup} />
            <PrivateRoute path="/d">
              <Suspense fallback={<FullscreenLoader open />}>
                <Route path="/d" exact component={Dashboard} />
                <Route path="/d/file/:id"component={Detail}/>
              </Suspense>
            </PrivateRoute>
          </Switch>
        </Layout>
      )}
    </>
  );
}

const AppWrapper = () => (
  <AlertProvider>
    <AuthProvider>
      <FileProvider>
        <App />
      </FileProvider>
    </AuthProvider>
  </AlertProvider>
);
export default AppWrapper;
