import { Badge, Button, FormHelperText, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import { checkoutOrder } from "../../store/actions/OrderAction";
import Momo from "../Momo";
import { MonetizationOnOutlined } from "@material-ui/icons"
import momo from "./../../assets/img/MoMoLogo.png"

const useStyles = makeStyles((theme) => ({
    btnReloadMap: {
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        border: 'none',
        backgroundColor: '#2454b5',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    btnReloadMapDisable: {
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        border: 'none',
        backgroundColor: 'gray',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.down('xs')]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
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
    const { order, totalPrice } = useSelector((state) => state.order)
    const { customer } = useSelector((state) => state.customer)
    const address = location.state?.address;
    const [orderID, setOrderID] = useState("")
    const [total, setTotal] = useState(0)
    const [memberVip, setMemberVip] = useState(0)
    const [mark, setMark] = useState(0)
    const [err, setErr] = useState("");

    const onSubmit = () => {
        const data = {
            address: address.to,
            phone: address.phone,
            shipping: address.shippingPrice,
            payment: "cod",
            orderId: order.id,
            note: address.note,
            totalPrice: +address.shippingPrice + + totalPrice - (mark / 10),
            memberVip: mark
        }
        dispatch(checkoutOrder(data));
        window.location.href = "/checkoutresult?errorCode=0"
    }

    const handlerMomo = () => {
        setOrderID(order.id + new Date().getTime());
        setTotal(+address.shippingPrice + + totalPrice - (mark / 10))
        localStorage.removeItem("order");
        localStorage.setItem("order", JSON.stringify({
            orderId: order.id,
            totalPrice: +address.shippingPrice + + totalPrice - (mark / 10),
            memberVip: mark,
            address: address.to,
            phone: address.phone,
            shipping: address.shippingPrice,
            payment: "momo",
            note: address.note,
        }))
    }

    const onHandleMemberVip = (e) => {
        const reg = /^\d+$/;
        if (reg.test(e.target.value)) {
            if (e.target.value <= customer.memberVip.mark) {
                if (e.target.value >= 10000) {
                    setMemberVip(Math.floor(e.target.value / 1000) * 1000);
                    setErr("")
                } else {
                    setErr("Điểm đổi tối thiểu 10000")
                }
            } else {
                setErr("Điểm nhập lớn hơn điểm bạn hiện có")
            }
        } else {
            setErr("Điểm nhập vào phải là số")
        }
    }

    const onHandleMarkChange = () => {
        setMark(memberVip);
        setMemberVip(0);
    }

    return (
        <React.Fragment>
            {Object.is(address, undefined) && <Redirect to="/checkout" />}
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: 30 }}>
                        THANH TOÁN
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item sm={12} md={7} >
                            <Typography variant="h6" gutterBottom>
                                Điạ chỉ giao hàng
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <b>Tên người nhận: </b>{customer.fullName}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <b>Địa chỉ: </b>{address?.to}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <b>Số điện thoại: </b>{address?.phone}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <b>Email: </b>{customer.email}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <b>Ghi chú đơn hàng: </b>{address?.note === "" ? "Không có ghi chú" : address?.note}
                            </Typography>
                            <Link to="" style={{ textDecoration: 'none' }} onClick={() => { window.location.href = "/checkout" }} variant="body2">
                                chỉnh sửa
                            </Link>
                        </Grid>
                        <Grid item sm={12} md={5} >
                            <Typography variant="h6" gutterBottom>
                                Giỏ hàng
                            </Typography>
                            <div style={{ overflowY: "scroll", height: 250 }}>
                                <Table className={classes.table} aria-label="spanning table"  >
                                    <TableBody >
                                        {order?.orderDetails?.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell align="center">
                                                    <Badge badgeContent={item.quantity} color="secondary">
                                                        <img alt={item.product.name} src={item.product.linkImage} width={100} />
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <p>{item.product.name}</p>
                                                    <span style={{ fontSize: 12, color: 'red' }}>{item.sizeOptionId} {item.addOptionId !== "" && ": " + item.addOptionId}</span>
                                                </TableCell>
                                                <TableCell align="center">{(item.priceCurrent * item.quantity).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div style={{ marginLeft: 30, marginBottom: 10, marginTop: 20, display: 'flex' }}>
                                <TextField
                                    label="Nhập điểm đổi"
                                    style={{ width: 350 }}
                                    defaultValue={memberVip}
                                    onChange={onHandleMemberVip}
                                />
                                <Button onClick={onHandleMarkChange} variant="contained" color="primary" disabled={memberVip > 0 ? false : true}>Sử dụng</Button>
                            </div>
                            {err && (
                                <FormHelperText style={{ color: "red", marginLeft: 30 }}>
                                    {err}
                                </FormHelperText>
                            )}
                        </Grid>
                    </Grid>

                    <Grid item sm={12} md={12} >
                        <Typography variant="body1" gutterBottom>
                            <b>Tạm tính: </b>{(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <b>Phí vận chuyển: </b>{(+address?.shippingPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <b>Giảm giá: </b>{(mark / 10).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            <b>Tổng tiền: </b>{(+address?.shippingPrice + + totalPrice - (mark / 10)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                        </Typography>
                    </Grid>


                    <Grid container spacing={3}>

                        <Grid item xs={12} md={12} >

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.button}
                                    onClick={handlerMomo}
                                    startIcon={<img src={momo} width="40" alt="" />}
                                >Thanh toán momo</Button>
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
                            <Momo
                                orderID={orderID}
                                total={total}
                            />
                        </Grid>
                    </Grid>

                </Paper>
            </main>
        </React.Fragment >
    )
}

export default PaymentForm