import {
  Button,
  Grid,
  makeStyles,
  Typography,
  CssBaseline,
  Chip,
  Dialog,
  DialogContent,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useHistory, useLocation } from "react-router";
import BarCode from "react-barcode";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { OrderStatusUpdate } from "../../../../store/actions/HistoryAction";
import { RatingAddAction } from "../../../../store/actions/RatingAction";
import { confirmAlert } from "react-confirm-alert";
import Notification from "./../../../../common/Notification";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    borderBottom: "1px solid #ececec",
  },
  root: {
    display: "flex",
    paddingBottom: 5,
    boxShadow: "none",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  cover: {
    width: 80,
    height: 100,
  },
  voucher: {
    paddingRight: 20,
    paddingBottom: 20,
  },
  orderDetail: {
    padding: 0,
  },
  titleOrder: {
    fontSize: 14,
    display: "flex",
    color: "#3fb4a5",
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottom: "1px solid #ececec",
  },
  contentOrder: {
    padding: 20,
  },
  price: {
    paddingLeft: "55%",
    paddingTop: 35,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "5%",
    },
  },
  total: {
    paddingLeft: "75%",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "30%",
    },
  },
  barOrder: {
    display: "flex",
    padding: 20,
    paddingLeft: "65%",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "20%",
    },
  },
  title: {
    paddingLeft: 20,
  },
  wrapBarCode: {
    "& svg": {
      width: 150,
      height: 70,
    },
  },
  table: {
    borderBottom: 0,
  },
  cellWithoutBorder: {
    borderBottom: "none",
  },
  star: {
    color: "#e4e5e9",
    fontSize: 40,
  },
  starSelected: {
    color: "#ffc107",
    fontSize: 40,
  },
}));

const HistoryDetail = () => {
  const classes = useStyles();

  const location = useLocation();
  const [order] = useState(location?.state?.order);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleOnDelete = (id, memberVip) => {
    dispatch(OrderStatusUpdate({ id, status: 4 }, memberVip));
    history.push("/account/history/");
    Notification.success("Đã hủy thành công");
  };
  const [open, setOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const customer = useSelector((state) => state.customer);

  const handleDelete = (id, memberVip) => {
    confirmAlert({
      title: "THÔNG BÁO",
      message: "Bạn có chắc muốn hủy đơn hàng này không?",
      buttons: [
        {
          label: "Có",
          onClick: () => handleOnDelete(id, memberVip),
        },
        {
          label: "Không",
        },
      ],
    });
  };



  // Rating

  const [checkRate, setCheckRate] = useState(false);
  const { ratings } = useSelector((state) => state.rating);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [rate, setRate] = useState(null);
  const [rateChange, setRateChange] = useState(null);
  const [content, setContent] = useState("");

  const onHandleRating = () => {
    const data = {
      rate: rate,
      content: content,
      username: auth.user.username,
      orderId: order.id
    }
    setOpen(false);
    setCheckRate(true);
    dispatch(RatingAddAction(data));
    Notification.success("Đánh giá thành công!");
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Đơn Hàng
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Grid container spacing={3}>
              <Grid
                item
                md={12}
                xl={12}
                sm={12}
                className={classes.wrapBarCode}
              >
                Mã đơn hàng: <BarCode value={order.id} />
              </Grid>
              <Grid item md={6} xl={6} sm={12}>
                Ngày đặt hàng: {moment(order.createdAt).format("YYYY-MM-DD")}
              </Grid>
              <Grid item md={6} xl={6} sm={12}>
                Lưu ý thêm: {order.noteOrder}
              </Grid>
              <Grid item md={6} xl={6} sm={12}>
                Phương thức thanh toán:
                {order.payment === 1 && (
                  <span style={{ color: "black", fontWeight: 600 }}>
                    Tiền mặt
                  </span>
                )}
                {order.payment === 2 && (
                  <span style={{ color: "green", fontWeight: 600 }}>
                    Trực tuyến
                  </span>
                )}
              </Grid>
              <Grid item md={6} xl={6} sm={12}>
                Tình trạng:
                {order.status === 1 && (
                  <Chip
                    label="Đang xử lý"
                    style={{ backgroundColor: "pearl", color: "white" }}
                  />
                )}
                {order.status === 2 && (
                  <Chip
                    label="Đang giao hàng"
                    style={{ backgroundColor: "lightblue", color: "white" }}
                  />
                )}
                {order.status === 3 && (
                  <Chip
                    label="Hoàn thành"
                    style={{ backgroundColor: "green", color: "white" }}
                  />
                )}
                {order.status === 4 && (
                  <Chip
                    label="Đã hủy"
                    style={{ backgroundColor: "red", color: "white" }}
                  />
                )}
              </Grid>
              <Grid item md={6} xl={6} sm={12}>
                Người đặt hàng: {order.userId.fullName}
              </Grid>
              <Grid item md={6} xl={6} sm={12}>
                Số điện thoại: {order.phone}
              </Grid>
              <Grid item md={12} xl={12} sm={12}>
                Địa chỉ: {order.address}
              </Grid>
            </Grid>
          </Typography>

          {
            ratings.find((r) => Object.is(r.orderId, location?.state?.order.id)) && (
              <React.Fragment >
                <div style={{ marginTop: 10, marginLeft: 20 }}>
                  <Typography variant="h6" >Đánh giá</Typography>
                  {[...Array(ratings.find((r) => Object.is(r.orderId, location?.state?.order.id)).rate)].map((item, index) => (
                    <StarIcon key={index} className={classes.starSelected} />
                  ))}
                  {[...Array(5 - ratings.find((r) => Object.is(r.orderId, location?.state?.order.id)).rate)].map((item, index) => (
                    <StarIcon key={index} className={classes.star} />
                  ))}
                  <Typography variant="body1"><b>Nội dung đánh giá: </b></Typography>
                  <div style={{ height: 80, overflow: "scroll", width: 500 }}>
                    <p >{ratings.find((r) => Object.is(r.orderId, location?.state?.order.id)).content}</p>
                  </div>
                </div>
              </React.Fragment>
            )
          }

          <React.Fragment>
            <Grid container spacing={3} style={{ marginTop: 10 }}>
              <Grid item xs={12} md={12}>
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
                                <p
                                  style={{
                                    marginLeft: 20,
                                    marginRight: 20,
                                    fontSize: 16,
                                  }}
                                >
                                  {item.quantity}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell align="center">
                              {item.product.price.toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </TableCell>
                            <TableCell align="center">
                              {(
                                item.product.price * item.quantity
                              ).toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            <b style={{ color: "red" }}>
                              Không có sản phẩm trong giỏ hàng
                            </b>
                          </TableCell>
                        </TableRow>
                      )}
                      {order?.groupMembers?.length > 0 &&
                        order?.groupMembers?.map((item) =>
                          item?.groupOrderDetails.map((detail) => (
                            <TableRow key={detail.id}>
                              <TableCell align="center">
                                <img
                                  alt={detail.product.name}
                                  src={detail.product.linkImage}
                                  width={100}
                                />
                              </TableCell>
                              <TableCell>
                                <p>{detail.product.name}</p>
                                <span style={{ fontSize: 12, color: "red" }}>
                                  {detail.sizeOptionId}{" "}
                                  {detail.addOptionId !== "" &&
                                    ": " + detail.addOptionId}
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
                                  <p
                                    style={{
                                      marginLeft: 20,
                                      marginRight: 20,
                                      fontSize: 16,
                                    }}
                                  >
                                    {detail.quantity}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell align="center" translate="no">
                                {detail.product.price.toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </TableCell>
                              <TableCell align="center" translate="no">
                                {(
                                  detail.product.price * detail.quantity
                                ).toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </TableCell>
                            </TableRow>
                          ))
                        )}

                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className={classes.cellWithoutBorder}
                        />
                        <TableCell className={classes.cellWithoutBorder}>
                          <b style={{ paddingLeft: 130 }}>Tạm tính:</b>
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.cellWithoutBorder}
                        >
                          <b style={{ paddingRight: 45 }} translate="no">
                            {
                              ((order.totalPrice - order.shipping + order.memberVip) / 1.05
                              ).toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                          </b>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className={classes.cellWithoutBorder}
                        />
                        <TableCell className={classes.cellWithoutBorder}>
                          <b style={{ paddingLeft: 130 }}>Thuế (5%):</b>
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.cellWithoutBorder}
                        >
                          <b style={{ paddingRight: 45 }} translate="no">
                            {
                              ((order.totalPrice - order.shipping + order.memberVip) / 1.05 * 0.05
                              ).toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                          </b>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className={classes.cellWithoutBorder}
                        />
                        <TableCell className={classes.cellWithoutBorder}>
                          <b style={{ paddingLeft: 130 }}>Phí vận chuyển:</b>
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.cellWithoutBorder}
                        >
                          <b style={{ paddingRight: 45 }} translate="no">
                            {order.shipping.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </b>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} />
                        <TableCell>
                          <b style={{ paddingLeft: 130 }}>Giảm giá:</b>
                        </TableCell>
                        <TableCell align="right">
                          <b style={{ paddingRight: 45 }} translate="no">
                            {order.memberVip.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </b>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} />
                        <TableCell>
                          <b style={{ fontSize: 20, paddingLeft: 0 }}>
                            Tổng tiền thanh toán:
                          </b>
                        </TableCell>
                        <TableCell align="right">
                          <b
                            style={{ fontSize: 20, paddingRight: 45 }}
                            translate="no"
                          >
                            {(order.totalPrice).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </b>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <div style={{ display: "flex" }}>
                  {order.status === 1 && (
                    <Button
                      style={{ margin: 10 }}
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={() => handleDelete(order.id, order.memberVip)}
                    >
                      Hủy đơn hàng
                    </Button>
                  )}
                  <Button
                    style={{ margin: 10 }}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => history.push("/account/history")}
                  >
                    Quay lại
                  </Button>
                  <div style={{ display: "flex" }}>
                    {order.status === 3 && (
                      <Button
                        style={{ margin: 10 }}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleClickOpen}
                        disabled={customer?.customer?.orders?.find((o) => Object.is(o.id, location?.state?.order.id)).rating === true ? true : checkRate}
                      >
                        Đánh giá
                      </Button>
                    )}

                    {order.status === 3 && (!customer?.customer?.orders?.find((o) => Object.is(o.id, location?.state?.order.id)).rating && !checkRate) && (
                      <p style={{ color: "red", fontSize: 16, marginTop: 20 }}>
                        Đánh giá để nhận ngay 100 điểm
                      </p>
                    )}
                  </div>
                </div>
              </Grid>
            </Grid>
          </React.Fragment>
        </Paper>
      </main>

      <Dialog
        open={open}
        keepMounted
        maxWidth="md"
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent
          style={{ minHeight: 400, marginLeft: 30, marginRight: 30 }}
        >
          <h1>Đánh giá</h1>
          <div style={{ display: "flex", minHeight: 60 }}>
            {[...Array(5)].map((item, index) => (
              <label key={index}>
                <input
                  type="radio"
                  style={{ display: "none" }}
                  onClick={() => setRate(index + 1)}
                />
                <StarIcon
                  className={
                    index + 1 <= rateChange ||
                      (index + 1 <= rate && rateChange === null)
                      ? classes.starSelected
                      : classes.star
                  }
                  onMouseEnter={() => {
                    setRateChange(index + 1);
                  }}
                  onMouseLeave={() => {
                    setRateChange(null);
                  }}
                />
              </label>
            ))}

            <p style={{ marginLeft: 30, fontSize: 16 }}>
              {rate === 1 && rateChange === null
                ? "Rất tệ"
                : rate === 2 && rateChange === null
                  ? "Tệ"
                  : rate === 3 && rateChange === null
                    ? "Ổn"
                    : rate === 4 && rateChange === null
                      ? "Tốt"
                      : rate === 5 && rateChange === null && "Tuyệt vời"}
            </p>
            <p style={{ marginLeft: 30, fontSize: 16 }}>
              {rateChange === 1
                ? "Rất tệ"
                : rateChange === 2
                  ? "Tệ"
                  : rateChange === 3
                    ? "Ổn"
                    : rateChange === 4
                      ? "Tốt"
                      : rateChange === 5 && "Tuyệt vời"}
            </p>
          </div>

          <div style={{ marginTop: 10 }}>
            <Typography style={{ marginRight: 60, fontFamily: "sans-serif" }}>
              <b>Ghi chú: </b>
            </Typography>
            <TextField
              style={{ height: 120, overflowY: "scroll" }}
              multiline
              rowsmin={5}
              aria-label="minimum height"
              minRows={5}
              placeholder="Đánh giá của bạn về chất lượng của chúng tôi?"
              fullWidth
              onChange={e => { setContent(e.target.value) }}
            />
          </div>

          <div
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="contained" color="primary" onClick={onHandleRating} disabled={rate === null ? true : false}>
              Gửi đánh giá
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setOpen(false)}>
              Quay lại
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default HistoryDetail;
