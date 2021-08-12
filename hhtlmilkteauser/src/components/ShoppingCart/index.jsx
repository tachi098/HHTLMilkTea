import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, CssBaseline, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Add, DeleteOutline, Remove } from '@material-ui/icons';
import { OrderDelteOrderDetail, OrderUpdateQuantity } from '../../store/actions/OrderAction';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 1000,
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
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        paddingTop: 14,
        color: '#3250a8'
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const ShoppingCart = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { order, totalPrice } = useSelector((state) => state.order)


    const onHandleRedirectCheckout = () => {
        history.push("/checkout")
    }

    const onHandleUpdateQuantity = (orderDetailId, action) => {
        dispatch(OrderUpdateQuantity({ orderDetailId, action }))
    }

    const onHandleDeleteOrderDetail = (id) => {
        dispatch(OrderDelteOrderDetail(id));
    }

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
                                                            <div className={classes.btnCount} onClick={() => { onHandleUpdateQuantity(item.id, "minus") }}><Remove /></div>
                                                            <p style={{ marginLeft: 20, marginRight: 20, fontSize: 16 }}>{item.quantity}</p>
                                                            <div className={classes.btnCount} onClick={() => { onHandleUpdateQuantity(item.id, "plus") }}><Add /></div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="center">{(item.product.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                                    <TableCell align="center">{(item.product.price * item.quantity).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                                    <TableCell align="center"><DeleteOutline style={{ color: 'red', cursor: 'pointer' }} onClick={() => { onHandleDeleteOrderDetail(item.id) }} /></TableCell>
                                                </TableRow>
                                            )) : (
                                                <TableRow>
                                                    <TableCell colSpan={6} align="center"><b style={{ color: 'red' }}>Không có sản phẩm trong giỏ hàng</b></TableCell>
                                                </TableRow>
                                            )
                                            }

                                            <TableRow>
                                                <TableCell colSpan={5}><b>Tổng tiền thanh toán</b></TableCell>
                                                <TableCell align="right"><b>{(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={onHandleRedirectCheckout}
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
}

export default ShoppingCart