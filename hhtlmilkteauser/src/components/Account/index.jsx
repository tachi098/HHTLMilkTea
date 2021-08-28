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
import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { GroupOrderFindAllAction } from "../../store/actions/GroupOrderAction";

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
  const { customer } = useSelector((state) => state.customer);

  //support group member
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { order } = useSelector((state) => state.order);

  useEffect(() => {
    if (
      order &&
      Object.keys(order).length !== 0 &&
      order.constructor === Object
    ) {
      if (
        (!Object.is(localStorage.getItem("member", null)) &&
          !Object.is(localStorage.getItem("member"), null)) ||
        localStorage.getItem("user")
      ) {
        setTimeout(() => {
          const groupMember = JSON.parse(localStorage.getItem("groupMember"));
          const username = groupMember?.username;
          const type = "team";
          const orderID = groupMember?.orderID;
          GroupOrderFindAllAction({ username, type, orderID })(dispatch);
        }, 500);
      }

      if (auth?.user?.token) {
        setTimeout(() => {
          const username = auth?.user?.username;
          const type = "team";
          const orderID = order?.id;
          GroupOrderFindAllAction({ username, type, orderID })(dispatch);
        }, 500);
      }
    }
  }, [auth?.user?.token, auth?.user?.username, dispatch, order, order?.id]);

  return (
    <React.Fragment>
      <Grid container className={classes.container}>
        <Grid item md={2} xs={4} className={classes.navbar}>
          <div className={classes.navHeader}>
            <Avatar
              alt="https://material-ui.com/static/images/avatar/1.jpg"
              src={customer.linkImage}
              className={classes.large}
            />
            <div>
              <Typography className={classes.username}>
                <b>{customer.fullName}</b>
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
