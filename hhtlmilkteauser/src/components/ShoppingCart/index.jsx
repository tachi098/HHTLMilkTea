import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, CssBaseline, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Add, DeleteOutline, Remove } from "@material-ui/icons";
import {
  OrderDelteOrderDetail,
  OrderUpdateQuantity,
} from "../../store/actions/OrderAction";
import { GroupOrderFindAllAction } from "../../store/actions/GroupOrderAction";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    minHeight: 400,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  btnCount: {
    background: "none",
    border: "none",
    cursor: "pointer",
    paddingTop: 14,
    color: "#3250a8",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const ShoppingCart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { order, totalPrice } = useSelector((state) => state.order);
  const auth = useSelector((state) => state.auth);

  //support group member

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

  const onHandleRedirectCheckout = () => {
    // localStorage.setItem("check", "true")
    window.location.href = "/checkout";
    localStorage.setItem("map", "refresh");
    localStorage.removeItem("group");
  };

  const onHandleUpdateQuantity = (orderDetailId, action) => {
    const username = auth?.user?.username;
    const type = "team";
    const orderID = order?.id;
    dispatch(
      OrderUpdateQuantity(
        { orderDetailId, action },
        { username, type, orderID }
      )
    );
  };

  const onHandleDeleteOrderDetail = (id) => {
    const username = auth?.user?.username;
    const type = "team";
    const orderID = order?.id;
    dispatch(OrderDelteOrderDetail(id, { username, type, orderID }));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Giỏ hàng
          </Typography>

          <React.Fragment>
            <Grid container spacing={3} style={{ marginTop: 10 }}>
              <Grid item sm={12} md={12}>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <b>Hình ảnh</b>
                        </TableCell>
                        <TableCell>
                          <b>Sản phẩm</b>
                        </TableCell>
                        <TableCell align="left">
                          <b>Số lượng</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Giá</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Tổng</b>
                        </TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order?.orderDetails?.length > 0 ? (
                        order?.orderDetails?.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell align="center">
                              <img
                                alt={item.product.name}
                                src={item.product.linkImage}
                                width={100}
                              />
                            </TableCell>
                            <TableCell>
                              <p>{item.product.name}</p>
                              <span style={{ fontSize: 12, color: "red" }}>
                                {item.sizeOptionId}{" "}
                                {item.addOptionId !== "" &&
                                  ": " + item.addOptionId}
                              </span>
                            </TableCell>
                            <TableCell align="center">
                              <div
                                style={{
                                  display: "flex",
                                  marginTop: -10,
                                  marginLeft: -20,
                                }}
                              >
                                <div
                                  className={classes.btnCount}
                                  onClick={() => {
                                    if (item.quantity > 1) {
                                      onHandleUpdateQuantity(item.id, "minus");
                                    }
                                  }}
                                >
                                  <Remove />
                                </div>
                                <p
                                  style={{
                                    marginLeft: 20,
                                    marginRight: 20,
                                    fontSize: 16,
                                  }}
                                  translate="no"
                                >
                                  {item.quantity}
                                </p>
                                <div
                                  className={classes.btnCount}
                                  onClick={() => {
                                    onHandleUpdateQuantity(item.id, "plus");
                                  }}
                                >
                                  <Add />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell align="center">
                              {item.priceCurrent.toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </TableCell>
                            <TableCell align="center">
                              {(
                                item.priceCurrent * item.quantity
                              ).toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </TableCell>
                            <TableCell align="center">
                              <DeleteOutline
                                style={{ color: "red", cursor: "pointer" }}
                                onClick={() => {
                                  onHandleDeleteOrderDetail(item.id);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            <b style={{ color: "red" }}>
                              Không có sản phẩm trong giỏ hàng
                            </b>
                          </TableCell>
                        </TableRow>
                      )}

                      <TableRow>
                        <TableCell colSpan={5}>
                          <b>Tổng tiền thanh toán</b>
                        </TableCell>
                        <TableCell align="right">
                          <b>
                            {totalPrice.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </b>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={onHandleRedirectCheckout}
                  disabled={order?.orderDetails?.length > 0 ? false : true}
                >
                  Đặt hàng
                </Button>
              </Grid>
            </Grid>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default ShoppingCart;
