import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Dashboard from './components/Dashboard';
import Form from './components/Something/Form';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SpanningTable from './components/Something/Table';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Navbar />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route exact path={"/"} component={Dashboard}/>
            <Route exact path={"/form"} component={Form}/>
            <Route exact path={"/table"} component={SpanningTable}/>
          </Switch>
            <Box pt={4}>
              <Footer />
            </Box>
          </Container>
        </main>
      </div>
    </Router>
  );
}

export default App;