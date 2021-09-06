import {
  Avatar,
  Grid,
  Typography,
  makeStyles,
  List,
  ListItem,
  Divider,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Chip,
} from "@material-ui/core";
import React, { useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { ListItemIcon, ListItemText } from "@material-ui/core";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import HomeIcon from "@material-ui/icons/Home";
import PhonelinkRingIcon from "@material-ui/icons/PhonelinkRing";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Moment from "react-moment";
import { Visibility } from "@material-ui/icons";
import BarCode from "react-barcode";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import Report from "./report";
import Logo from "./../../../assets/img/Milktea.gif";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 120,
    height: 120,
    border: "2px solid #000",
  },
  wrapAvatar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& .mark": {
      fontSize: 14,
      color: "red",
    },
  },
  wrapInfo: {
    backgroundColor: theme.palette.background.paper,
  },
  wrapDetails: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  wrapOrders: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 250,

    "& svg": {
      width: 150,
    },
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  table: {
    minWidth: "100%",
  },
}));

const DetailUser = () => {
  const classes = useStyles();

  const location = useLocation();
  const [user] = useState(location?.state?.user);
  const history = useHistory();

  const fields = [
    { lable: "Mã Đơn Hàng" },
    { lable: "Địa Chỉ" },
    { lable: "Điện Thoại" },
    { lable: "Tổng Tiền" },
    { lable: "Hình Thức" },
    { lable: "Trạng thái" },
    { lable: "Ngày Tạo" },
    { lable: "Hành Động" },
  ];

  return (
    <>
      {Object.is(user, undefined) && <Redirect to="/user" />}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h5">THÔNG TIN NGƯỜI DUNG</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={3} className={classes.wrapDetails}>
            <Grid item md={3}>
              <div className={classes.wrapAvatar}>
                <Avatar
                  src={user?.linkImage ?? Logo}
                  alt={user?.nameImage ?? "logo"}
                  className={classes.avatar}
                />
                <Typography variant="h6" component="p">
                  {user?.fullName}
                </Typography>
                <Typography variant="h6" component="span" className="mark">
                  Điểm: {user?.memberVip?.mark ?? "0"}
                </Typography>
                <PDFDownloadLink
                  document={<Report user={user} />}
                  fileName="report"
                >
                  <Avatar
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#FC8400",
                      marginTop: 30,
                    }}
                  >
                    <PictureAsPdfIcon />
                  </Avatar>
                </PDFDownloadLink>
              </div>
            </Grid>
            <Grid item md={9}>
              <div className={classes.wrapInfo}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <ChildCareIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        (
                          <Moment format="DD/MM/YYYY" date={user?.birthday} />
                        ) ?? <Moment format="DD/MM/YYYY" date={new Date()} />
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={user?.address} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PhonelinkRingIcon />
                    </ListItemIcon>
                    <ListItemText primary={user?.phone} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AlternateEmailIcon />
                    </ListItemIcon>
                    <ListItemText primary={user?.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DateRangeIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Moment
                          format="DD/MM/YYYY HH:mm:ss"
                          date={user?.createdAt}
                        />
                      }
                    />
                  </ListItem>
                </List>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Divider />
          {user?.orders?.length > 0 &&
            !Object.is(
              user?.orders?.findIndex((o) => !Object.is(o.payment, 0)),
              -1
            ) && <Typography variant="h6">ĐƠN HÀNG</Typography>}
          {user?.orders?.length > 0 &&
            !Object.is(
              user?.orders?.findIndex((o) => !Object.is(o.payment, 0)),
              -1
            ) && (
              <TableContainer component={Paper} className={classes.wrapOrders}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {fields.map((field, index) => (
                        <TableCell key={index}>{field.lable}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user?.orders.map((order, index) => {
                      return (
                        order.payment !== 0 && (
                          <TableRow key={index}>
                            <TableCell>
                              <BarCode value={order.id} />
                            </TableCell>
                            <TableCell>{order.address}</TableCell>
                            <TableCell>{order.phone}</TableCell>
                            <TableCell>{order.totalPrice}</TableCell>
                            <TableCell>
                              {Object.is(order.payment, 1) ? (
                                <Typography
                                  style={{ color: "black", fontWeight: 600 }}
                                >
                                  Tiền mặt
                                </Typography>
                              ) : Object.is(order.payment, 2) ? (
                                <Typography
                                  style={{ color: "green", fontWeight: 600 }}
                                >
                                  Trực tuyến
                                </Typography>
                              ) : (
                                <Typography
                                  style={{ color: "red", fontWeight: 600 }}
                                >
                                  Lỗi
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              {Object.is(order.status, 1) ? (
                                <Chip
                                  label="Đang xử lý"
                                  style={{
                                    backgroundColor: "#9500AE",
                                    color: "white",
                                  }}
                                />
                              ) : Object.is(order.status, 2) ? (
                                <Chip
                                  label="Đang giao hàng"
                                  style={{
                                    backgroundColor: "orange",
                                    color: "white",
                                  }}
                                />
                              ) : Object.is(order.status, 3) ? (
                                <Chip
                                  label="Hoàn thành"
                                  style={{
                                    backgroundColor: "green",
                                    color: "white",
                                  }}
                                />
                              ) : (
                                <Chip
                                  label="Đã huỷ"
                                  style={{
                                    backgroundColor: "red",
                                    color: "white",
                                  }}
                                />
                              )}
                            </TableCell>
                            <TableCell>
                              {
                                <Moment
                                  format="DD/MM/YYYY HH:mm:ss"
                                  date={order.createdAt}
                                />
                              }
                            </TableCell>
                            <TableCell>
                              <Visibility
                                style={{
                                  color: "grey",
                                  cursor: "pointer",
                                  marginRight: 10,
                                  position: "relative",
                                  right: 35,
                                }}
                                onClick={() =>
                                  history.push("/order/detail", {
                                    order: { ...order, userId: user },
                                  })
                                }
                                // onClick={() => console.log({ order: { ...order, userId: user } })}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
        </Grid>
      </Grid>
    </>
  );
};

export default DetailUser;
