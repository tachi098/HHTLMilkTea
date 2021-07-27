import { Container, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const Navbar = React.lazy(() => import("./Navbar"));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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

const DefaultLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Navbar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {children}
          </Container>
        </main>
      </div>
    </>
  );
};

export default DefaultLayout;
