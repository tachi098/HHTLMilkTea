import React, { useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Title from './../Title';
import { Typography, Chip, Paper, TableContainer } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import BarCode from "react-barcode";
import TableHeader from "../../TableHeader";
import { LastFiveOrders } from '../../../store/actions/RevenueAction';


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  wrapped: {
    "& svg": {
      width: 150,
    },
  }
}));

const Orders = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { listLastFiveOrders } = useSelector((state) => state.revenue);
  const fields = [
    { name: "id", lable: "Số Hóa Đơn" },
    { name: "createdAt", lable: "Ngày đặt hàng" },
    { name: "userId", lable: "Khách hàng" },
    { name: "payment", lable: "Thanh toán" },
    { name: "totalPrice", lable: "Tổng tiền" },
    { lable: "Trạng Thái" },
  ];

  useEffect(() => {
    dispatch(LastFiveOrders());
  });

  console.log(listLastFiveOrders);
  return (
    <React.Fragment>
      <Title>Đơn hàng mới nhất</Title>
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650 }} aria-label="simple table">
          <TableHeader
            fields={fields}
          />
          <TableBody>
            {listLastFiveOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell component="th" scope="row" className={classes.wrapped}>
                  <BarCode value={order.id} className={classes.barCode} />
                </TableCell>
                <TableCell>{moment(order.createdAt).format("YYYY-MM-DD")}</TableCell>
                <TableCell>{order.userId.fullName}</TableCell>
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
                <TableCell>{order.totalPrice}</TableCell>
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
                  {order.status === 3 &&
                    (
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.seeMore}>
        <Link color="primary" href="/order">
          Xem thêm
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Orders;