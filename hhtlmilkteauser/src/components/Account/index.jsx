import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import {
  PermIdentityOutlined,
  AssignmentOutlined,
  ConfirmationNumberOutlined,
} from "@material-ui/icons";
import { Link, Route, Switch } from "react-router-dom";
import Profile from "./Profile";
import History from "./History";
import Voucher from "./Voucher";
import HistoryDetail from "./History/HistoryDetail";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 30,
  },
  navbar: {
    paddingTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  navHeader: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    borderBottom: "2px solid #ececec",
    display: "flex",
  },
  username: {
    paddingLeft: 10,
    fontSize: 14,
  },
}));

const Account = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container className={classes.container}>
        <Grid item md={2} xs={4} className={classes.navbar}>
          <div className={classes.navHeader}>
            <Avatar
              alt="Remy Sharp"
              src="https://material-ui.com/static/images/avatar/1.jpg"
              className={classes.large}
            />
            <div>
              <Typography className={classes.username}>
                <b>Pham Quang Huy</b>
              </Typography>
            </div>
          </div>
          <List component="nav" aria-label="main mailbox folders">
            <Link
              to="/account"
              style={{ textDecoration: "none", color: "#203a53" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <PermIdentityOutlined style={{ color: "#2c65bd" }} />
                </ListItemIcon>
                <ListItemText primary="Tài khoản" />
              </ListItem>
            </Link>

            <Link
              to="/account/history"
              style={{ textDecoration: "none", color: "#203a53" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <AssignmentOutlined style={{ color: "#d4a90f" }} />
                </ListItemIcon>
                <ListItemText primary="Đơn hàng" />
              </ListItem>
            </Link>

            <Link
              to="/account/voucher"
              style={{ textDecoration: "none", color: "#203a53" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <ConfirmationNumberOutlined style={{ color: "#f25634" }} />
                </ListItemIcon>
                <ListItemText primary="Voucher" />
              </ListItem>
            </Link>
          </List>
        </Grid>
        <Grid item md={10} xs={8} style={{ backgroundColor: "white" }}>
          <Switch>
            <Route path="/account" exact component={Profile} />
            <Route path="/account/history" exact component={History} />
            <Route
              path="/account/history/detail"
              exact
              component={HistoryDetail}
            />
            <Route path="/account/voucher" exact component={Voucher} />
          </Switch>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Account;
