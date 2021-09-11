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
  Chip,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import TableHeader from "../TableHeader";
import { useHistory } from "react-router-dom";
import { CreateOutlined, DeleteOutline } from "@material-ui/icons";
import {
  AdditionOptionPageAction,
  AdditionOptionDeleteAction,
} from "./../../store/actions/AdditionOptionAction";
import { confirmAlert } from "react-confirm-alert";
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

const AdditionOption = () => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const { additionOptions, totalPages } = useSelector(
    (state) => state.additionOption
  );
  const [page, setPage] = useState(1);
  const [valueToOrderBy, setValueToOrderBy] = useState("id");
  const [valueToSortDir, setValueToSortDir] = useState("asc");
  const [keyword, setKeyword] = useState("");
  const [name, setName] = useState("");
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    dispatch(
      AdditionOptionPageAction({
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

  const onHandleRedirect = () => {
    history.push("/addition/add");
  };

  const onhandleUpdate = (item) => {
    history.push("/addition/edit", { additionOption: item });
  };

  const onhandleDelete = (id) => {
    confirmAlert({
      title: "Thông báo",
      message: "Bạn có chắc muốn xoá?",
      buttons: [
        {
          label: "Có",
          onClick: () => {
            dispatch(AdditionOptionDeleteAction(id));
            Notification.success("Đã xoá thành công!");
          },
        },
        {
          label: "Không",
        },
      ],
    });
  };

  const fields = [
    { name: "name", lable: "Tên Topping", dir: "asc" },
    { name: "price", lable: "Giá", dir: "asc" },
    { lable: "Trạng thái" },
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
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={onHandleRedirect}
            >
              Thêm Topping
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
            {additionOptions.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>
                  {u.price
                    .toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })
                    .toString()}
                </TableCell>
                <TableCell>
                  {u.deletedAt ? (
                    <Chip
                      label="Ngừng bán"
                      style={{ backgroundColor: "red", color: "white" }}
                    />
                  ) : (
                    <Chip
                      label="Hoạt động"
                      style={{ backgroundColor: "green", color: "white" }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <CreateOutlined
                    style={{
                      color: "#3F51B5",
                      cursor: "pointer",
                      marginRight: 10,
                    }}
                    onClick={() => onhandleUpdate(u)}
                  />

                  <DeleteOutline
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => onhandleDelete(u.id)}
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

export default AdditionOption;
