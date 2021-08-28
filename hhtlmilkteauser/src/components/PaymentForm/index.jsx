import {
  Badge,
  Button,
  FormHelperText,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
// import { checkoutOrder } from "../../store/actions/OrderAction";
import Momo from "../Momo";
import { MonetizationOnOutlined } from "@material-ui/icons";
import momo from "./../../assets/img/MoMoLogo.png";
import { GroupOrderFindAllAction } from "../../store/actions/GroupOrderAction";

import VNPayLogo from "./../../assets/img/VNPAY.png";
import publicIp from "public-ip";
import queryString from "query-string";
import dateFormat from "dateformat";
import sha256 from "sha256";

const HASH_SECRET = "XPUQZNZXYYUJAXXLMAJPLEAAQZYXVNCA";
const TMNCODE = "ZYP5A0IS";
const VNP_URL = "http://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const VNP_RETURN = "http://localhost:3000/checkoutresult-vnpay";

function sortObject(o) {
  const sorted = {};
  const onlyKey = [];
  for (const key in o) {
    if (o.hasOwnProperty(key)) {
      onlyKey.push(key);
    }
  }
  onlyKey.sort();
  Array.from({ length: onlyKey.length }, (elm, idx) => {
    sorted[onlyKey[idx]] = o[onlyKey[idx]];
    return null;
  });
  return sorted;
}

const useStyles = makeStyles((theme) => ({
  btnReloadMap: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    border: "none",
    backgroundColor: "#2454b5",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  btnReloadMapDisable: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    border: "none",
    backgroundColor: "gray",
    fontWeight: "bold",
    cursor: "pointer",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
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
}));

const PaymentForm = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const { order, totalPrice } = useSelector((state) => state.order);
  const { customer } = useSelector((state) => state.customer);
  const address = location.state?.address;
  const [orderID, setOrderID] = useState("");
  const [total, setTotal] = useState(0);
  const [memberVip, setMemberVip] = useState(0);
  const [mark, setMark] = useState(0);
  const [err, setErr] = useState("");
  const { dataGroupOrderDetails } = useSelector((state) => state.groupOrder);

  //   support group member
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // document.querySelector("html").setAttribute("translate", "no");
  }, []);

  useEffect(() => {
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
  }, [auth?.user?.token, auth?.user?.username, dispatch, order?.id]);

  useEffect(() => {
    const refresh = async () => {
      if (!(await order)) {
        window.location.href = "/";
      }
    };
    refresh();
    return () => refresh();
  }, [order]);

  const onSubmit = () => {
    const data = {
      address: address.to,
      phone: address.phone,
      shipping: +address.shippingPrice,
      payment: "cod",
      orderId: order.id,
      note: address.note,
      totalPrice: localStorage.getItem("group")
        ? +address.shippingPrice +
          +dataGroupOrderDetails?.totalPriceGroup -
          mark +
          +dataGroupOrderDetails?.totalPriceGroup * 0.05
        : +address.shippingPrice + +totalPrice - mark + +totalPrice * 0.05,
      memberVip: mark,
      total: localStorage.getItem("group")
        ? +dataGroupOrderDetails?.totalPriceGroup
        : +totalPrice,
    };
    localStorage.setItem("order-cod", JSON.stringify(data));
    // dispatch(checkoutOrder(data));
    window.location.href = "/checkoutresult?errorCode=0&payment=cod";
  };

  const handlerMomo = () => {
    setOrderID(order.id + "-" + new Date().getTime());
    setTotal(
      localStorage.getItem("group")
        ? +address.shippingPrice +
            +dataGroupOrderDetails?.totalPriceGroup -
            mark +
            +dataGroupOrderDetails?.totalPriceGroup * 0.05
        : +address.shippingPrice + +totalPrice - mark + +totalPrice * 0.05
    );
    localStorage.removeItem("order");
    localStorage.setItem(
      "order",
      JSON.stringify({
        orderId: order.id,
        totalPrice: localStorage.getItem("group")
          ? +address.shippingPrice +
            +dataGroupOrderDetails?.totalPriceGroup -
            mark +
            +dataGroupOrderDetails?.totalPriceGroup * 0.05
          : +address.shippingPrice + +totalPrice - mark + +totalPrice * 0.05,
        memberVip: mark,
        address: address.to,
        phone: address.phone,
        shipping: +address.shippingPrice,
        payment: "momo",
        note: address.note,
        total: localStorage.getItem("group")
          ? +dataGroupOrderDetails?.totalPriceGroup
          : +totalPrice,
      })
    );
  };

  const onHandleMemberVip = (e) => {
    setMemberVip(e.target.value);
  };

  const onHandleMarkChange = () => {
    const reg = /^\d+$/;
    if (reg.test(memberVip)) {
      if (memberVip <= customer?.memberVip?.mark) {
        if (memberVip >= 10000) {
          if (memberVip >= +address.shippingPrice + +totalPrice) {
            setMark(+address.shippingPrice + +totalPrice);
            setErr("");
          } else {
            setMark(Math.floor(memberVip / 1000) * 1000);
            setErr("");
          }
        } else {
          setErr("Điểm đổi tối thiểu 10000");
        }
      } else {
        setErr("Điểm nhập lớn hơn điểm bạn hiện có");
      }
    } else {
      setErr("Điểm nhập vào phải là số");
    }
  };

  const handlerVNPay = async () => {
    const tmnCode = TMNCODE;
    const secretKey = HASH_SECRET;
    const returnUrl = VNP_RETURN;

    const date = new Date();

    const createDate = dateFormat(date, "yyyymmddHHmmss");
    // const orderId = dateFormat(date, "HHmmss");
    const orderId = new Date().getTime();
    const amount = localStorage.getItem("group")
      ? (
          +address.shippingPrice +
          +dataGroupOrderDetails?.totalPriceGroup -
          mark +
          +dataGroupOrderDetails?.totalPriceGroup * 0.05
        ).toString()
      : (
          +address.shippingPrice +
          +totalPrice -
          mark +
          +totalPrice * 0.05
        ).toString();

    localStorage.removeItem("order");
    localStorage.setItem(
      "order",
      JSON.stringify({
        orderId: order.id,
        totalPrice: localStorage.getItem("group")
          ? +address.shippingPrice +
            +dataGroupOrderDetails?.totalPriceGroup -
            mark +
            +dataGroupOrderDetails?.totalPriceGroup * 0.05
          : +address.shippingPrice + +totalPrice - mark + +totalPrice * 0.05,
        memberVip: mark,
        address: address.to,
        phone: address.phone,
        shipping: +address.shippingPrice,
        payment: "vnpay",
        note: address.note,
        total: localStorage.getItem("group")
          ? +dataGroupOrderDetails?.totalPriceGroup
          : +totalPrice,
      })
    );

    const bankCode = "NCB";

    const orderInfo = "vnpay";
    const orderType = "topup";
    const locale = "vn";
    const currCode = "VND";
    const set_vnp_Params = {};

    set_vnp_Params["vnp_Version"] = "2";
    set_vnp_Params["vnp_Command"] = "pay";
    set_vnp_Params["vnp_TmnCode"] = tmnCode;
    set_vnp_Params["vnp_Locale"] = locale;
    set_vnp_Params["vnp_CurrCode"] = currCode;
    set_vnp_Params["vnp_TxnRef"] = orderId;
    set_vnp_Params["vnp_OrderInfo"] = orderInfo;
    set_vnp_Params["vnp_OrderType"] = orderType;
    set_vnp_Params["vnp_Amount"] = amount * 100;
    set_vnp_Params["vnp_ReturnUrl"] = returnUrl;
    set_vnp_Params["vnp_IpAddr"] = await publicIp.v4();
    set_vnp_Params["vnp_CreateDate"] = createDate;
    set_vnp_Params["vnp_BankCode"] = bankCode;

    const vnp_Params = sortObject(set_vnp_Params);

    const signData =
      secretKey + queryString.stringify(vnp_Params, { encode: false });

    // var sha256 = require('sha256');

    const secureHash = sha256(signData);

    vnp_Params["vnp_SecureHashType"] = "SHA256";
    vnp_Params["vnp_SecureHash"] = secureHash;
    const vnpUrl =
      VNP_URL + "?" + queryString.stringify(vnp_Params, { encode: true });
    window.location.href = vnpUrl;
    // setUrl(vnpUrl);
  };

  const sumQuery = queryString.parse(window.location.search);
  if (JSON.stringify(sumQuery) !== JSON.stringify({})) {
    console.log("get result params", sumQuery);
    const returnSecretHash = sumQuery["vnp_SecureHash"].toString();
    delete sumQuery["vnp_SecureHash"];
    delete sumQuery["vnp_SecureHashType"];
    const returnSignData =
      HASH_SECRET + queryString.stringify(sumQuery, { encode: false });
    const enc256 = sha256(returnSignData);
    if (enc256 === returnSecretHash) {
      console.log("bang nhau");
    } else console.log("fail checksum");
  }

  return (
    <div>
      {Object.is(address, undefined) &&
        (window.location.href = "/shoppingcart")}
      <main className={classes.layout}>
        {console.log("data:", dataGroupOrderDetails)}
        <Paper className={classes.paper}>
          <Typography
            variant="h4"
            gutterBottom
            style={{ textAlign: "center", marginBottom: 30 }}
          >
            THANH TOÁN
          </Typography>
          <Grid container spacing={3}>
            <Grid item sm={12} md={7}>
              <Typography variant="h6" gutterBottom>
                Điạ chỉ giao hàng
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Tên người nhận: </b>
                {customer.fullName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Địa chỉ: </b>
                {address?.to}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Số điện thoại: </b>
                {address?.phone}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Email: </b>
                {customer.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Ghi chú đơn hàng: </b>
                {address?.note === "" ? "Không có ghi chú" : address?.note}
              </Typography>
              <Link
                to=""
                style={{ textDecoration: "none" }}
                onClick={() => {
                  window.location.href = "/checkout";
                }}
                variant="body2"
              >
                Chỉnh sửa
              </Link>
            </Grid>
            <Grid item sm={12} md={5}>
              <Typography variant="h6" gutterBottom>
                Giỏ hàng
              </Typography>
              <div style={{ overflowY: "scroll", height: 250 }}>
                <Table className={classes.table} aria-label="spanning table">
                  <TableBody>
                    {order?.orderDetails?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell align="center">
                          <span translate="no">
                            <Badge
                              badgeContent={item.quantity}
                              color="secondary"
                            >
                              <img
                                alt={item.product.name}
                                src={item.product.linkImage}
                                width={100}
                              />
                            </Badge>
                          </span>
                        </TableCell>
                        <TableCell>
                          <p>{item.product.name}</p>
                          <span style={{ fontSize: 12, color: "red" }}>
                            {item.sizeOptionId}{" "}
                            {item.addOptionId !== "" && ": " + item.addOptionId}
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          {(item.priceCurrent * item.quantity).toLocaleString(
                            "it-IT",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </TableCell>
                      </TableRow>
                    ))}

                    {localStorage.getItem("group") &&
                      dataGroupOrderDetails?.groupOrderInfoResponses?.length >
                        1 && (
                        <>
                          {dataGroupOrderDetails?.groupOrderInfoResponses?.map(
                            (data, index) => (
                              <React.Fragment key={index}>
                                {index > 0 &&
                                  data?.products?.map((item, productId) => (
                                    <TableRow key={productId}>
                                      <TableCell align="center">
                                        <Badge
                                          badgeContent={
                                            data.quantities[productId]
                                          }
                                          color="secondary"
                                        >
                                          <img
                                            alt={item.name}
                                            src={item.linkImage}
                                            width={100}
                                          />
                                        </Badge>
                                      </TableCell>
                                      <TableCell>
                                        <p>{item.name}</p>
                                        <span
                                          style={{ fontSize: 12, color: "red" }}
                                        >
                                          {data.sizeOptionIds[productId]}{" "}
                                          {data.addOptionIds[productId] !==
                                            "" &&
                                            ": " + data.addOptionIds[productId]}
                                        </span>
                                      </TableCell>
                                      <TableCell align="center">
                                        {(
                                          item.price *
                                          data.quantities[productId]
                                        ).toLocaleString("it-IT", {
                                          style: "currency",
                                          currency: "VND",
                                        })}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                              </React.Fragment>
                            )
                          )}
                        </>
                      )}

                    {/* {localStorage.getItem("group") &&
                      order?.groupMembers?.length > 0 && (
                        <>
                          {order?.groupMembers?.map((gm, i) => (
                            <React.Fragment key={i}>
                              {gm?.groupOrderDetails?.map((god, index) => (
                                <TableRow key={index}>
                                  <TableCell align="center">
                                    <Badge
                                      badgeContent={god.quantity}
                                      color="secondary"
                                    >
                                      <img
                                        alt={god.product.name}
                                        src={god.product.linkImage}
                                        width={100}
                                      />
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <p>{god.product.name}</p>
                                    <span
                                      style={{ fontSize: 12, color: "red" }}
                                    >
                                      {god.sizeOptionId}{" "}
                                      {god.addOptionId !== "" &&
                                        ": " + god.addOptionId}
                                    </span>
                                  </TableCell>
                                  <TableCell align="center">
                                    {(
                                      god.priceCurrent * god.quantity
                                    ).toLocaleString("it-IT", {
                                      style: "currency",
                                      currency: "VND",
                                    })}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </React.Fragment>
                          ))}
                        </>
                      )} */}
                  </TableBody>
                </Table>
              </div>
              <div
                style={{
                  marginLeft: 30,
                  marginBottom: 10,
                  marginTop: 20,
                  display: "flex",
                }}
              >
                <TextField
                  label="Nhập điểm đổi"
                  style={{ width: 350 }}
                  defaultValue={memberVip}
                  onChange={onHandleMemberVip}
                />
                <Button
                  onClick={onHandleMarkChange}
                  variant="contained"
                  color="primary"
                  disabled={memberVip > 0 ? false : true}
                >
                  Sử dụng
                </Button>
              </div>
              {err && (
                <FormHelperText style={{ color: "red", marginLeft: 30 }}>
                  {err}
                </FormHelperText>
              )}
            </Grid>
          </Grid>

          <Grid item sm={12} md={12}>
            <Typography variant="body1" gutterBottom>
              <b>Tạm tính: </b>
              <span translate="no">
                {(
                  (localStorage.getItem("group") &&
                    dataGroupOrderDetails?.totalPriceGroup) ??
                  totalPrice
                ).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Thuế (5%): </b>
              <span translate="no">
                {(
                  (localStorage.getItem("group") &&
                    +dataGroupOrderDetails?.totalPriceGroup * 0.05) ??
                  +totalPrice * 0.05
                ).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Phí vận chuyển: </b>
              <span translate="no">
                {(+address?.shippingPrice).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Giảm giá: </b>
              <span translate="no">
                {mark.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
                (làm tròn)
              </span>
            </Typography>
            <Typography variant="h6" gutterBottom>
              <b>Tổng tiền: </b>
              <span translate="no">
                {localStorage.getItem("group")
                  ? (
                      +address?.shippingPrice +
                      +dataGroupOrderDetails?.totalPriceGroup -
                      mark +
                      +dataGroupOrderDetails?.totalPriceGroup * 0.05
                    ).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })
                  : (
                      +address?.shippingPrice +
                      +totalPrice -
                      mark +
                      +totalPrice * 0.05
                    ).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
              </span>
            </Typography>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  onClick={handlerMomo}
                  startIcon={<img src={momo} width="40" alt="" />}
                >
                  Thanh toán momo
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginLeft: 20 }}
                  onClick={handlerVNPay}
                  startIcon={<img src={VNPayLogo} width="40" alt="" />}
                >
                  Thanh toán VNPay
                </Button>
                <Button
                  style={{ paddingTop: 13, paddingBottom: 13, marginLeft: 20 }}
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  onClick={onSubmit}
                  startIcon={<MonetizationOnOutlined />}
                >
                  Thanh toán khi nhận hàng
                </Button>
              </div>
              <Momo orderID={orderID} total={total} />
            </Grid>
          </Grid>
        </Paper>
      </main>
    </div>
  );
};

export default PaymentForm;
