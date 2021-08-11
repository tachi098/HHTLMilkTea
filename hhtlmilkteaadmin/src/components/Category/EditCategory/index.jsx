import {
  Button,
  FormHelperText,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import React from "react";
import { CategoryUpdateAction } from "../../../store/actions/CategoryAction";
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

const EditCategory = () => {
  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();

  const [category] = useState(location.state.category);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  // Update Category
  const onSubmit = (data) => {
    dispatch(CategoryUpdateAction(data));
    history.push("/category");
    Notification.success("Đã cập nhật sản phẩm thành công!");
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="h4">Cập nhật loại sản phẩm</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item md={8} xs={12}>
                <TextField
                  name="id"
                  inputRef={register()}
                  defaultValue={category.id}
                  style={{ display: "none" }}
                />
                <TextField
                  label="Nhập tên loại sản phẩm"
                  style={{ marginTop: 10 }}
                  defaultValue={category.name}
                  fullWidth
                  name="name"
                  inputRef={register({ required: true })}
                />
                {errors.name && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    Nhập tên loại sản phẩm
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

export default EditCategory;
