import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  makeStyles,
  NativeSelect,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import React from "react";
import { SaleOffAddAction } from "../../../store/actions/SaleOffAction";
import { useHistory, useLocation } from "react-router-dom";
import Notification from "./../../../common/Notification";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
  },
  formControl: {
    minWidth: 120,
    marginTop: 20,
  },
  paper: {
    width: 180,
    height: 230,
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      width: 140,
      height: 230,
    },
  },
  rootModal: {
    margin: 0,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  btnUpload: {
    marginLeft: 130,
    marginTop: 0,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 60,
    },
  },
  displayImg: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: 60,
    },
  },
  errorImg: {
    color: "red",
    marginLeft: 60,
    marginBottom: 10,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const CreateSaleOff = () => {
  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();

  const [product] = useState(location.state.product);

  const yearValue = new Date().getFullYear().toString();
  var months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const monthValue = months[new Date().getMonth().toString()];
  const dayValue = (new Date().getDate() + 1).toString();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    await dispatch(SaleOffAddAction(data));
    history.push("/saleoff");
    Notification.success("Đã Giảm giá sản phẩm thành công!");
  };

  const discounts = [
    { id: 1, label: "10%", discount: 0.1 },
    { id: 2, label: "20%", discount: 0.2 },
    { id: 3, label: "30%", discount: 0.3 },
  ];

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="h4">Giảm giá sản phẩm</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <TextField
                name="productId"
                inputRef={register()}
                defaultValue={product.id}
                style={{ display: "none" }}
              />
              <Grid item md={8} xs={12}>
                <TextField
                  label="Sản Phẩm được chọn để giảm giá"
                  style={{ marginTop: 10 }}
                  fullWidth
                  disabled
                  defaultValue={product.name}
                  name="name"
                  inputRef={register()}
                />
              </Grid>

              <Grid item md={8} xs={12}>
                <InputLabel htmlFor="uncontrolled-native">
                  Ngày Kết Thúc
                </InputLabel>
                <TextField
                  style={{ marginTop: 10 }}
                  fullWidth
                  format={"yyyy/MM/dd"}
                  defaultValue={yearValue + "-" + monthValue + "-" + dayValue}
                  type="date"
                  name="endDate"
                  inputRef={register({ validate: true })}
                  inputProps={{
                    min: yearValue + "-" + monthValue + "-" + dayValue,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item md={8} xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="uncontrolled-native">
                    Giảm giá
                  </InputLabel>
                  <NativeSelect
                    defaultValue={0}
                    name="discount"
                    error={errors.discount?.message && true}
                    inputRef={register({
                      validate: (value) => {
                        if (value === "default") {
                          return "Chưa giảm giá";
                        }
                      },
                    })}
                  >
                    <option value="default">Chưa chọn</option>
                    {discounts.map((sale) => (
                      <option key={sale.id} value={sale.discount}>
                        {sale.label}
                      </option>
                    ))}
                  </NativeSelect>
                  {errors.discount?.message && (
                    <FormHelperText
                      style={{ color: "red" }}
                      id="component-error-text"
                    >
                      {errors.discount?.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item md={4} xs={12}>
                <img
                  alt=""
                  src={product.linkImage}
                  className={classes.displayImg}
                  width={250}
                  height={300}
                />
                <label htmlFor="upload-photo">
                  <TextField
                    id="upload-photo"
                    style={{ display: "none" }}
                    fullWidth
                  />
                </label>
              </Grid>
            </Grid>

            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ marginTop: 20, marginLeft: "50%" }}
            >
              Giảm giá sản phẩm
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateSaleOff;
