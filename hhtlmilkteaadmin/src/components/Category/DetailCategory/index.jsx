import {
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  makeStyles,
  Chip,
  Avatar,
} from "@material-ui/core";
import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import Logo from "./../../../assets/img/Milktea.gif";
import TableHeader from "../../TableHeader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
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
  select: {
    marginLeft: 30,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 200,
    },
  },
}));

const DetailCategory = () => {
  const classes = useStyles();

  const location = useLocation();
  const [category] = useState(location?.state?.category);

  const fields = [
    { lable: "Hình Ảnh" },
    { lable: "Tên sản phẩm" },
    { lable: "Giá" },
    { lable: "Trạng thái" },
  ];

  return (
    <div className={classes.root}>
      {Object.is(category, undefined) && <Redirect to="/category" />}
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="h5">THÔNG TIN LOẠI SẢN PHẨM</Typography>
        <Typography variant="h4">{category.name}</Typography>
      </Grid>

      <Grid>
        <PDFDownloadLink
          document={<Report category={category} />}
          fileName="report"
        >
          <Avatar style={{ cursor: "pointer", backgroundColor: "#FC8400", marginBottom: 10 }}>
            <PictureAsPdfIcon />
          </Avatar>
        </PDFDownloadLink>
      </Grid>
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650 }} aria-label="simple table">
          <TableHeader fields={fields} />
          <TableBody>
            {category?.products.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <img
                    alt=""
                    width={60}
                    height={60}
                    src={u.linkImage ?? Logo}
                  />
                </TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>
                  {u.price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DetailCategory;
