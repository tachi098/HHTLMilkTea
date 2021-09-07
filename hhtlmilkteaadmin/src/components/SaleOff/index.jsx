import {
  Button,
  FormControl,
  Grid,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import TableHeader from "../TableHeader";
import { useHistory } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import {
  SaleOffListAction,
  SaleOffDeleteAction,
} from "./../../store/actions/SaleOffAction";
import { ProductSaleOff } from "./../../store/actions/ProductAction";
import Logo from "./../../assets/img/Milktea.gif";
import { confirmAlert } from "react-confirm-alert";
import Moment from "react-moment";
import Notification from "./../../common/Notification";

const useStyles = makeStyles((theme) => ({
  btn: {
    width: 90.18,
    height: 36,
  },
  searchField: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  btnSearch: {
    width: 100,
    height: 36,
    marginTop: 16,
    marginRight: 30,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: 16,
      marginRight: 0,
    },
  },
  wrapForm: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  select: {
    marginLeft: 30,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 200,
    },
  },
}));

const SaleOff = () => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const { products, totalPages } = useSelector((state) => state.product);
  const [page, setPage] = useState(1);
  const [valueToOrderBy, setValueToOrderBy] = useState("id");
  const [valueToSortDir, setValueToSortDir] = useState("asc");
  const [keyword, setKeyword] = useState("");
  const [discount, setDiscount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    dispatch(SaleOffListAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      ProductSaleOff({
        page,
        sortField: valueToOrderBy,
        sortDir: valueToSortDir,
        keyword,
        pageSize,
        discount,
      })
    );
  }, [
    dispatch,
    page,
    valueToOrderBy,
    valueToSortDir,
    keyword,
    pageSize,
    discount,
  ]);

  const handleRequestSort = (property) => {
    const isAscending =
      Object.is(valueToOrderBy, property) && Object.is(valueToSortDir, "asc");
    setValueToOrderBy(property);
    setValueToSortDir(isAscending ? "desc" : "asc");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(discount);
  };

  const handlePage = (event, value) => {
    setPage(value);
  };

  const handlePageSize = (e) => {
    setPageSize(e.target.value);
    setPage(1);
  };

  const onHandleRedirect = () => {
    history.push("/saleoff/add");
  };

  const handleChangeDiscount = (event) => {
    setDiscount(event.target.value);
    setPage(1);
  };

  const onhandleDelete = (id) => {
    confirmAlert({
      title: "Thông báo",
      message: "Bạn có chắc muốn ngưng giảm giá sản phẩm?",
      buttons: [
        {
          label: "Có",
          onClick: () => {
            dispatch(SaleOffDeleteAction(id));
            Notification.success("Đã ngưng giảm giá sản phẩm thành công!");
          },
        },
        {
          label: "Không",
        },
      ],
    });
  };

  const fields = [
    { lable: "Hình Ảnh" },
    { name: "name", lable: "Tên Sản Phẩm", dir: "asc" },
    { lable: "Giảm Giá" },
    { name: "price", lable: "Đã Giảm Còn", dir: "asc" },
    { name: "categoryId", lable: "Loại", dir: "asc" },
    { name: "endDate", lable: "Ngày hết" },
    { lable: "Hành Động" },
  ];

  const discounts = [
    {
      value: 0,
      label: "Discount",
    },
    {
      value: 0.1,
      label: "10%",
    },
    {
      value: 0.2,
      label: "20%",
    },
    {
      value: 0.3,
      label: "30%",
    },
  ];

  return (
    <div>
      <Grid
        container
        style={{
          display: "flex",
        }}
        className={classes.wrapForm}
      >
        <Grid
          item
          md={7}
          xl={12}
          sm={12}
          style={{
            marginTop: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className={classes.wrapForm}
        >
          <form
            onSubmit={handleSearch}
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <TextField
              id="outlined-select-currency"
              select
              label="Discount"
              value={discount}
              onChange={handleChangeDiscount}
              helperText="Chọn discount để lọc sản phẩm"
            >
              {discounts.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </form>
        </Grid>

        <Grid
          item
          md={5}
          xl={12}
          sm={12}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: 16,
          }}
        >
          <FormControl
            style={{
              marginLeft: 10,
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={onHandleRedirect}
            >
              Thêm sản phẩm giảm giá
            </Button>

            <Select
              native
              value={pageSize}
              onChange={handlePageSize}
              className={classes.select}
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650 }} aria-label="simple table">
          <TableHeader
            valueToOrderBy={valueToOrderBy}
            valueToSortDir={valueToSortDir}
            handleRequestSort={handleRequestSort}
            fields={fields}
          />
          <TableBody>
            {products.map((u) => (
              <TableRow key={u.id}>
                <TableCell component="th" scope="row">
                  <img
                    alt=""
                    width={60}
                    height={60}
                    src={u.linkImage ?? Logo}
                  />
                </TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.saleOff?.discount * 100}%</TableCell>
                <TableCell>
                  {(u.price * (1 - u.saleOff?.discount))
                    .toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })
                    .toString()}
                </TableCell>
                <TableCell>{u.categoryId?.name}</TableCell>
                <TableCell>
                  <Moment format="DD/MM/YYYY">{u.saleOff?.endDate}</Moment>
                </TableCell>
                <TableCell>
                  <DeleteOutline
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => onhandleDelete(u.saleOff.id)}
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
        count={totalPages}
        page={page}
        onChange={handlePage}
        showFirstButton
        showLastButton
      />
    </div>
  );
};

export default SaleOff;
