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
  AdditionOptionListAction,
  AdditionOptionAddAction,
} from "../../../store/actions/AdditionOptionAction";
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

const CreateAdditionOption = () => {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { additionOptions } = useSelector((state) => state.additionOption);

  useEffect(() => {
    dispatch(AdditionOptionListAction());
  }, [dispatch]);

  // Create Addition Option
  const onSubmit = (data) => {
    const foundName = additionOptions.some((item) => {
      return item.name === data.name;
    });
    if (foundName === true) {
      Notification.error("Tên Topping đã có");
    } else {
      dispatch(AdditionOptionAddAction(data)).then((res) => {
        history.push("/addition");
        Notification.success("Đã thêm Topping thành công!");
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="h4">Thêm Topping mới</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item md={8} xs={12}>
                <TextField
                  label="Nhập tên Topping"
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
                  label="Nhập giá Topping"
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
              Thêm Topping
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateAdditionOption;
