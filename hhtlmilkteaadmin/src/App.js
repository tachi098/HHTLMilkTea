import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import PrivateRoute from "./components/PrivateRoute";
import { CircularProgress } from "@material-ui/core";
import "./App.css"

const Spinner = React.lazy(() => import("./components/Spinner"));
const Login = React.lazy(() => import("./components/Login"));
const Form = React.lazy(() => import("./components/Something/Form"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const SpanningTable = React.lazy(() => import("./components/Something/Table"));

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Suspense
          fallback={
            <CircularProgress
              disableShrink
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
              }}
            />
          }
        >
          <Switch>
            <Route exact path={["/", "/login"]}>
              <Login />
            </Route>
            <PrivateRoute path={"/dashboard"}>
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path={"/spinner"}>
              <Spinner />
            </PrivateRoute>
            <PrivateRoute path={"/form"}>
              <Form />
            </PrivateRoute>
            <PrivateRoute path={"/table"}>
              <SpanningTable />
            </PrivateRoute>
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
