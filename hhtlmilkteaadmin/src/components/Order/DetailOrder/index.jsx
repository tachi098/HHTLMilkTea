import { Button, Grid, makeStyles, Typography, CssBaseline, Chip } from "@material-ui/core"
import React, { useState } from "react"
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useHistory, useLocation } from "react-router";
import BarCode from "react-barcode";
import moment from "moment";
import { useDispatch } from "react-redux";
import { OrderStatusUpdate } from "../../../store/actions/OrderAction";
import { confirmAlert } from "react-confirm-alert";
import Notification from "./../../../common/Notification";

const useStyles = makeStyles((theme) => ({
    header: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        borderBottom: '1px solid #ececec'
    },
    root: {
        display: 'flex',
        paddingBottom: 5,
        boxShadow: 'none'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        paddingTop: 10,
        paddingLeft: 10
    },
    cover: {
        width: 80,
        height: 100
    },
    voucher: {
        paddingRight: 20,
        paddingBottom: 20
    },
    orderDetail: {
        padding: 0,
    },
    titleOrder: {
        fontSize: 14,
        display: 'flex',
        color: '#3fb4a5',
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottom: '1px solid #ececec'
    },
    contentOrder: {
        padding: 20,
    },
    price: {
        paddingLeft: '55%',
        paddingTop: 35,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '5%',
        },
    },
    total: {
        paddingLeft: '75%',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '30%',
        },
    },
    barOrder: {
        display: 'flex',
        padding: 20,
        paddingLeft: '65%',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '20%',
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
        borderBottom: 0
    }
}));

const HistoryDetail = () => {
    const classes = useStyles();
    const location = useLocation();
    const [order] = useState(location?.state?.order);
    const [status, setStatus] = useState(order.status);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleOnDelete = (id) => {
        dispatch(OrderStatusUpdate({ id, status: 4 }));
        setStatus(4);
        //history.push("/order/");
        Notification.success("Đã hủy thành công");
    };

    const handleDelete = (id) => {
        confirmAlert({
            title: "HỦY ĐƠN HÀNG",
            message: "Bạn có chắc muốn hủy đơn hàng này không?",
            buttons: [
                {
                    label: "Có",
                    onClick: () => handleOnDelete(id),
                },
                {
                    label: "Không",
                }
            ],
        });
    };

    const handleShippingStatus = (id) => {
        dispatch(OrderStatusUpdate({ id, status: 2 }));
        setStatus(2);
        //history.push("/order/")
        Notification.success("Đã hủy thành công");
    };

    const handleCompleteStatus = (id) => {
        dispatch(OrderStatusUpdate({ id, status: 3 }));
        setStatus(3);
        //history.push("/order/")
        Notification.success("Đã hủy thành công");
    };

    const handleUpdate = (id, status) => {
        if (status === 1) {
            confirmAlert({
                title: "CẬP NHẬT TRẠNG THÁI",
                message: "Bạn muốn chuyển sang trạng thái GIAO HÀNG?",
                buttons: [
                    {
                        label: "Có",
                        onClick: () => handleShippingStatus(id),
                    },
                    {
                        label: "Không",
                    }
                ],
            });
        }
        if (status === 2) {
            confirmAlert({
                title: "CẬP NHẬT TRẠNG THÁI",
                message: "Bạn muốn chuyển sang trạng thái HOÀN THÀNH?",
                buttons: [
                    {
                        label: "Có",
                        onClick: () => handleCompleteStatus(id),
                    },
                    {
                        label: "Không",
                    }
                ],
            });
        }
    };

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
                            <Grid item md={12} xl={12} sm={12} className={classes.wrapBarCode}>Mã đơn hàng: <BarCode value={order.id} /></Grid>
                            <Grid item md={6} xl={6} sm={12}>Ngày đặt hàng: {moment(order.createdAt).format("YYYY-MM-DD")}</Grid>
                            <Grid item md={6} xl={6} sm={12}>Lưu ý thêm: {order.noteOrder}</Grid>
                            <Grid item md={6} xl={6} sm={12}>Phương thức thanh toán:
                                {order.payment === 1 && (
                                    <span
                                        style={{ color: "black", fontWeight: 600 }}
                                    >
                                        Tiền mặt
                                    </span>
                                )}
                                {order.payment === 2 && (
                                    <span
                                        style={{ color: "green", fontWeight: 600 }}
                                    >
                                        Trực tuyến
                                    </span>
                                )}
                            </Grid>
                            <Grid item md={6} xl={6} sm={12}>
                                Tình trạng:
                                {status === 1 &&
                                    (
                                        <Chip
                                            label="Đang xử lý"
                                            style={{ backgroundColor: "pearl", color: "white" }}
                                        />
                                    )}
                                {status === 2 &&
                                    (
                                        <Chip
                                            label="Đang giao hàng"
                                            style={{ backgroundColor: "lightblue", color: "white" }}
                                        />
                                    )}
                                {status === 3 &&
                                    (
                                        <Chip
                                            label="Hoàn thành"
                                            style={{ backgroundColor: "green", color: "white" }}
                                        />
                                    )}
                                {status === 4 && (
                                    <Chip
                                        label="Đã hủy"
                                        style={{ backgroundColor: "red", color: "white" }}
                                    />
                                )}
                            </Grid>
                            <Grid item md={6} xl={6} sm={12}>Người đặt hàng: {order.userId.fullName}</Grid>
                            <Grid item md={6} xl={6} sm={12}>Số điện thoại: {order.phone}</Grid>
                            <Grid item md={12} xl={12} sm={12}>
                                Địa chỉ: {order.address}
                            </Grid>
                        </Grid>
                    </Typography>
                    <React.Fragment>
                        <Grid container spacing={3} style={{ marginTop: 10 }}>
                            <Grid item xs={12} md={12}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="spanning table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center"><b>Hình ảnh</b></TableCell>
                                                <TableCell><b>Sản phẩm</b></TableCell>
                                                <TableCell align="left"><b>Số lượng</b></TableCell>
                                                <TableCell align="center"><b>Giá</b></TableCell>
                                                <TableCell align="center"><b>Tổng</b></TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {order?.orderDetails?.length > 0 ? order?.orderDetails?.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell align="center">
                                                        <img alt={item.product.name} src={item.product.linkImage} width={100} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <p>{item.product.name}</p>
                                                        <span style={{ fontSize: 12, color: 'red' }}>{item.sizeOptionId} {item.addOptionId !== "" && ": " + item.addOptionId}</span>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <div style={{ display: 'flex', marginTop: -10, marginLeft: -20 }}>
                                                            <p style={{ marginLeft: 20, marginRight: 20, fontSize: 16 }}>{item.quantity}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="center">{(item.product.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                                    <TableCell align="center">{(item.product.price * item.quantity).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                                </TableRow>
                                            )) : (
                                                <TableRow>
                                                    <TableCell colSpan={6} align="center"><b style={{ color: 'red' }}>Không có sản phẩm trong giỏ hàng</b></TableCell>
                                                </TableRow>
                                            )
                                            }

                                            <TableRow>
                                                <TableCell colSpan={5}><b>Tổng tiền thanh toán</b></TableCell>
                                                <TableCell align="right"><b>{(order.totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {(status === 1 || status === 2) && (<Button
                                    style={{ margin: 10 }}
                                    variant="contained"
                                    className={classes.button}
                                    onClick={() => handleUpdate(order.id, status)}
                                >
                                    CẬP NHẬT TRẠNG THÁI
                                </Button>)}
                                {status === 1 && (<Button
                                    style={{ margin: 10 }}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    onClick={() => handleDelete(order.id)}
                                >
                                    Hủy đơn hàng
                                </Button>)}
                                <Button
                                    style={{ margin: 10 }}
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => history.push("/order")}
                                >
                                    Quay lại
                                </Button>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    )
}

export default HistoryDetail