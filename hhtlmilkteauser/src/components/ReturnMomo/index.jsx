import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkoutOrder } from "../../store/actions/OrderAction";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useHistory } from "react-router-dom";
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles((theme) => ({
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

const ReturnMomo = () => {
    const classes = useStyles();

    const [message, setMessage] = useState("")
    const history = useHistory();

    const { search } = window.location;
    const dispatch = useDispatch();

    useEffect(() => {
        const errorCode = new URLSearchParams(search).get('errorCode')

        if (Object.is(errorCode, "0")) {
            const order = localStorage.getItem("order") !== null ? JSON.parse(localStorage.getItem("order")) : {};
            dispatch(checkoutOrder(order));
            localStorage.removeItem("order")
            setMessage("success")
        } else {
            setMessage("fail")
        }

    }, [dispatch, search])

    return (
        <React.Fragment>

            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    {Object.is(message, "success") ? (
                        <React.Fragment>
                            <div style={{ textAlign: 'center', padding: 10 }} >
                                <CheckCircleOutlineIcon style={{ fontSize: 200, color: '#339653' }} />

                                <Typography variant="subtitle1" style={{ fontSize: 50, fontFamily: 'sans-serif', color: '#339653' }}>
                                    Thanh toán thành công
                                </Typography>

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        style={{ marginTop: 20 }}
                                        variant="outlined"
                                        color="primary"
                                        className={classes.button}
                                        onClick={() => history.push("/home")}
                                    >
                                        Quay lại trang chủ
                                    </Button>
                                </div>

                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <div style={{ textAlign: 'center', padding: 10 }} >
                                <ErrorIcon style={{ fontSize: 200, color: '#d93725' }} />

                                <Typography variant="subtitle1" style={{ fontSize: 50, fontFamily: 'sans-serif', color: '#d93725' }}>
                                    Thanh toán thất bại
                                </Typography>

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        style={{ marginTop: 20 }}
                                        variant="outlined"
                                        color="primary"
                                        className={classes.button}
                                        onClick={() => history.push("/home")}
                                    >
                                        Quay lại trang chủ
                                    </Button>
                                </div>

                            </div>
                        </React.Fragment>
                    )}
                </Paper>
            </main>
        </React.Fragment >
    )
}

export default ReturnMomo