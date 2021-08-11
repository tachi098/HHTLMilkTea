import {
  Button,
  FormHelperText,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import {
  CategoryAddAction,
  CategoryListAction,
} from "../../../store/actions/CategoryAction";
import { useHistory } from "react-router-dom";
import Notification from "./../../../common/Notification";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
  },
  formControl: {
    minWidth: 120,
    marginTop: 20,
  },
}));

const AddCategory = () => {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(CategoryListAction());
  }, [dispatch]);

  // Create category
  const onSubmit = (data) => {
    const foundName = categories.some((item) => {
      return item.name === data.name;
    });
    if (foundName === true) {
      Notification.error("Tên loại sản phẩm đã có");
    } else {
      dispatch(CategoryAddAction(data)).then((res) => {
        history.push("/category");
        Notification.success("Đã thêm sản phẩm thành công!");
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="h4">Thêm loại sản phẩm mới</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item md={8} xs={12}>
                <TextField
                  label="Nhập tên loại sản phẩm"
                  style={{ marginTop: 10 }}
                  fullWidth
                  name="name"
                  inputRef={register({ required: true })}
                />
                {errors.name && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    Không Được Để Trống
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
              Tạo loại sản phẩm
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddCategory;
