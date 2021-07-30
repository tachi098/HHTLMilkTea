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

const TAX_RATE = 0.07;

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
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const ccyFormat = (num) => {
    return `${num.toFixed(2)}`;
}

const priceRow = (qty, unit) => {
    return qty * unit;
}

const createRow = (desc, qty, unit) => {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
}

const subtotal = (items) => {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

const ShoppingCart = () => {
    const classes = useStyles();
    const history = useHistory();

    const onHandleRedirectCheckout = () => {
        history.push("/checkout")
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
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="spanning table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" colSpan={3}>
                                                    <b>Thông tin</b>
                                                </TableCell>
                                                <TableCell align="right"><b>Tiền</b></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><b>Sản phẩm</b></TableCell>
                                                <TableCell align="right"><b>Số lượng</b></TableCell>
                                                <TableCell align="right"><b>Giá</b></TableCell>
                                                <TableCell align="right"><b>Tổng</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.desc}>
                                                    <TableCell>{row.desc}</TableCell>
                                                    <TableCell align="right">{row.qty}</TableCell>
                                                    <TableCell align="right">{row.unit}</TableCell>
                                                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                                                </TableRow>
                                            ))}

                                            <TableRow>
                                                <TableCell rowSpan={3} />
                                                <TableCell colSpan={2}><b>Tổng</b></TableCell>
                                                <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><b>Giảm giá</b></TableCell>
                                                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                                                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={2}><b>Tổng tiền thanh toán</b></TableCell>
                                                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
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