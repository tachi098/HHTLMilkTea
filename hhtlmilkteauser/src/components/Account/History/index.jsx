import { Button, Card, CardMedia, Grid, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import { LocalShippingOutlined } from "@material-ui/icons"
import product1 from "./../../../assets/img/product1.jpg"


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
    title: {
        color: '#7f7f7f',
        fontSize: 14
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
        padding: 20,
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
        padding: 10,
        paddingLeft: '65%',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '5%',
        },
    },
}));

const Voucher = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.header}>
                <Typography variant="h6">
                    ĐƠN HÀNG
                </Typography>
                <Typography className={classes.title}>
                    Quản lý các đơn hàng của bạn
                </Typography>
            </div>

            <div className={classes.orderDetail}>
                <Card >
                    <Typography className={classes.titleOrder}>
                        <LocalShippingOutlined />Giao hàng thành công
                    </Typography>

                    <div className={classes.contentOrder}>
                        {[...Array(3)].map((item, index) => (
                            <Card className={classes.root} key={index}>
                                <CardMedia
                                    className={classes.cover}
                                    image={product1}
                                    title="Product 2021"
                                />
                                <div className={classes.details}>
                                    <div className={classes.content}>
                                        <Grid item md={10} ></Grid>
                                        <Typography component="h6" variant="h6">
                                            Phin Sữa Đá - Năng Lượng
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            x1
                                        </Typography>
                                    </div>
                                </div>
                                <Typography variant="subtitle1" color="textSecondary" className={classes.price} >
                                    15.00đ
                                </Typography>
                            </Card>
                        ))}
                    </div>

                    <div className={classes.total}>
                        <Typography variant="h6" color="textSecondary"  >
                            Tổng tiền: 45.000 đ
                        </Typography>
                    </div>
                    <div className={classes.barOrder}>
                        <Button variant="contained" color="primary" style={{ marginRight: 10 }}>
                            Mua lần nữa
                        </Button>
                        <Button variant="contained" color="secondary">
                            Đánh giá sản phẩm
                        </Button>
                    </div>
                </Card>
            </div>


        </React.Fragment>
    )
}

export default Voucher