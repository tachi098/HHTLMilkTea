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
const EditProduct = React.lazy(() =>
  import("./components/Product/EditProduct")
);
const DetailProduct = React.lazy(() =>
  import("./components/Product/DetailProduct")
);
const Category = React.lazy(() => import("./components/Category"));
const AddCategory = React.lazy(() => import("./components/Category/AddCategory"));
const EditCategory = React.lazy(() => import("./components/Category/EditCategory"));
const DetailCategory = React.lazy(() => import("./components/Category/DetailCategory"));

const AdditionOption = React.lazy(() => import("./components/AdditionOption"));
const CreateAdditionOption = React.lazy(() => import("./components/AdditionOption/CreateAdditionOption"));
const EditAdditionOption = React.lazy(() => import("./components/AdditionOption/EditAdditionOption"));

const SizeOption = React.lazy(() => import("./components/SizeOption"));
const AddSizeOption = React.lazy(() => import("./components/SizeOption/AddSizeOption"));
const EditSizeOption = React.lazy(() => import("./components/SizeOption/EditSizeOption"));

const SaleOff = React.lazy(() => import("./components/SaleOff"));
const AddSaleOff = React.lazy(() => import("./components/SaleOff/AddSaleOff"));
const CreateSaleOff = React.lazy(() => import("./components/SaleOff/CreateSaleOff"));

const DetailUser = React.lazy(() => import("./components/User/DetailUser"));
const Order = React.lazy(() => import("./components/Order"));
const DetailOrder = React.lazy(() => import("./components/Order/DetailOrder"));

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

            <PrivateRoute exact path={"/user"}>
              <User />
            </PrivateRoute>
            <PrivateRoute path={"/user/detail"}>
              <DetailUser />
            </PrivateRoute>

            <PrivateRoute exact path={"/product"}>
              <Product />
            </PrivateRoute>
            <PrivateRoute path={"/product/add"}>
              <AddProduct />
            </PrivateRoute>
            <PrivateRoute path={"/product/edit"}>
              <EditProduct />
            </PrivateRoute>
            <PrivateRoute path={"/product/detail"}>
              <DetailProduct />
            </PrivateRoute>

            <PrivateRoute exact path={"/category"}>
              <Category />
            </PrivateRoute>
            <PrivateRoute path={"/category/add"}>
              <AddCategory />
            </PrivateRoute>
            <PrivateRoute path={"/category/edit"}>
              <EditCategory />
            </PrivateRoute>
            <PrivateRoute path={"/category/detail"}>
              <DetailCategory />
            </PrivateRoute>

            <PrivateRoute exact path={"/addition"}>
              <AdditionOption />
            </PrivateRoute>
            <PrivateRoute exact path={"/addition/add"}>
              <CreateAdditionOption />
            </PrivateRoute>
            <PrivateRoute exact path={"/addition/edit"}>
              <EditAdditionOption />
            </PrivateRoute>

            <PrivateRoute exact path={"/sizeoption"}>
              <SizeOption />
            </PrivateRoute>
            <PrivateRoute exact path={"/sizeoption/add"}>
              <AddSizeOption />
            </PrivateRoute>
            <PrivateRoute exact path={"/sizeoption/edit"}>
              <EditSizeOption />
            </PrivateRoute>

            <PrivateRoute exact path={"/saleoff"}>
              <SaleOff />
            </PrivateRoute>
            <PrivateRoute path={"/saleoff/add"}>
              <AddSaleOff />
            </PrivateRoute>
            <PrivateRoute path={"/saleoff/create"}>
              <CreateSaleOff />
            </PrivateRoute>

            <PrivateRoute exact path={"/order"}>
              <Order />
            </PrivateRoute>
            <PrivateRoute exact path={"/order/detail"}>
              <DetailOrder/>
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
