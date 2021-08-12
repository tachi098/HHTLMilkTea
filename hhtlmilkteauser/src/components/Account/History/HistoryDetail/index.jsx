import { Button, Card, CardMedia, Grid, makeStyles, Tabs, Typography, Tab, Box, withStyles } from "@material-ui/core"
import React from "react"
import { LocalShippingOutlined } from "@material-ui/icons"
import product1 from "./../../../../assets/img/product1.jpg"


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
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const Voucher = () => {
    const classes = useStyles();
    const [valueTab, setValueTab] = React.useState(0);

    const handleChange = (event, newValueTab) => {
        setValueTab(newValueTab);
    };

    const a11yProps = (index) => {
        return {
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }

    const AntTabs = withStyles({
        root: {
            borderBottom: '1px solid #e8e8e8',
        },
        indicator: {
            backgroundColor: '#1890ff',
        },
    })(Tabs);

    const AntTab = withStyles((theme) => ({
        root: {
            textTransform: 'none',
            minWidth: 72,
            fontWeight: theme.typography.fontWeightRegular,
            marginRight: theme.spacing(4),
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:hover': {
                color: '#416C48',
                opacity: 1,
            },
            '&$selected': {
                color: '#416C48',
                fontWeight: theme.typography.fontWeightMedium,
            },
            '&:focus': {
                color: '#416C48',
            },
        },
        selected: {},
    }))((props) => <Tab disableRipple {...props} />);

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

            <AntTabs
                value={valueTab}
                onChange={handleChange}
                aria-label="scrollable auto tabs"
                centered={true}
            >
                <AntTab label="Đã giao" {...a11yProps(0)} />
                <AntTab label="Đang xử lý" {...a11yProps(1)} />
                <AntTab label="Thất bại" {...a11yProps(2)} />
            </AntTabs>
            <TabPanel value={valueTab} index={0}>
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
            </TabPanel>
            <TabPanel value={valueTab} index={1} >
                <Typography style={{ textAlign: 'center' }}>Không có đơn hàng nào</Typography>
            </TabPanel>
            <TabPanel value={valueTab} index={2}>
                <Typography style={{ textAlign: 'center' }}>Không có đơn hàng nào</Typography>
            </TabPanel>
        </React.Fragment>
    )
}

export default Voucher