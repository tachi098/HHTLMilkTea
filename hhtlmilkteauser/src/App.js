import DefaultLayout from "./components/layout/DefaultLayout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CircularProgress, CssBaseline } from "@material-ui/core";
import ScrollOnTop from "./common/ScrollOnTop";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import PrivateRoute from "./components/PrivateRoute";
import React, { Suspense } from "react";

const Home = React.lazy(() => import("./components/Home"));
const Milktea = React.lazy(() => import("./components/Milktea"));
const SignIn = React.lazy(() => import("./components/SignIn"));
const SignUp = React.lazy(() => import("./components/SignUp"));
const Dessert = React.lazy(() => import("./components/Dessert"));
const Product = React.lazy(() => import("./components/Product"));
const Checkout = React.lazy(() => import("./components/Checkout"));
const ShoppingCart = React.lazy(() => import("./components/ShoppingCart"));
const Account = React.lazy(() => import("./components/Account"));
const Page404 = React.lazy(() => import("./components/Page404"));

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
          <DefaultLayout>
            <CssBaseline />
            <ScrollOnTop>
              <Switch>
                <Route path={["/", "/home"]} exact>
                  <Home />
                </Route>
                <Route path={"/dessert"} exact>
                  <Dessert />
                </Route>
                <Route path={"/milktea"} exact>
                  <Milktea />
                </Route>
                <Route path={"/product"} exact>
                  <Product />
                </Route>
                <Route path={"/signin"} exact>
                  <SignIn />
                </Route>
                <Route path={"/signup"} exact>
                  <SignUp />
                </Route>
                <Route path={"/milktea"} exact>
                  <Milktea />
                </Route>

                <PrivateRoute
                  path={["/account", "/account/history", "/account/voucher"]}
                >
                  <Account />
                </PrivateRoute>
                <PrivateRoute path={"/checkout"}>
                  <Checkout />
                </PrivateRoute>
                <PrivateRoute path={"/shoppingcart"}>
                  <ShoppingCart />
                </PrivateRoute>

                <Route path="/*">
                  <Page404 />
                </Route>
              </Switch>
            </ScrollOnTop>
          </DefaultLayout>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
