import {
  Button,
  FormHelperText,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import React from "react";
import { AdditionOptionUpdateAction } from "../../../store/actions/AdditionOptionAction";
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

const EditAdditionOption = () => {
  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();

  const [additionOption] = useState(location.state.additionOption);

  const { additionOptions } = useSelector((state) => state.additionOption);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  // Update Addition Option
  const onSubmit = (data) => {
    const foundName = additionOptions.some((item) => {
      return item.name === data.name;
    });

    if (getValues("name") !== additionOption.name) {
      if (foundName === true) {
        Notification.error("Tên Topping đã tồn tại");
      } else {
        dispatch(AdditionOptionUpdateAction(data));
        history.push("/addition");
        Notification.success("Đã cập nhật Topping thành công!");
      }
    } else {
      dispatch(AdditionOptionUpdateAction(data));
      history.push("/addition");
      Notification.success("Đã cập nhật Topping thành công!");
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="h4">Cập nhật Topping</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item md={8} xs={12}>
                <TextField
                  name="id"
                  inputRef={register()}
                  defaultValue={additionOption.id}
                  style={{ display: "none" }}
                />
                <TextField
                  label="Nhập tên Topping"
                  style={{ marginTop: 10 }}
                  defaultValue={additionOption.name}
                  fullWidth
                  name="name"
                  inputRef={register({ required: true })}
                />
                {errors.name && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    Nhập tên Topping
                  </FormHelperText>
                )}

                <TextField
                  label="Nhập giá Topping"
                  style={{ marginTop: 10 }}
                  defaultValue={additionOption.price}
                  fullWidth
                  name="price"
                  type="number"
                  inputRef={register({
                    required: "Giá không được để trống",
                    validate: (value) => {
                      if (value > 50000 || value < 5000) {
                        return "Giá phải từ 5.000 VND - 50.000 VND";
                      }
                    },
                  })}
                />
                {errors.price?.message && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    {errors.price?.message}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>

            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ marginTop: 20, marginLeft: "50%" }}
            >
              Cập nhật
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditAdditionOption;
