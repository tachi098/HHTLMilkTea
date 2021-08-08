import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import PrivateRoute from "./components/PrivateRoute";
import { CircularProgress } from "@material-ui/core";
import "./App.css";

const Spinner = React.lazy(() => import("./components/Spinner"));
const Login = React.lazy(() => import("./components/Login"));
const Form = React.lazy(() => import("./components/Something/Form"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const SpanningTable = React.lazy(() => import("./components/Something/Table"));
const Page404 = React.lazy(() => import("./components/Page404"));
const User = React.lazy(() => import("./components/User"));
const Product = React.lazy(() => import("./components/Product"));
const AddProduct = React.lazy(() => import("./components/Product/AddProduct"));

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
            <PrivateRoute path={"/user"}>
              <User />
            </PrivateRoute>
            <PrivateRoute exact path={"/product"}>
              <Product />
            </PrivateRoute>
            <PrivateRoute path={"/product/add"}>
              <AddProduct />
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

            <PrivateRoute path="/*">
              <Page404 />
            </PrivateRoute>
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
