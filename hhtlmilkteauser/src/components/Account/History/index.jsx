import { Card, Grid, makeStyles, Tabs, Typography, Tab, Box, withStyles, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Select, Chip } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import { LocalShippingOutlined, DeleteOutline, Visibility } from "@material-ui/icons"
import FastfoodIcon from '@material-ui/icons/Fastfood';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useDispatch, useSelector } from "react-redux";
import { HistoryListProcess, HistoryListSuccess, HistoryListFail } from "../../../store/actions/HistoryAction";
import { Pagination } from '@material-ui/lab';
import TableHeader from "../../TableHeader";
import moment from "moment";
import { useHistory } from "react-router";
import { confirmAlert } from 'react-confirm-alert';
import Notification from "./../../../common/Notification";
import { OrderStatusUpdate } from "../../../store/actions/HistoryAction";
import BarCode from "react-barcode";

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
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottom: '1px solid #ececec'
    },
    titleOrder1: {
        color: '#e8f803',
    },
    titleOrder2: {
        color: '#3fb4a5',
    },
    titleOrder3: {
        color: '#ff0000',
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
    wrapped: {
        "& svg": {
            width: 150,
        },
    },
    card: {
        minHeight: '400px'
    }
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

const History = () => {
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

    const dispatch = useDispatch();
    const history = useHistory();
    const { customer } = useSelector((state) => state.customer);
    const { listProcess, totalPagesProcess, listSuccess, totalPagesSuccess, listFail, totalPagesFail } = useSelector((state) => state.history);
    const [pageProcess, setPageProcess] = useState(1);
    const [pageSuccess, setPageSuccess] = useState(1);
    const [pageFail, setPageFail] = useState(1);
    const [valueToOrderByProcess, setValueToOrderByProcess] = useState("id");
    const [valueToOrderBySuccess, setValueToOrderBySuccess] = useState("id");
    const [valueToOrderByFail, setValueToOrderByFail] = useState("id");
    const [valueToSortDirProcess, setValueToSortDirProcess] = useState("asc");
    const [valueToSortDirSuccess, setValueToSortDirSuccess] = useState("asc");
    const [valueToSortDirFail, setValueToSortDirFail] = useState("asc");
    const [pageSizeProcess, setPageSizeProcess] = useState(3);
    const [pageSizeSuccess, setPageSizeSuccess] = useState(3);
    const [pageSizeFail, setPageSizeFail] = useState(3);
    useEffect(() => {
        dispatch(
            HistoryListProcess({
                page: pageProcess,
                sortField: valueToOrderByProcess,
                sortDir: valueToSortDirProcess,
                id: customer.id,
                pageSize: pageSizeProcess,
            })
        );
        dispatch(
            HistoryListSuccess({
                page: pageSuccess,
                sortField: valueToOrderBySuccess,
                sortDir: valueToSortDirSuccess,
                id: customer.id,
                pageSize: pageSizeSuccess,
            })
        );
        dispatch(
            HistoryListFail({
                page: pageFail,
                sortField: valueToOrderByFail,
                sortDir: valueToSortDirFail,
                id: customer.id,
                pageSize: pageSizeFail,
            })
        );
    }, [dispatch, pageProcess, pageSuccess, pageFail, valueToOrderByProcess, valueToOrderBySuccess, valueToOrderByFail, valueToSortDirProcess, valueToSortDirSuccess, valueToSortDirFail, pageSizeProcess, pageSizeSuccess, pageSizeFail, customer.id]);

    const handleRequestSortProcess = (property) => {
        const isAscending =
            Object.is(valueToOrderByProcess, property) && Object.is(valueToSortDirProcess, "asc");
        setValueToOrderByProcess(property);
        setValueToSortDirProcess(isAscending ? "desc" : "asc");
    };

    const handleRequestSortSuccess = (property) => {
        const isAscending =
            Object.is(valueToOrderBySuccess, property) && Object.is(valueToSortDirSuccess, "asc");
        setValueToOrderBySuccess(property);
        setValueToSortDirSuccess(isAscending ? "desc" : "asc");
    };

    const handleRequestSortFail = (property) => {
        const isAscending =
            Object.is(valueToOrderByFail, property) && Object.is(valueToSortDirFail, "asc");
        setValueToOrderByFail(property);
        setValueToSortDirFail(isAscending ? "desc" : "asc");
    };

    const handlePageProcess = (event, value) => {
        setPageProcess(value);
    };

    const handlePageSuccess = (event, value) => {
        setPageSuccess(value);
    };

    const handlePageFail = (event, value) => {
        setPageFail(value);
    };

    const handlePageSizeProcess = (e) => {
        setPageSizeProcess(e.target.value);
        setPageProcess(1);
    };

    const handlePageSizeSuccess = (e) => {
        setPageSizeSuccess(e.target.value);
        setPageSuccess(1);
    };

    const handlePageSizeFail = (e) => {
        setPageSizeFail(e.target.value);
        setPageFail(1);
    };

    const fields = [
        { name: "id", lable: "Số Hóa Đơn", dir: "desc" },
        { name: "createdAt", lable: "Ngày đặt hàng", dir: "asc" },
        { name: "noteOrder", lable: "Lưu ý", dir: "asc" },
        { name: "payment", lable: "Thanh toán", dir: "asc" },
        { name: "totalPrice", lable: "Tổng tiền", dir: "asc" },
        { lable: "Trạng Thái" },
        { lable: "Hành Động" },
    ];

    const handleOnDelete = (id) => {
        dispatch(OrderStatusUpdate({ id, status: 4 }));
        Notification.success("Đã hủy thành công");
    };

    const handleDelete = (id) => {
        confirmAlert({
            title: "THÔNG BÁO",
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
                <AntTab label="Đang xử lý" {...a11yProps(0)} />
                <AntTab label="Hoàn thành" {...a11yProps(1)} />
                <AntTab label="Đã hủy" {...a11yProps(2)} />
            </AntTabs>
            <TabPanel value={valueTab} index={0}>
                <div className={classes.orderDetail}>
                    <Card className={classes.card}>
                        {listProcess.length > 0 && (
                            <>
                                <Typography className={classes.titleOrder} component={'span'}>
                                    <Grid item
                                        md={3}
                                        xl={3}
                                        sm={3} className={classes.titleOrder1}>
                                        <FastfoodIcon />Đang xử lý
                                    </Grid>

                                    <Grid
                                        item
                                        md={9}
                                        xl={9}
                                        sm={9}
                                        style={{
                                            direction: "row",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Select native value={pageSizeProcess} onChange={handlePageSizeProcess}>
                                            <option value={3}>3</option>
                                            <option value={5}>5</option>
                                        </Select>
                                    </Grid>
                                </Typography>


                                <TableContainer component={Paper}>
                                    <Table style={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHeader
                                            valueToOrderBy={valueToOrderByProcess}
                                            valueToSortDir={valueToSortDirProcess}
                                            handleRequestSort={handleRequestSortProcess}
                                            fields={fields}
                                        />
                                        <TableBody>
                                            {listProcess.map((order) => (
                                                <TableRow key={order.id}>
                                                    <TableCell component="th" scope="row" className={classes.wrapped}>
                                                        <BarCode value={order.id} className={classes.barCode} />
                                                    </TableCell>
                                                    <TableCell>{moment(order.createdAt).format("YYYY-MM-DD")}</TableCell>
                                                    <TableCell>{order.noteOrder}</TableCell>
                                                    <TableCell>
                                                        {order.payment === 1 && (
                                                            <Typography
                                                                style={{ color: "black", fontWeight: 600 }}
                                                            >
                                                                Tiền mặt
                                                            </Typography>
                                                        )}
                                                        {order.payment === 2 && (
                                                            <Typography
                                                                style={{ color: "green", fontWeight: 600 }}
                                                            >
                                                                Trực tuyến
                                                            </Typography>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{order.totalPrice.toLocaleString("it-IT", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    })}</TableCell>
                                                    <TableCell>
                                                        {order.status === 1 &&
                                                            (
                                                                <Chip
                                                                    label="Đang xử lý"
                                                                    style={{ backgroundColor: "pearl", color: "white" }}
                                                                />
                                                            )}
                                                        {order.status === 2 &&
                                                            (
                                                                <Chip
                                                                    label="Đang giao hàng"
                                                                    style={{ backgroundColor: "lightblue", color: "white" }}
                                                                />
                                                            )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Visibility
                                                            style={{
                                                                color: "grey",
                                                                cursor: "pointer",
                                                                marginRight: 10,
                                                            }}
                                                            onClick={() => history.push("/account/history/detail", { order: order })}
                                                        />
                                                        {order.status === 1 && order.payment === 1 && (
                                                            <DeleteOutline
                                                                style={{ color: "red", cursor: "pointer" }}
                                                                onClick={() => handleDelete(order.id)}
                                                            />
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <Pagination
                                    style={{ marginTop: 50 }}
                                    color="primary"
                                    shape="rounded"
                                    count={totalPagesProcess}
                                    page={pageProcess}
                                    onChange={handlePageProcess}
                                    showFirstButton
                                    showLastButton
                                />
                            </>
                        )}
                        {listProcess.length === 0 && (
                            <h1 style={{ paddingLeft: 15, color: "red" }}>Chưa có đơn hàng nào đang xử lý</h1>
                        )}
                    </Card>
                </div>
            </TabPanel>
            <TabPanel value={valueTab} index={1} >
                <div className={classes.orderDetail}>
                    <Card >
                        {listSuccess.length > 0 && (
                            <>
                                <Typography className={classes.titleOrder} component={'span'}>
                                    <Grid item
                                        md={3}
                                        xl={3}
                                        sm={3} className={classes.titleOrder2}>
                                        <LocalShippingOutlined />Giao hàng thành công
                                    </Grid>

                                    <Grid
                                        item
                                        md={9}
                                        xl={9}
                                        sm={9}
                                        style={{
                                            direction: "row",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Select native value={pageSizeSuccess} onChange={handlePageSizeSuccess}>
                                            <option value={3}>3</option>
                                            <option value={5}>5</option>
                                        </Select>
                                    </Grid>
                                </Typography>


                                <TableContainer component={Paper}>
                                    <Table style={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHeader
                                            valueToOrderBy={valueToOrderBySuccess}
                                            valueToSortDir={valueToSortDirSuccess}
                                            handleRequestSort={handleRequestSortSuccess}
                                            fields={fields}
                                        />
                                        <TableBody>
                                            {listSuccess.map((order) => (
                                                <TableRow key={order.id}>
                                                    <TableCell component="th" scope="row" className={classes.wrapped}>
                                                        <BarCode value={order.id} />
                                                    </TableCell>
                                                    <TableCell>{moment(order.createdAt).format("YYYY-MM-DD")}</TableCell>
                                                    <TableCell>{order.noteOrder}</TableCell>
                                                    <TableCell>
                                                        {order.payment === 1 && (
                                                            <Typography
                                                                style={{ color: "black", fontWeight: 600 }}
                                                            >
                                                                Tiền mặt
                                                            </Typography>
                                                        )}
                                                        {order.payment === 2 && (
                                                            <Typography
                                                                style={{ color: "green", fontWeight: 600 }}
                                                            >
                                                                Trực tuyến
                                                            </Typography>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{order.totalPrice.toLocaleString("it-IT", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    })}</TableCell>
                                                    <TableCell>
                                                        {order.status === 3 &&
                                                            (
                                                                <Chip
                                                                    label="Hoàn thành"
                                                                    style={{ backgroundColor: "green", color: "white" }}
                                                                />
                                                            )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Visibility
                                                            style={{
                                                                color: "grey",
                                                                cursor: "pointer",
                                                                marginRight: 10,
                                                            }}
                                                            onClick={() => history.push("/account/history/detail", { order: order })}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Pagination
                                    style={{ marginTop: 50 }}
                                    color="primary"
                                    shape="rounded"
                                    count={totalPagesSuccess}
                                    page={pageSuccess}
                                    onChange={handlePageSuccess}
                                    showFirstButton
                                    showLastButton
                                />
                            </>
                        )}
                        {listSuccess.length === 0 && (
                            <h1 style={{ paddingLeft: 15, color: "red" }}>Chưa có đơn hàng nào hoàn thành</h1>
                        )}
                    </Card>
                </div>
            </TabPanel>
            <TabPanel value={valueTab} index={2}>
                <div className={classes.orderDetail}>
                    <Card>
                        {listFail.length > 0 && (
                            <>
                                <Typography className={classes.titleOrder} component={'span'}>
                                    <Grid item
                                        md={3}
                                        xl={3}
                                        sm={3} className={classes.titleOrder3}>
                                        <DeleteForeverIcon />Đơn hàng đã hủy
                                    </Grid>

                                    <Grid
                                        item
                                        md={9}
                                        xl={9}
                                        sm={9}
                                        style={{
                                            direction: "row",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Select native value={pageSizeFail} onChange={handlePageSizeFail}>
                                            <option value={3}>3</option>
                                            <option value={5}>5</option>
                                        </Select>
                                    </Grid>
                                </Typography>


                                <TableContainer component={Paper}>
                                    <Table style={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHeader
                                            valueToOrderBy={valueToOrderByFail}
                                            valueToSortDir={valueToSortDirFail}
                                            handleRequestSort={handleRequestSortFail}
                                            fields={fields}
                                        />
                                        <TableBody>
                                            {listFail.map((order) => (
                                                <TableRow key={order.id}>
                                                    <TableCell component="th" scope="row" className={classes.wrapped}>
                                                        <BarCode value={order.id} />
                                                    </TableCell>
                                                    <TableCell>{moment(order.createdAt).format("YYYY-MM-DD")}</TableCell>
                                                    <TableCell>{order.noteOrder}</TableCell>
                                                    <TableCell>
                                                        {order.payment === 1 && (
                                                            <Typography
                                                                style={{ color: "black", fontWeight: 600 }}
                                                            >
                                                                Tiền mặt
                                                            </Typography>
                                                        )}
                                                        {order.payment === 2 && (
                                                            <Typography
                                                                style={{ color: "green", fontWeight: 600 }}
                                                            >
                                                                Trực tuyến
                                                            </Typography>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{order.totalPrice.toLocaleString("it-IT", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    })}</TableCell>
                                                    <TableCell>
                                                        {order.status === 4 && (
                                                            <Chip
                                                                label="Đã hủy"
                                                                style={{ backgroundColor: "red", color: "white" }}
                                                            />
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Visibility
                                                            style={{
                                                                color: "grey",
                                                                cursor: "pointer",
                                                                marginRight: 10,
                                                            }}
                                                            onClick={() => history.push("/account/history/detail", { order: order })}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Pagination
                                    style={{ marginTop: 50 }}
                                    color="primary"
                                    shape="rounded"
                                    count={totalPagesFail}
                                    page={pageFail}
                                    onChange={handlePageFail}
                                    showFirstButton
                                    showLastButton
                                />
                            </>
                        )}
                        {listFail.length === 0 && (
                            <h1 style={{ paddingLeft: 15, color: "red" }}>Chưa có đơn hàng nào đã hủy</h1>
                        )}
                    </Card>
                </div>
            </TabPanel>
        </React.Fragment >
    )
}

export default History