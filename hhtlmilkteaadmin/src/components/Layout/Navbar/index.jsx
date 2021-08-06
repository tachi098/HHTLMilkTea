import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  Avatar,
  IconButton,
  makeStyles,
  MenuItem,
  Typography,
  Menu,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useState } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MainListItems from "../ListItem";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AuthLogoutAction } from "../../../store/actions/AuthAction";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Logo from "./../../../assets/img/Milktea.gif";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorElLogout, setAnchorElLogout] = useState(null);

  function handleClickLogout(event) {
    if (anchorElLogout !== event.currentTarget) {
      setAnchorElLogout(event.currentTarget);
    }
  }

  function handleCloseLogout() {
    setAnchorElLogout(null);
  }

  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onHandleLogout = () => {
    dispatch(AuthLogoutAction());
    history.push("/login");
  };

  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            HHTLMilktea
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems />
          {open ? (
            <>
              <div
                style={{
                  display: "flex",
                  position: "fixed",
                  bottom: 0,
                  paddingTop: 10,
                  paddingLeft: 10,
                  paddingBottom: 10,
                  cursor: "pointer",
                }}
                onClick={handleClickLogout}
              >
                <Avatar alt="Avatar Admin" src={Logo} />
                <Typography style={{ marginLeft: 20, marginTop: 10 }}>
                  {auth.user.fullName}
                </Typography>
                <ExpandLessIcon style={{ marginTop: 10, marginLeft: 10 }} />
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorElLogout}
                open={Boolean(anchorElLogout)}
                onClose={handleCloseLogout}
                MenuListProps={{ onMouseLeave: handleCloseLogout }}
                style={{ marginTop: -40, marginLeft: 150 }}
              >
                <MenuItem
                  onClick={onHandleLogout}
                  style={{ backgroundColor: "white" }}
                >
                  <Typography>Đăng xuất</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Avatar
              alt="Avatar Admin"
              src={Logo}
              style={{
                position: "fixed",
                bottom: 0,
                marginLeft: 14,
                marginBottom: 10,
              }}
            />
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
