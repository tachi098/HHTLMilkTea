import React, { Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Navbar from "./components/Layout/Navbar";
import Dashboard from "./components/Dashboard";
import Form from "./components/Something/Form";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SpanningTable from "./components/Something/Table";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Spinner = React.lazy(() => import("./components/Spinner"));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <>
      <ToastContainer />
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <Navbar />

          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Switch>
                <Suspense fallback={<h1>Loading...</h1>}>
                  <Route exact path={"/"} component={Dashboard} />
                  <Route exact path={"/form"} component={Form} />
                  <Route exact path={"/table"} component={SpanningTable} />

                  <Route path="/spinner" component={Spinner} />
                </Suspense>
              </Switch>
            </Container>
          </main>
        </div>
      </Router>
    </>
  );
};

export default App;
