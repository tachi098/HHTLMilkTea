import {
  Avatar,
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserGetAll } from "../../store/actions/UserAction";
import Pagination from "@material-ui/lab/Pagination";
import TableHeader from "../TableHeader";
import Logo from "./../../assets/img/Milktea.gif";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Report from "./report";

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
}));

const User = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { users, totalPages } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [valueToOrderBy, setValueToOrderBy] = useState("id");
  const [valueToSortDir, setValueToSortDir] = useState("asc");
  const [keyword, setKeyword] = useState("");
  const [name, setName] = useState("");
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    dispatch(
      UserGetAll({
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

  const handleDetails = (id) => {
    console.log({ id });
  };

  const fields = [
    { lable: "Hình Ảnh" },
    { name: "username", lable: "Tài Khoản", dir: "asc" },
    { name: "fullName", lable: "Họ & Tên", dir: "asc" },
    { name: "phone", lable: "Số Điện Thoại", dir: "asc" },
    { name: "email", lable: "Email", dir: "asc" },
    { lable: "Hành Động" },
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
          md={10}
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
          md={2}
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
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <PDFDownloadLink
              document={<Report users={users} />}
              fileName="report"
            >
              <Avatar style={{ cursor: "pointer", backgroundColor: "#FC8400" }}>
                <PictureAsPdfIcon />
              </Avatar>
            </PDFDownloadLink>
            <Select native value={pageSize} onChange={handlePageSize}>
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
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell component="th" scope="row">
                  <Avatar src={u.linkImage ?? Logo} />
                </TableCell>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.fullName}</TableCell>
                <TableCell>{u.phone}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    onClick={() => handleDetails(u.id)}
                    color="primary"
                  >
                    Chi Tiết
                  </Button>
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

export default User;
