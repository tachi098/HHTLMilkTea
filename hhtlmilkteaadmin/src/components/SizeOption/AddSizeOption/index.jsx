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
  SizeOptionAction,
  SizeOptionAddAction,
} from "../../../store/actions/SizeOptionAction";
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

const CreateSizeOption = () => {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { sizeOptions } = useSelector((state) => state.sizeOption);

  useEffect(() => {
    dispatch(SizeOptionAction());
  }, [dispatch]);

  // Create Size Option
  const onSubmit = (data) => {
    const foundName = sizeOptions.some((item) => {
      return item.name === data.name;
    });
    if (foundName === true) {
      Notification.error("Tên Size đã có");
    } else {
      dispatch(SizeOptionAddAction(data)).then((res) => {
        history.push("/sizeoption");
        Notification.success("Đã thêm Size thành công!");
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="h4">Thêm Size mới</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item md={8} xs={12}>
                <TextField
                  label="Nhập tên Size"
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

                <TextField
                  label="Nhập giá"
                  style={{ marginTop: 10 }}
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
              Tạo Size
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateSizeOption;
