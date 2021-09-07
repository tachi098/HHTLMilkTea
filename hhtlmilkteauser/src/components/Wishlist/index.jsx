import React, { useEffect, useState } from "react";
import productImg from "./../../assets/img/product.png";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  CardMedia,
  CssBaseline,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutline, ShoppingCartRounded } from "@material-ui/icons";
import { deleteWishlist } from "../../store/actions/UserAction";
import { OrderAddAction } from "../../store/actions/OrderAction";
import { useForm } from "react-hook-form";
import popupBg from "./../../assets/img/bg_popup.png";
import Notification from "../../common/Notification";
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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: "none",
    backgroundColor: "#fafafa",
    "&:hover": {
      boxShadow: "2px 4px 4px 2px  #a5abb5",
    },
  },
  cardMedia: {
    display: "block",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 20,
    paddingTop: "76.25%",
    width: "60%",
  },
  cardContent: {
    flexGrow: 1,
  },
  btnOrder: {
    color: "#0c713d",
    fontSize: 16,
    border: "1px solid",
    paddingRight: 10,
    paddingLeft: 10,
    "&:hover": {
      backgroundColor: "#0c713d",
      color: "white",
    },
  },
  iconButton: {
    marginTop: 8,
  },
  formControl: {
    marginTop: -3,
    minWidth: 200,
  },
  cardMediaModal: {
    display: "block",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 20,
    paddingTop: "100%",
    width: "100%",
  },
  rdSize: {
    padding: 3,
    backgroundColor: "#1db4ff",
    outline: "none",
  },
  searchItem: {
    display: "flex",
    padding: 25,
    borderRight: "2px solid #ececec",
    [theme.breakpoints.down("sm")]: {
      borderRight: "none",
      paddingLeft: 40,
    },
  },
  itemHeader: {
    position: "relative",
  },
  iconWishList: {
    position: "absolute",
    marginLeft: "85%",
    marginTop: "5%",
    fontSize: 30,
    color: "#9e9796",
    "&:hover": {
      color: "#416c48",
    },
  },
  iconWishListSelected: {
    position: "absolute",
    marginLeft: "85%",
    marginTop: "5%",
    fontSize: 30,
    color: "#416c48",
  },
  itemTag: {
    backgroundColor: "#416c48",
    padding: "3px 8px",
    color: "white",
    marginLeft: "5%",
    position: "absolute",
    fontSize: 9,
    fontWeight: "bold",
  },
  descriptionCard: {
    backgroundImage: `url(${popupBg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  notSelect: {
    cursor: "pointer",
    color: "#0c713d",
    fontSize: 16,
    border: "1px solid",
    paddingRight: 10,
    paddingLeft: 10,
    "&:hover": {
      backgroundColor: "#0c713d",
      color: "white",
    },
  },
  btnNotSelected: {
    fontFamily: "sans-serif",
    cursor: "pointer",
    color: "#0c713d",
    fontSize: 14,
    border: "1px solid",
    borderRadius: 5,
    padding: 3,
    marginTop: 5,
    "&:hover": {
      backgroundColor: "#0c713d",
      color: "white",
    },
  },
  btnSelected: {
    fontFamily: "sans-serif",
    cursor: "pointer",
    marginTop: 5,
    fontSize: 14,
    border: "1px solid",
    borderRadius: 5,
    padding: 3,
    backgroundColor: "#0c713d",
    color: "white",
  },
}));

const Wishlist = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.customer);
  const auth = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const [productSelect, setProductSelect] = useState("");

  const [selectedSize, setSelectedSize] = useState();

  const [selectedAdd, setSelectedAdd] = useState([]);

  const [count, setCount] = useState(1);

  const [currentPrice, setCurrentPrice] = useState(0);

  const [note, setNote] = useState("");

  const [size, setSize] = useState([]);

  const { handleSubmit } = useForm();

  //support group member
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

  const handleClickOpen = (item) => {
    if (auth?.user?.token) {
      setProductSelect(item);
      setCurrentPrice(
        item.price * (item?.saleOff?.discount ? 1 - item?.saleOff?.discount : 1)
      );
      const items = [...item.sizeOptions];
      setSize(items.sort((a, b) => a.price - b.price));
      setSelectedSize(items.sort((a, b) => a.price - b.price)[0]);
      setCount(1);
      setOpen(true);
      setSelectedAdd([]);
    } else {
      Notification.error("Vui lòng đăng nhập trước khi mua hàng!");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCount(1);
    setSelectedAdd([]);
    setNote("");
  };

  const onHandleDelete = (id) => {
    dispatch(deleteWishlist({ userId: auth.user.id, productId: id }));
    Notification.warn("Đã xoá sản phẩm khỏi yêu thích!");
  };

  const onHandleNote = (e) => {
    setNote(e.target.value);
  };

  const onHandleSelectSize = (item) => {
    setSelectedSize(item);
    var price =
      productSelect.price *
      (productSelect?.saleOff?.discount
        ? 1 - productSelect?.saleOff?.discount
        : 1);
    price += item.price;
    price += selectedAdd.reduce((a, b) => a + (b["price"] || 0), 0);
    setCurrentPrice(price);
  };

  const onHandleMinus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const onHandlePlus = () => {
    setCount(count + 1);
  };

  const onHandleSelectAdd = (item) => {
    if (!selectedAdd.includes(item)) {
      setSelectedAdd([...selectedAdd, item]);
      setCurrentPrice(currentPrice + item.price);
    } else {
      setSelectedAdd(selectedAdd.filter((elm) => !Object.is(elm, item)));
      setCurrentPrice(currentPrice - item.price);
    }
  };

  const onSubmit = (data) => {
    data.product = JSON.stringify(productSelect);
    data.userId = auth.user.id;
    data.sizeOption = selectedSize?.name ? selectedSize.name : "";
    data.quantity = count;

    if (selectedAdd?.length > 0) {
      const result = selectedAdd.map((a) => a.name).sort();
      var temp = "";
      for (let i = 0; i < result.length; i++) {
        if (Object.is(i, 0)) {
          temp = temp.concat(result[i]);
        } else {
          temp = temp.concat(", " + result[i]);
        }
      }

      data.additionOption = temp;
    } else {
      data.additionOption = "";
    }

    data.priceCurrent = currentPrice;
    data.note = note;

    const username = auth?.user?.username;
    const orderID = order?.id;
    const type = "team";
    dispatch(OrderAddAction(data, { username, type, orderID }));
    dispatch(
      deleteWishlist({ userId: auth.user.id, productId: productSelect.id })
    );
    setOpen(false);
    Notification.success("Đã thêm sản phẩm vào giỏ hàng");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Trang yêu thích
          </Typography>

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
                        <TableCell align="center">
                          <b>Giá</b>
                        </TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {wishlist?.products?.length > 0 ? (
                        wishlist?.products?.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell align="center">
                              {item?.saleOff?.discount && (
                                <span
                                  className={classes.itemTag}
                                  style={{ backgroundColor: "red" }}
                                >
                                  Giảm giá {item?.saleOff?.discount * 100}%
                                </span>
                              )}
                              <img
                                alt={item.name}
                                src={item.linkImage}
                                width={100}
                              />
                            </TableCell>
                            <TableCell>
                              <p>{item.name}</p>
                            </TableCell>
                            <TableCell align="center">
                              {(
                                item.price *
                                (item?.saleOff?.discount
                                  ? 1 - item?.saleOff?.discount
                                  : 1)
                              ).toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </TableCell>
                            <TableCell align="center">
                              <DeleteOutline
                                style={{
                                  color: "red",
                                  cursor: "pointer",
                                  marginLeft: 14,
                                }}
                                onClick={() => {
                                  onHandleDelete(item.id);
                                }}
                              />
                              <ShoppingCartRounded
                                onClick={() => handleClickOpen(item)}
                                style={{ color: "#416c48", cursor: "pointer" }}
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            <b style={{ color: "red" }}>
                              Không có sản phẩm trong yêu thích
                            </b>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className={classes.descriptionCard}>
            <div
              id="alert-dialog-slide-description"
              style={{ display: "flex" }}
            >
              <Grid container>
                <Grid item xs={12} md={6}>
                  {productSelect.linkImage ? (
                    <CardMedia
                      className={classes.cardMedia}
                      image={productSelect.linkImage}
                      title="Image title"
                    />
                  ) : (
                    <CardMedia
                      className={classes.cardMedia}
                      image={productImg}
                      title="Image title"
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    style={{
                      textAlign: "center",
                      fontSize: 36,
                      fontWeight: "bold",
                      color: "#0c713d",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {productSelect.name}
                  </Typography>
                  <Typography style={{ textAlign: "center", fontSize: 14 }}>
                    {productSelect.title}
                  </Typography>

                  <div style={{ height: 300, width: 400, overflowY: "scroll" }}>
                    {productSelect?.sizeOptions?.length > 0 && (
                      <div style={{ display: "flex", marginTop: 40 }}>
                        <Typography
                          style={{ marginRight: 60, fontFamily: "sans-serif" }}
                        >
                          <b>Kích thước: </b>
                        </Typography>
                        <div style={{ marginLeft: -42, marginTop: -10 }}>
                          {size?.map((item) => (
                            <div
                              key={item.id}
                              size="small"
                              color="primary"
                              className={
                                selectedSize?.id === item.id
                                  ? classes.btnSelected
                                  : classes.btnNotSelected
                              }
                              onClick={() => {
                                onHandleSelectSize(item);
                              }}
                            >
                              {item.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {productSelect?.additionOptions?.length > 0 && (
                      <div style={{ display: "flex", marginTop: 20 }}>
                        <Typography
                          style={{ marginRight: 60, fontFamily: "sans-serif" }}
                        >
                          <b>Thêm: </b>
                        </Typography>
                        <div>
                          {productSelect?.additionOptions?.map((item) => (
                            <div
                              key={item.id}
                              size="small"
                              color="primary"
                              className={
                                selectedAdd.length > 0 &&
                                  selectedAdd.includes(item)
                                  ? classes.btnSelected
                                  : classes.btnNotSelected
                              }
                              onClick={() => {
                                onHandleSelectAdd(item);
                              }}
                            >
                              {item.name +
                                " + " +
                                (item.price
                                  ? item.price
                                  : 0
                                ).toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ display: "flex", marginTop: 30 }}>
                      <Typography
                        style={{ marginRight: 60, fontFamily: "sans-serif" }}
                      >
                        <b>Số lượng: </b>
                      </Typography>
                      <div style={{ display: "flex", marginTop: -10 }}>
                        <div
                          className={classes.btnCount}
                          onClick={onHandleMinus}
                        >
                          -
                        </div>
                        <p style={{ marginLeft: 20, marginRight: 20 }}>
                          {count}
                        </p>
                        <div
                          className={classes.btnCount}
                          onClick={onHandlePlus}
                        >
                          +
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", marginTop: 10 }}>
                      <Typography
                        style={{ marginRight: 60, fontFamily: "sans-serif" }}
                      >
                        <b>Ghi chú: </b>
                      </Typography>
                      <TextField
                        multiline
                        rowsmin={3}
                        aria-label="minimum height"
                        minRows={3}
                        placeholder=""
                        onChange={onHandleNote}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", marginTop: 50 }}>
                    <Typography
                      style={{ marginRight: 70, fontFamily: "sans-serif" }}
                    >
                      <b>Tổng tiền: </b>
                    </Typography>
                    <Typography
                      style={{
                        textAlign: "center",
                        color: "#0c713d",
                        fontWeight: "bold",
                      }}
                    >
                      {(currentPrice
                        ? currentPrice * count
                        : 0
                      ).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <Button
                type="submit"
                size="small"
                color="primary"
                className={classes.btnOrder}
              >
                Đặt hàng
              </Button>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default Wishlist;
