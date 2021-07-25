import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  TextField,
  makeStyles,
  Grid,
  Switch,
  FormHelperText,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import WheelComponent from "react-wheel-of-prizes";
import "react-wheel-of-prizes/dist/index.css";
import Notification from "./../../common/Notification";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
  },
  flexRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    height: 36,
  },
  flexForm: {
    display: "flex",
    alignItems: "center",
  },
  inputLableSpin: {
    marginBottom: 16,
  },
  flexInputColor: {
    display: "flex",
    justifyContent: "center",
  },
  positionRootSpin: {
    position: "relative",
    width: "100%",
    height: "100vh",
  },
  positionWeel: {
    position: "absolute",
    top: 0,
    left: "-10%",
    transform: "translate(0, -10%)",
  },
});

const Spinner = () => {
  const classes = useStyles();

  const [disabled, setDisabled] = useState(true);
  const { register, errors, handleSubmit } = useForm();

  const segments = [
    "Voucher HH",
    "May Mắn Lần Sau",
    "10",
    "Voucher HH",
    "May Mắn Lần Sau",
    "Voucher HH",
    "5",
    "100",
  ];
  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
  ];

  const onFinished = (winner) => {
    console.log(winner);
  };

  const handleCheckSwitch = (e) => {
    setDisabled(true);

    if (e.target.checked) {
      setDisabled(false);
    }
  };

  const handleDelete = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => Notification.warn("Đã xoá thành công!"),
        },
        {
          label: "No",
          onClick: () => console.log("Click No"),
        },
      ],
    });
  };

  const handleOnSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={7} sm={12} xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="spanning table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Nhãn</TableCell>
                  <TableCell>Màu Sắc</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Voucher</TableCell>
                  <TableCell>
                    <input type="color" disabled />
                  </TableCell>
                  <TableCell className={classes.flexRight}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleDelete}
                    >
                      Xoá
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Voucher</TableCell>
                  <TableCell>
                    <input type="color" disabled />
                  </TableCell>
                  <TableCell className={classes.flexRight}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleDelete}
                    >
                      Xoá
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Switch onChange={handleCheckSwitch} />
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handleOnSubmit)}
          >
            <Grid container spacing={3} className={classes.flexForm}>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                className={classes.inputLableSpin}
              >
                <TextField
                  label="Nhãn Quay"
                  required
                  fullWidth
                  disabled={disabled}
                  inputRef={register({ required: "Hãy nhập nhãn quay vào" })}
                  name="name"
                  error={errors.name?.message && true}
                />
                {errors.name?.message && (
                  <FormHelperText error={true}>
                    {errors.name?.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                className={classes.flexInputColor}
              >
                <input
                  type="color"
                  ref={register}
                  name="color"
                  disabled={disabled}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} className={classes.flexRight}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  disabled={disabled}
                  type="submit"
                >
                  Thêm
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item md={5} sm={12} xs={12} className={classes.flexCenter}>
          <div className={classes.positionRootSpin}>
            <div className={classes.positionWeel}>
              <WheelComponent
                refs={true}
                segments={segments}
                segColors={segColors}
                onFinished={(winner) => onFinished(winner)}
                primaryColor="black"
                contrastColor="white"
                buttonText="Spin"
                isOnlyOnce={false}
                size={195}
                upDuration={100}
                downDuration={1000}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Spinner;
