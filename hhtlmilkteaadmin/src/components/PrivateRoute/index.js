import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const DefaultLayout = React.lazy(() => import("./../Layout/DefaultLayout"));

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={() =>
        auth.user ? (
          <DefaultLayout>{children}</DefaultLayout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
