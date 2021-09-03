import React, { useEffect, useState } from "react";
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
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { RatingPageAction } from "./../../store/actions/RatingAction";
import TableHeader from "../TableHeader";

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

const Rating = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { ratings, totalPages } = useSelector((state) => state.rating);
  const [page, setPage] = useState(1);
  const [valueToOrderBy, setValueToOrderBy] = useState("id");
  const [valueToSortDir, setValueToSortDir] = useState("asc");
  const [keyword, setKeyword] = useState("");
  const [name, setName] = useState("");
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    dispatch(
      RatingPageAction({
        page,
        sortField: valueToOrderBy,
        sortDir: valueToSortDir,
        keyword,
        pageSize,
      })
    );
  }, [dispatch, page, valueToOrderBy, valueToSortDir, keyword, pageSize]);

  const handleRequestSort = (property) => {
    const isAscending =
      Object.is(valueToOrderBy, property) && Object.is(valueToSortDir, "asc");
    setValueToOrderBy(property);
    setValueToSortDir(isAscending ? "desc" : "asc");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(name);
    setPage(1);
  };

  const handlePage = (event, value) => {
    setPage(value);
  };

  const handlePageSize = (e) => {
    setPageSize(e.target.value);
    setPage(1);
  };

  const fields = [
    { name: "username", lable: "Tên tài khoản", dir: "asc" },
    { name: "orderId", lable: "Order Id", dir: "asc" },
    { name: "rate", lable: "Đánh giá", dir: "asc" },
    { lable: "Content" },
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
          md={9}
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
            className={classes.form}
          >
            <TextField
              label="Tìm kiếm"
              margin="normal"
              onChange={(e) => setName(e.target.value)}
              className={classes.searchField}
            />
            <Button
              className={classes.btnSearch}
              type="submit"
              variant="contained"
              color="primary"
            >
              Tìm Kiếm
            </Button>
          </form>
        </Grid>

        <Grid
          item
          md={3}
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
              marginTop: 16,
              marginLeft: 10,
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
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
            {ratings.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.orderId}</TableCell>
                <TableCell>
                  {u.rate === 1
                    ? "⭐"
                    : u.rate === 2
                    ? "⭐⭐"
                    : u.rate === 3
                    ? "⭐⭐⭐"
                    : u.rate === 4
                    ? "⭐⭐⭐⭐"
                    : u.rate === 5
                    ? "⭐⭐⭐⭐⭐"
                    : null}
                </TableCell>
                <TableCell>{u.content}</TableCell>
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

export default Rating;
